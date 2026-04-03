package com.courseplatform.course_api.service;

import com.courseplatform.course_api.dto.AuthResponse;
import com.courseplatform.course_api.dto.ForgotPasswordRequest;
import com.courseplatform.course_api.dto.LoginRequest;
import com.courseplatform.course_api.dto.RefreshTokenRequest;
import com.courseplatform.course_api.dto.RegisterRequest;
import com.courseplatform.course_api.dto.ResetPasswordRequest;

public interface AuthService {

    void register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refresh(RefreshTokenRequest request);

    void initiatePasswordReset(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);
}
