package com.courseplatform.course_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.LoginRequest;
import com.courseplatform.course_api.service.AuthService;
import com.courseplatform.course_api.service.TokenBlacklistService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TokenBlacklistService tokenBlacklistService;

    @PostMapping("/login")
    public ApiResponse<String> login(@RequestBody LoginRequest request) {

        String token = authService.login(request);

        return new ApiResponse<>(
                true,
                token,
                "Login successful"
        );
    }

    @PostMapping("/logout")
public ResponseEntity<?> logout(HttpServletRequest request) {

    String header = request.getHeader("Authorization");

    if (header == null || !header.startsWith("Bearer ")) {
        return ResponseEntity.badRequest().body("Invalid token");
    }

    String token = header.substring(7);
    tokenBlacklistService.blacklistToken(token);

    return ResponseEntity.ok("Logged out successfully");
}
}