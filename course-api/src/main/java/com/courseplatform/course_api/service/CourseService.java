package com.courseplatform.course_api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.dto.CourseSummaryResponse;
import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.repository.CourseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<CourseSummaryResponse> getAllCourses() {
        List<Course> courses = courseRepository.findAll();

        return courses.stream().map(course -> CourseSummaryResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .topicCount(course.getTopics() != null ? course.getTopics().size() : 0)
                .subtopicCount(course.getTopics() != null ?
                        course.getTopics().stream()
                                .mapToInt(t -> t.getSubtopics() != null ? t.getSubtopics().size() : 0)
                                .sum()
                        : 0)
                .build()
        ).collect(Collectors.toList());
    }
}
