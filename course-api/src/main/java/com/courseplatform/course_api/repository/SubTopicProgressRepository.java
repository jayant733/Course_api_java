package com.courseplatform.course_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.Subtopic;
import com.courseplatform.course_api.model.SubtopicProgress;
import com.courseplatform.course_api.model.User;

public interface SubTopicProgressRepository extends JpaRepository<SubtopicProgress, Long> {
    Optional<SubtopicProgress> findByUserAndSubtopic(User user, Subtopic subtopic);
    List<SubtopicProgress> findByUser(User user);
}
