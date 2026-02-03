package com.courseplatform.course_api.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

      private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public User createUser(String email, String password) {

    if (userRepository.findByEmail(email).isPresent()) {
        throw new RuntimeException("Email already registered");
    }

    User user = User.builder()
            .email(email)
            .password(passwordEncoder.encode(password)) // 🔐 HASH HERE
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
    public User getUserByEmail(String email) {
    return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
}

}
