package com.courseplatform.course_api.service;

import java.time.Instant;

import org.springframework.stereotype.Service;

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
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subtopic subtopic = subtopicRepository.findById(subtopicId)
                .orElseThrow(() -> new RuntimeException("Subtopic not found"));

        // Prevent duplicate progress
        progressRepository.findByUserAndSubtopic(user, subtopic)
                .ifPresent(p -> {
                    throw new RuntimeException("Subtopic already completed");
                });

        SubtopicProgress progress = SubtopicProgress.builder()
                .user(user)
                .subtopic(subtopic)
                .completedAt(Instant.now())
                .build();

        progressRepository.save(progress);
    }
}
