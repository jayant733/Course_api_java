package com.courseplatform.course_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.Subtopic;

public interface SubtopicRepository extends JpaRepository<Subtopic, String> {
}
