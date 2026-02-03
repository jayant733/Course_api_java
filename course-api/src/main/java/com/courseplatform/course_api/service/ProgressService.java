package com.courseplatform.course_api.service;

import java.time.Instant;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.exception.BadRequestException;
import com.courseplatform.course_api.exception.ResourceNotFoundException;
import com.courseplatform.course_api.model.Subtopic;
import com.courseplatform.course_api.model.SubtopicProgress;
import com.courseplatform.course_api.model.User;
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

    public void markSubtopicCompleted(Long userId, String subtopicId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Subtopic subtopic = subtopicRepository.findById(subtopicId)
                .orElseThrow(() -> new ResourceNotFoundException("Subtopic not found with id: " + subtopicId));

        progressRepository.findByUserAndSubtopic(user, subtopic)
                .ifPresent(p -> {
                    throw new BadRequestException("Subtopic already completed");
                });

        SubtopicProgress progress = SubtopicProgress.builder()
                .user(user)
                .subtopic(subtopic)
                .completedAt(Instant.now())
                .build();

        progressRepository.save(progress);
    }
}
