package com.courseplatform.course_api.controller;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.UserRepository;
import com.courseplatform.course_api.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
public String login(@RequestBody Map<String, String> body) {

    String email = body.get("email");
    String password = body.get("password");

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

    // 🔥 Compare raw password with hashed one
    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid email or password");
    }

    return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
}

}
