package com.courseplatform.course_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateTopicRequest {

    @NotBlank(message = "Topic title is required")
    private String title;
}
