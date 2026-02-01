package com.courseplatform.course_api.dto;

import java.time.Instant;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserEnrollmentResponse {
    private Long enrollmentId;
    private Instant enrolledAt;
    private String courseId;
    private String courseTitle;
}
