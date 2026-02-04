package com.courseplatform.course_api.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AdminCreateCourseRequest {

    @NotBlank(message = "Course ID is required")
    private String id;

    @NotBlank(message = "Course title is required")
    private String title;

    @NotBlank(message = "Course description is required")
    private String description;

    @NotEmpty(message = "At least one topic is required")
    private List<AdminCreateTopicRequest> topics;
}
