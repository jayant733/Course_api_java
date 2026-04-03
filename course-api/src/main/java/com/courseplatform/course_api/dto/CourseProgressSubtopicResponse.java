package com.courseplatform.course_api.dto;

import java.time.Instant;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CourseProgressSubtopicResponse {

    private final String subtopicId;
    private final String title;
    private final boolean completed;
    private final Instant completedAt;
}
