package com.courseplatform.course_api.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserProfileRequest {

    @Email(message = "Email must be valid")
    private String email;

    private String phoneNumber;

    private String currentPassword;

    private String newPassword;
}
