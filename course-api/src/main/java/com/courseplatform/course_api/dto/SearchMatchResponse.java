package com.courseplatform.course_api.dto;

public class SearchMatchResponse {

    private String type; // subtopic or content
    private String topicTitle;
    private String subtopicId;
    private String subtopicTitle;
    private String snippet;

    public SearchMatchResponse(String type, String topicTitle, String subtopicId, String subtopicTitle, String snippet) {
        this.type = type;
        this.topicTitle = topicTitle;
        this.subtopicId = subtopicId;
        this.subtopicTitle = subtopicTitle;
        this.snippet = snippet;
    }

    public String getType() { return type; }
    public String getTopicTitle() { return topicTitle; }
    public String getSubtopicId() { return subtopicId; }
    public String getSubtopicTitle() { return subtopicTitle; }
    public String getSnippet() { return snippet; }
}
