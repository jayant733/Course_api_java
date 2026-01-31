package com.courseplatform.course_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.Enrollment;
import com.courseplatform.course_api.model.User;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByUserAndCourse(User user, Course course);
    List<Enrollment> findByUser(User user);
}
