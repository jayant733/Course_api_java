package com.courseplatform.course_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.CourseDetailResponse;
import com.courseplatform.course_api.dto.CourseSummaryResponse;
import com.courseplatform.course_api.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> getCourses(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String topic) {

        List<CourseSummaryResponse> courses =
                (keyword == null || keyword.isBlank()) && (topic == null || topic.isBlank())
                        ? courseService.getAllCourses()
                        : courseService.searchCatalog(keyword, topic);

        return ResponseEntity.ok(
                new ApiResponse<>(true, courses, "Courses fetched successfully")
        );
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> searchCourses(
            @RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, courseService.searchCourses(keyword), "Course search completed successfully")
        );
    }

    @GetMapping("/{courseId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<ApiResponse<CourseDetailResponse>> getCourseById(
            @PathVariable String courseId) {

        CourseDetailResponse response =
                courseService.getCourseById(courseId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, response, "Course fetched successfully")
        );
    }
}
