package com.courseplatform.course_api.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.dto.CreateReviewRequest;
import com.courseplatform.course_api.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // 🔥 Only USERS can review
    @PostMapping("/{courseId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addReview(@PathVariable String courseId,
                                       @RequestBody CreateReviewRequest request,
                                       Authentication authentication) {

        String email = authentication.getName();

        reviewService.addReview(courseId, email, request);

        return ResponseEntity.ok("Review added successfully");
    }

    // ✅ Pagination enabled
    @GetMapping("/{courseId}")
    public ResponseEntity<?> getReviews(@PathVariable String courseId,
                                        Pageable pageable) {

        return ResponseEntity.ok(
                reviewService.getCourseReviews(courseId, pageable)
        );
    }
}