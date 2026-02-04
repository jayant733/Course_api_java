package com.courseplatform.course_api.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AdminCreateTopicRequest {

    @NotBlank(message = "Topic ID is required")
    private String id;

    @NotBlank(message = "Topic title is required")
    private String title;

    @NotEmpty(message = "At least one subtopic is required")
    private List<AdminCreateSubtopicRequest> subtopics;
}
