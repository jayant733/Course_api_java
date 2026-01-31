package com.courseplatform.course_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.Course;

public interface CourseRepository extends JpaRepository<Course, String> {
}
