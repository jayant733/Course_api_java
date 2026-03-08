package com.courseplatform.course_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.CourseReview;

public interface CourseReviewRepository extends JpaRepository<CourseReview, Long> {

    Page<CourseReview> findByCourse_Id(String courseId, Pageable pageable);

    boolean existsByCourse_IdAndUser_Email(String courseId, String email);
}
