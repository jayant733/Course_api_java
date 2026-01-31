package com.courseplatform.course_api.dto;

import java.util.List;

public class SearchResponse {

    private String query;
    private List<SearchCourseResultResponse> results;

    public SearchResponse(String query, List<SearchCourseResultResponse> results) {
        this.query = query;
        this.results = results;
    }

    public String getQuery() { return query; }
    public List<SearchCourseResultResponse> getResults() { return results; }
}
