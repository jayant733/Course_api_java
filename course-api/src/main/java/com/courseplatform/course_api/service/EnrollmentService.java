package com.courseplatform.course_api.service;

import java.time.Instant;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.Enrollment;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.CourseRepository;
import com.courseplatform.course_api.repository.EnrollmentRepository;
import com.courseplatform.course_api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public Enrollment enrollUser(Long userId, String courseId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Prevent duplicate enrollment
        enrollmentRepository.findByUserAndCourse(user, course)
                .ifPresent(e -> {
                    throw new RuntimeException("User already enrolled in this course");
                });

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .enrolledAt(Instant.now())
                .build();

        return enrollmentRepository.save(enrollment);
    }
}
