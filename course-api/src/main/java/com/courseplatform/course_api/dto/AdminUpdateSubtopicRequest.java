package com.courseplatform.course_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateSubtopicRequest {

    @NotBlank(message = "Subtopic title is required")
    private String title;

    private String content;
}
