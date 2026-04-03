package com.courseplatform.course_api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    private final Long id;
    private final String email;
    private final String role;
    private final String phoneNumber;
}
