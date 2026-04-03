package com.courseplatform.course_api.service;

import java.time.Instant;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courseplatform.course_api.dto.CourseProgressResponse;
import com.courseplatform.course_api.dto.CourseProgressSubtopicResponse;
import com.courseplatform.course_api.dto.CourseProgressTopicResponse;
import com.courseplatform.course_api.exception.BadRequestException;
import com.courseplatform.course_api.exception.ResourceNotFoundException;
import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.Subtopic;
import com.courseplatform.course_api.model.SubtopicProgress;
import com.courseplatform.course_api.model.Topic;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.CourseRepository;
import com.courseplatform.course_api.repository.SubTopicProgressRepository;
import com.courseplatform.course_api.repository.SubtopicRepository;
import com.courseplatform.course_api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final SubTopicProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final SubtopicRepository subtopicRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public void markSubtopicCompleted(String email, String subtopicId) {
        if (subtopicId == null || subtopicId.isBlank()) {
            throw new BadRequestException("Subtopic id cannot be null");
        }

        User user = userRepository
                .findByEmailAndDeletedFalse(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found: " + email));

        Subtopic subtopic = subtopicRepository
                .findById(subtopicId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Subtopic not found with id: " + subtopicId));

        progressRepository.findByUserAndSubtopic(user, subtopic)
                .ifPresent(p -> {
                    throw new BadRequestException("Subtopic already completed");
                });

        progressRepository.save(SubtopicProgress.complete(user, subtopic, Instant.now()));
    }

    public CourseProgressResponse getCourseProgress(Long userId, String courseId) {
        User user = userRepository.findById(userId)
                .filter(existing -> !existing.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Course course = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        Map<String, SubtopicProgress> progressBySubtopic = progressRepository.findByUser(user)
                .stream()
                .collect(Collectors.toMap(progress -> progress.getSubtopic().getId(), Function.identity()));

        var topicResponses = course.getTopics().stream()
                .map(topic -> buildTopicProgress(topic, progressBySubtopic))
                .toList();

        int totalSubtopics = topicResponses.stream().mapToInt(CourseProgressTopicResponse::getTotalSubtopics).sum();
        int completedSubtopics = topicResponses.stream().mapToInt(CourseProgressTopicResponse::getCompletedSubtopics).sum();
        double completionPercentage = totalSubtopics == 0 ? 0 : (completedSubtopics * 100.0) / totalSubtopics;

        return CourseProgressResponse.builder()
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .totalSubtopics(totalSubtopics)
                .completedSubtopics(completedSubtopics)
                .completionPercentage(completionPercentage)
                .topics(topicResponses)
                .build();
    }

    @Transactional
    public void resetCourseProgress(Long userId, String courseId) {
        User user = userRepository.findById(userId)
                .filter(existing -> !existing.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Course course = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        progressRepository.deleteByUserAndSubtopic_Topic_Course(user, course);
    }

    private CourseProgressTopicResponse buildTopicProgress(
            Topic topic,
            Map<String, SubtopicProgress> progressBySubtopic) {
        var subtopics = topic.getSubtopics().stream()
                .map(subtopic -> {
                    SubtopicProgress progress = progressBySubtopic.get(subtopic.getId());
                    return CourseProgressSubtopicResponse.builder()
                            .subtopicId(subtopic.getId())
                            .title(subtopic.getTitle())
                            .completed(progress != null && progress.isCompleted())
                            .completedAt(progress == null ? null : progress.getCompletedAt())
                            .build();
                })
                .toList();

        int completedCount = (int) subtopics.stream().filter(CourseProgressSubtopicResponse::isCompleted).count();

        return CourseProgressTopicResponse.builder()
                .topicId(topic.getId())
                .title(topic.getTitle())
                .completedSubtopics(completedCount)
                .totalSubtopics(subtopics.size())
                .subtopics(subtopics)
                .build();
    }
}
