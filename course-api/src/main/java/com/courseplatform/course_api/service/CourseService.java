package com.courseplatform.course_api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courseplatform.course_api.dto.AdminCreateCourseRequest;
import com.courseplatform.course_api.dto.AdminCreateSubtopicRequest;
import com.courseplatform.course_api.dto.AdminCreateTopicRequest;
import com.courseplatform.course_api.dto.CourseDetailResponse;
import com.courseplatform.course_api.dto.CourseSummaryResponse;
import com.courseplatform.course_api.dto.SubtopicResponse;
import com.courseplatform.course_api.dto.TopicResponse;
import com.courseplatform.course_api.exception.BadRequestException;
import com.courseplatform.course_api.exception.ResourceNotFoundException;
import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.Subtopic;
import com.courseplatform.course_api.model.Topic;
import com.courseplatform.course_api.repository.CourseRepository;
import com.courseplatform.course_api.repository.SubtopicRepository;
import com.courseplatform.course_api.repository.TopicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final TopicRepository topicRepository;
    private final SubtopicRepository subtopicRepository;

    // ================= USER APIs =================

    public List<CourseSummaryResponse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(course -> CourseSummaryResponse.builder()
                        .id(course.getId())
                        .title(course.getTitle())
                        .description(course.getDescription())
                        .topicCount(course.getTopics() != null ? course.getTopics().size() : 0)
                        .subtopicCount(course.getTopics() != null ?
                                course.getTopics().stream()
                                        .mapToInt(t -> t.getSubtopics() != null ? t.getSubtopics().size() : 0)
                                        .sum()
                                : 0)
                        .build())
                .collect(Collectors.toList());
    }

    public CourseDetailResponse getCourseById(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        return new CourseDetailResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getTopics().stream().map(this::mapTopic).toList()
        );
    }

    private TopicResponse mapTopic(Topic topic) {
        return new TopicResponse(
                topic.getId(),
                topic.getTitle(),
                topic.getSubtopics().stream().map(this::mapSubtopic).toList()
        );
    }

    private SubtopicResponse mapSubtopic(Subtopic subtopic) {
        return new SubtopicResponse(
                subtopic.getId(),
                subtopic.getTitle(),
                subtopic.getContent()
        );
    }

    // ================= ADMIN API =================

    @Transactional
    public void createCourse(AdminCreateCourseRequest request) {

        if (courseRepository.existsById(request.getId())) {
            throw new BadRequestException("Course with this ID already exists");
        }

        Course course = Course.builder()
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .build();

        courseRepository.save(course);

        for (AdminCreateTopicRequest topicReq : request.getTopics()) {

            Topic topic = Topic.builder()
                    .id(topicReq.getId())
                    .title(topicReq.getTitle())
                    .course(course)
                    .build();

            topicRepository.save(topic);

            for (AdminCreateSubtopicRequest subReq : topicReq.getSubtopics()) {

                Subtopic subtopic = Subtopic.builder()
                        .id(subReq.getId())
                        .title(subReq.getTitle())
                        .content(subReq.getContent())
                        .topic(topic)
                        .build();

                subtopicRepository.save(subtopic);
            }
        }
    }
}
