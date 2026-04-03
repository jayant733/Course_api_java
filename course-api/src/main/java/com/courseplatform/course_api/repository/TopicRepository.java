package com.courseplatform.course_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.Topic;

public interface TopicRepository extends JpaRepository<Topic, String> {

    List<Topic> findByCourse_Id(String courseId);
}

