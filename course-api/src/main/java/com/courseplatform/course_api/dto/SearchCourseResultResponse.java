package com.courseplatform.course_api.dto;

import java.util.List;

public class SearchCourseResultResponse {

    private String courseId;
    private String courseTitle;
    private List<SearchMatchResponse> matches;

    public SearchCourseResultResponse(String courseId, String courseTitle, List<SearchMatchResponse> matches) {
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.matches = matches;
    }

    public String getCourseId() { return courseId; }
    public String getCourseTitle() { return courseTitle; }
    public List<SearchMatchResponse> getMatches() { return matches; }
}
