package com.courseplatform.course_api.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;   

@Data
@Builder
public class EnrollmentResponse {

    private Long enrollmentId;
    private Instant enrolledAt;
    private String courseId;
    private String courseTitle;
}
