package com.courseplatform.course_api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.dto.CourseSummaryResponse;
import com.courseplatform.course_api.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public Map<String, List<CourseSummaryResponse>> getAllCourses() {

        List<CourseSummaryResponse> courses = courseService.getAllCourses();

        Map<String, List<CourseSummaryResponse>> response = new HashMap<>();
        response.put("courses", courses);

        return response;
    }
}
