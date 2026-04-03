package com.courseplatform.course_api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private final Long userId;
    private final String accessToken;
    private final String refreshToken;
    private final String tokenType;
    private final String email;
    private final String role;
}
