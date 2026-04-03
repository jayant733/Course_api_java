package com.courseplatform.course_api.service;

import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courseplatform.course_api.dto.AdminCreateSubtopicRequest;
import com.courseplatform.course_api.dto.AdminCreateTopicRequest;
import com.courseplatform.course_api.dto.AdminUpdateSubtopicRequest;
import com.courseplatform.course_api.dto.AdminUpdateTopicRequest;
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
@Transactional
public class AdminContentService {

    private final CourseRepository courseRepository;
    private final TopicRepository topicRepository;
    private final SubtopicRepository subtopicRepository;

    public String addTopic(String courseId, AdminCreateTopicRequest request) {
        Course course = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        Topic topic = Topic.create(generateId(request.getTitle()), request.getTitle());
        course.addTopic(topic);
        return topic.getId();
    }

    public void updateTopic(String topicId, AdminUpdateTopicRequest request) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));
        topic.updateTitle(request.getTitle());
    }

    public void deleteTopic(String topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));
        topic.getCourse().removeTopic(topic);
    }

    public String addSubtopic(String topicId, AdminCreateSubtopicRequest request) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

        Subtopic subtopic = Subtopic.create(generateId(request.getTitle()), request.getTitle(), request.getContent());
        topic.addSubtopic(subtopic);
        return subtopic.getId();
    }

    public void updateSubtopic(String subtopicId, AdminUpdateSubtopicRequest request) {
        Subtopic subtopic = subtopicRepository.findById(subtopicId)
                .orElseThrow(() -> new ResourceNotFoundException("Subtopic not found with id: " + subtopicId));
        subtopic.updateContent(request.getTitle(), request.getContent());
    }

    public void deleteSubtopic(String subtopicId) {
        Subtopic subtopic = subtopicRepository.findById(subtopicId)
                .orElseThrow(() -> new ResourceNotFoundException("Subtopic not found with id: " + subtopicId));
        subtopic.getTopic().removeSubtopic(subtopic);
    }

    private String generateId(String source) {
        return source.toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                + "-" + System.nanoTime();
    }
}
