package com.courseplatform.course_api.dto;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private int rating;
    private String comment;
}