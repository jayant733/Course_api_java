package com.courseplatform.course_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.courseplatform.course_api.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    // =============================
    // Get All Courses
    // =============================
    @Query("""
        SELECT DISTINCT c
        FROM Course c
        LEFT JOIN FETCH c.topics
        WHERE c.deleted = false
    """)
    List<Course> findByDeletedFalse();

    Page<Course> findByDeletedFalse(Pageable pageable);

    // =============================
    // Get Course By Id
    // =============================
    @Query("""
        SELECT DISTINCT c
        FROM Course c
        LEFT JOIN FETCH c.topics
        WHERE c.id = :id
        AND c.deleted = false
    """)
    Optional<Course> findByIdAndDeletedFalse(String id);

    // =============================
    // Basic Queries
    // =============================

    Optional<Course> findByTitleIgnoreCase(String title);

    boolean existsByTitleIgnoreCase(String title);

    boolean existsByTitleIgnoreCaseAndDeletedFalse(String title);

    List<Course> findByTitleContainingIgnoreCase(String keyword);

    Page<Course> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
}