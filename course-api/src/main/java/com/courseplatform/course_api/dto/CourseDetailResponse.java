package com.courseplatform.course_api.dto;

import java.util.List;

public class CourseDetailResponse {

    private String id;
    private String title;
    private String description;
    private List<TopicResponse> topics;

    public CourseDetailResponse(String id, String title, String description, List<TopicResponse> topics) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.topics = topics;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<TopicResponse> getTopics() {
        return topics;
    }
}
