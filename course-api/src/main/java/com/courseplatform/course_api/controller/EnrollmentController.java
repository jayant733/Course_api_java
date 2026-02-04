package com.courseplatform.course_api.controller;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.dto.EnrollmentResponse;
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
}
