package com.courseplatform.course_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.Topic;

public interface TopicRepository extends JpaRepository<Topic, String> {
}

