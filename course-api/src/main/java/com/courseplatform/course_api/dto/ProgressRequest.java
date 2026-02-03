package com.courseplatform.course_api.dto;

import lombok.Data;

@Data
public class ProgressRequest {
    private Long userId;
    private String subtopicId;
}
