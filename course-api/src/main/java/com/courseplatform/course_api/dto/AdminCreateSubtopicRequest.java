package com.courseplatform.course_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminCreateSubtopicRequest {

    @NotBlank(message = "Subtopic ID is required")
    private String id;

    @NotBlank(message = "Subtopic title is required")
    private String title;

    @NotBlank(message = "Subtopic content is required")
    private String content;
}
