package com.courseplatform.course_api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.dto.CourseDetailResponse;
import com.courseplatform.course_api.dto.CourseSummaryResponse;
import com.courseplatform.course_api.dto.SubtopicResponse;
import com.courseplatform.course_api.dto.TopicResponse;
import com.courseplatform.course_api.exception.ResourceNotFoundException;
import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.Subtopic;
import com.courseplatform.course_api.model.Topic;
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

    public CourseDetailResponse getCourseById(String courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        List<TopicResponse> topicResponses = course.getTopics().stream()
                .map(this::mapTopic)
                .collect(Collectors.toList());

        return new CourseDetailResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                topicResponses
        );
    }

    private TopicResponse mapTopic(Topic topic) {
        List<SubtopicResponse> subtopics = topic.getSubtopics().stream()
                .map(this::mapSubtopic)
                .collect(Collectors.toList());

        return new TopicResponse(
                topic.getId(),
                topic.getTitle(),
                subtopics
        );
    }

    private SubtopicResponse mapSubtopic(Subtopic subtopic) {
        return new SubtopicResponse(
                subtopic.getId(),
                subtopic.getTitle(),
                subtopic.getContent()
        );
    }
}
