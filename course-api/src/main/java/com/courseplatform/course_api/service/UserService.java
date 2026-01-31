package com.courseplatform.course_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(String email, String password) {

        userRepository.findByEmail(email)
                .ifPresent(u -> {
                    throw new RuntimeException("Email already registered");
                });

        User user = User.builder()
                .email(email)
                .password(password) // ⚠ Later we will hash this
                .build();

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
