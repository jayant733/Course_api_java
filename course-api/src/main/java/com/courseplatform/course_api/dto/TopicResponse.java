package com.courseplatform.course_api.dto;

import java.util.List;

public class TopicResponse {

    private String id;
    private String title;
    private List<SubtopicResponse> subtopics;

    public TopicResponse(String id, String title, List<SubtopicResponse> subtopics) {
        this.id = id;
        this.title = title;
        this.subtopics = subtopics;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<SubtopicResponse> getSubtopics() {
        return subtopics;
    }
}
