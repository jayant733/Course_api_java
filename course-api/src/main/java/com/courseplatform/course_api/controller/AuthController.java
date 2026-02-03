package com.courseplatform.course_api.controller;

import org.springframework.web.bind.annotation.*;

import com.courseplatform.course_api.dto.LoginRequest;
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

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}
