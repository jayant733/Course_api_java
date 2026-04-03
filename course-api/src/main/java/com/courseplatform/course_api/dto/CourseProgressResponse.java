package com.courseplatform.course_api.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CourseProgressResponse {

    private final String courseId;
    private final String courseTitle;
    private final int completedSubtopics;
    private final int totalSubtopics;
    private final double completionPercentage;
    private final List<CourseProgressTopicResponse> topics;
}
