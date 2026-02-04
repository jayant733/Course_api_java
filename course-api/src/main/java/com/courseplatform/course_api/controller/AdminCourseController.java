package com.courseplatform.course_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.dto.AdminCreateCourseRequest;
import com.courseplatform.course_api.service.CourseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
public class AdminCourseController {

    private final CourseService courseService;

    // 👑 ADMIN ONLY
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createCourse(@Valid @RequestBody AdminCreateCourseRequest request) {

        courseService.createCourse(request);

        return ResponseEntity.ok("Course created successfully");
    }
}
