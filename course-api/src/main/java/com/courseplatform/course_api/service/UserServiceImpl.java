package com.courseplatform.course_api.service;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courseplatform.course_api.dto.UpdateUserProfileRequest;
import com.courseplatform.course_api.dto.UserProfileResponse;
import com.courseplatform.course_api.exception.BadRequestException;
import com.courseplatform.course_api.exception.ResourceNotFoundException;
import com.courseplatform.course_api.model.Role;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public User registerUser(String email, String password) {

        if (userRepository.existsByEmailAndDeletedFalse(email)) {
            throw new BadRequestException("Email already registered");
        }

        User user = User.createUser(
                email,
                passwordEncoder.encode(password)
        );

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> !user.isDeleted())
                .toList();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .filter(user -> !user.isDeleted())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with email: " + email));
    }

    @Override
    public UserProfileResponse getProfile(Long id, String requesterEmail) {
        User user = getUserById(id);
        ensureCanAccessUser(requesterEmail, user);
        return toProfile(user);
    }

    @Override
    @Transactional
    public UserProfileResponse updateProfile(Long id, UpdateUserProfileRequest request, String requesterEmail) {
        User user = getUserById(id);
        ensureCanAccessUser(requesterEmail, user);

        String nextEmail = request.getEmail() == null || request.getEmail().isBlank()
                ? user.getEmail()
                : request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailAndDeletedFalseAndIdNot(nextEmail, user.getId())) {
            throw new BadRequestException("Email already registered");
        }

        user.updateProfile(nextEmail, request.getPhoneNumber());

        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            if (request.getCurrentPassword() == null || !passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new BadRequestException("Current password is invalid");
            }
            if (request.getNewPassword().length() < 6) {
                throw new BadRequestException("New password must be at least 6 characters");
            }
            user.changePassword(passwordEncoder.encode(request.getNewPassword()));
        }

        return toProfile(user);
    }

    @Override
    @Transactional
    public void deleteProfile(Long id, String requesterEmail) {
        User user = getUserById(id);
        ensureCanAccessUser(requesterEmail, user);
        user.softDelete();
    }

    private void ensureCanAccessUser(String requesterEmail, User targetUser) {
        User requester = getUserByEmail(requesterEmail);
        boolean isAdmin = requester.getRole() == Role.ROLE_ADMIN;
        boolean isSelf = requester.getId().equals(targetUser.getId());

        if (!isAdmin && !isSelf) {
            throw new AccessDeniedException("You do not have permission to access this profile");
        }
    }

    private UserProfileResponse toProfile(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
}
