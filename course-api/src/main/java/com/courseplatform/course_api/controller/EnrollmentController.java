package com.courseplatform.course_api.controller;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.EnrollmentResponse;
import com.courseplatform.course_api.dto.UserEnrollmentResponse;
import com.courseplatform.course_api.service.EnrollmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    // 👤 USER ONLY
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public EnrollmentResponse enroll(@RequestParam String courseId, Principal principal) {
        return enrollmentService.enrollUser(principal.getName(), courseId);
    }

    @DeleteMapping("/users/{userId}/courses/{courseId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ApiResponse<String> unenroll(
            @PathVariable Long userId,
            @PathVariable String courseId) {
        enrollmentService.unenrollUser(userId, courseId);
        return new ApiResponse<>(true, null, "Unenrolled successfully");
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<java.util.List<UserEnrollmentResponse>> getAllEnrollments() {
        return new ApiResponse<>(true, enrollmentService.getAllActiveEnrollments(), "Enrollments fetched successfully");
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<java.util.List<UserEnrollmentResponse>> getAllEnrollmentsAlias() {
        return new ApiResponse<>(true, enrollmentService.getAllActiveEnrollments(), "Enrollments fetched successfully");
    }
}
