package com.courseplatform.course_api.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CourseProgressTopicResponse {

    private final String topicId;
    private final String title;
    private final int completedSubtopics;
    private final int totalSubtopics;
    private final List<CourseProgressSubtopicResponse> subtopics;
}
