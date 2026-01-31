package com.courseplatform.course_api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseSummaryResponse {

    private String id;
    private String title;
    private String description;
    private int topicCount;
    private int subtopicCount;
}
