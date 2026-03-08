package com.courseplatform.course_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.courseplatform.course_api.model.Subtopic;

public interface SubtopicRepository extends JpaRepository<Subtopic, String> {

    @Query("""
        SELECT DISTINCT s
        FROM Subtopic s
        JOIN s.topic t
        JOIN t.course c
        WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(s.content) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    List<Subtopic> searchSubtopics(String query);
}