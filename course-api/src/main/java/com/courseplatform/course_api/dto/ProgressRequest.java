package com.courseplatform.course_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProgressRequest {

    @NotBlank(message = "Subtopic id is required")
    private String subtopicId;
}
