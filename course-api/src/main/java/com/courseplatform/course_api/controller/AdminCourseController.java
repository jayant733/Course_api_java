package com.courseplatform.course_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.AdminCreateCourseRequest;
import com.courseplatform.course_api.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createCourse(
            @RequestBody AdminCreateCourseRequest request) {

        String id = courseService.createCourse(request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, id, "Course created successfully")
        );
    }


    @PutMapping("/{id}")
public ResponseEntity<ApiResponse<String>> updateCourse(
        @PathVariable String id,
        @RequestBody AdminCreateCourseRequest request) {

    courseService.updateCourse(id, request);

    return ResponseEntity.ok(
            new ApiResponse<>(true, "Updated", "Course updated successfully")
    );
}


    @DeleteMapping("/{id}")
public ResponseEntity<ApiResponse<String>> deleteCourse(
        @PathVariable String id) {

    courseService.deleteCourse(id);

    return ResponseEntity.ok(
            new ApiResponse<>(true, "Deleted", "Course deleted successfully")
    );
}

    // later:
    // @PutMapping("/{id}") → update
    // @DeleteMapping("/{id}") → delete
}