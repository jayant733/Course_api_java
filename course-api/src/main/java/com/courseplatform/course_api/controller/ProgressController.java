package com.courseplatform.course_api.controller;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.CourseProgressResponse;
import com.courseplatform.course_api.dto.ProgressRequest;
import com.courseplatform.course_api.service.ProgressService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @PostMapping("/complete")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ApiResponse<String> completeSubtopic(
            @Valid @RequestBody ProgressRequest request,
            Principal principal) {
        progressService.markSubtopicCompleted(principal.getName(), request.getSubtopicId());
        return new ApiResponse<>(true, null, "Subtopic marked as completed");
    }

    @GetMapping("/users/{userId}/courses/{courseId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ApiResponse<CourseProgressResponse> getCourseProgress(
            @PathVariable Long userId,
            @PathVariable String courseId) {
        return new ApiResponse<>(
                true,
                progressService.getCourseProgress(userId, courseId),
                "Progress fetched successfully");
    }

    @PostMapping("/users/{userId}/courses/{courseId}/reset")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ApiResponse<String> resetCourseProgress(
            @PathVariable Long userId,
            @PathVariable String courseId) {
        progressService.resetCourseProgress(userId, courseId);
        return new ApiResponse<>(true, null, "Progress reset successfully");
    }
}
