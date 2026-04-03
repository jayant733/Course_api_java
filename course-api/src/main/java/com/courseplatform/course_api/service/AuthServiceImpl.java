package com.courseplatform.course_api.service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courseplatform.course_api.dto.AuthResponse;
import com.courseplatform.course_api.dto.ForgotPasswordRequest;
import com.courseplatform.course_api.dto.LoginRequest;
import com.courseplatform.course_api.dto.RefreshTokenRequest;
import com.courseplatform.course_api.dto.RegisterRequest;
import com.courseplatform.course_api.dto.ResetPasswordRequest;
import com.courseplatform.course_api.exception.BadRequestException;
import com.courseplatform.course_api.model.PasswordResetToken;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.PasswordResetTokenRepository;
import com.courseplatform.course_api.repository.UserRepository;
import com.courseplatform.course_api.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    // =========================================
    // REGISTER USER / ADMIN
    // =========================================
    @Override
    @Transactional
    public void register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailAndDeletedFalse(normalizedEmail)) {
            throw new BadRequestException("Email already registered");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user;

        // =============================
        // ADMIN REGISTRATION
        // =============================
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {

            if (request.getPhoneNumber() == null || request.getPhoneNumber().isBlank()) {
                throw new BadRequestException("Phone number required for admin registration");
            }

            user = User.createAdmin(
                    normalizedEmail,
                    encodedPassword,
                    request.getPhoneNumber()
            );

        } 
        // =============================
        // USER REGISTRATION
        // =============================
        else {

            user = User.createUser(
                    normalizedEmail,
                    encodedPassword
            );
        }

        userRepository.save(user);
    }

    // =========================================
    // LOGIN
    // =========================================
    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmailAndDeletedFalse(request.getEmail().trim().toLowerCase())
                .orElseThrow(() ->
                        new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        return buildAuthResponse(user);
    }

    @Override
    public AuthResponse refresh(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        if (!jwtUtil.isRefreshToken(refreshToken)) {
            throw new BadRequestException("Invalid refresh token");
        }

        String email = jwtUtil.extractEmail(refreshToken);
        User user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() -> new BadRequestException("User not found for token"));

        if (!jwtUtil.validateToken(refreshToken, user.getEmail())) {
            throw new BadRequestException("Refresh token has expired");
        }

        return buildAuthResponse(user);
    }

    @Override
    @Transactional
    public void initiatePasswordReset(ForgotPasswordRequest request) {
        userRepository.findByEmailAndDeletedFalse(request.getEmail().trim().toLowerCase())
                .ifPresent(user -> {
                    passwordResetTokenRepository.deleteByUser(user);
                    passwordResetTokenRepository.save(
                            PasswordResetToken.issue(
                                    UUID.randomUUID().toString(),
                                    user,
                                    Instant.now().plusSeconds(15 * 60))
                    );
                });
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByTokenAndUsedFalse(request.getToken())
                .orElseThrow(() -> new BadRequestException("Reset token is invalid"));

        if (resetToken.isExpired()) {
            throw new BadRequestException("Reset token has expired");
        }

        resetToken.getUser().changePassword(passwordEncoder.encode(request.getNewPassword()));
        resetToken.markUsed();
    }

    private AuthResponse buildAuthResponse(User user) {
        return AuthResponse.builder()
                .userId(user.getId())
                .accessToken(jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name()))
                .refreshToken(jwtUtil.generateRefreshToken(user.getEmail(), user.getRole().name()))
                .tokenType("Bearer")
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
