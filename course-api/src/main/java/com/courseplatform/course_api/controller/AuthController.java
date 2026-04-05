package com.courseplatform.course_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.AuthResponse;
import com.courseplatform.course_api.dto.ForgotPasswordRequest;
import com.courseplatform.course_api.dto.LoginRequest;
import com.courseplatform.course_api.dto.RefreshTokenRequest;
import com.courseplatform.course_api.dto.RegisterRequest;
import com.courseplatform.course_api.dto.ResetPasswordRequest;
import com.courseplatform.course_api.service.AuthService;
import com.courseplatform.course_api.service.TokenBlacklistService;

import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TokenBlacklistService tokenBlacklistService;

    // =============================
    // REGISTER
    // =============================
    @PostMapping("/register")
    public ApiResponse<String> register(@Valid @RequestBody RegisterRequest request) {

        authService.register(request);

        return new ApiResponse<>(
                true,
                null,
                "Registration successful"
        );
    }

    // =============================
    // LOGIN
    // =============================
    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {

        AuthResponse authResponse = authService.login(request);

        return new ApiResponse<>(
                true,
                authResponse,
                "Login successful"
        );
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return new ApiResponse<>(
                true,
                authService.refresh(request),
                "Token refreshed successfully"
        );
    }

    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.initiatePasswordReset(request);
        return new ApiResponse<>(true, null, "If the email exists, a reset flow has been initiated");
    }

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return new ApiResponse<>(true, null, "Password reset successfully");
    }

    // =============================
    // LOGOUT
    // =============================
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        String token = header.substring(7);

        tokenBlacklistService.blacklistToken(token);

        return ResponseEntity.ok(new ApiResponse<>(true, null, "Logged out successfully"));
    }
}
