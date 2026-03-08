package com.courseplatform.course_api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.courseplatform.course_api.dto.CreateReviewRequest;
import com.courseplatform.course_api.model.CourseReview;

public interface ReviewService {

    void addReview(String courseId, String userEmail, CreateReviewRequest request);

    Page<CourseReview> getCourseReviews(String courseId, Pageable pageable);
}