package com.courseplatform.course_api.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.dto.EnrollmentResponse;
import com.courseplatform.course_api.dto.UserEnrollmentResponse;
import com.courseplatform.course_api.exception.BadRequestException;
import com.courseplatform.course_api.exception.ResourceNotFoundException;
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

    public EnrollmentResponse enrollUser(String email, String courseId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        enrollmentRepository.findByUserAndCourse(user, course)
                .ifPresent(e -> {
                    throw new BadRequestException("User already enrolled in this course");
                });

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .enrolledAt(Instant.now())
                .build();

        Enrollment saved = enrollmentRepository.save(enrollment);

        return EnrollmentResponse.builder()
                .enrollmentId(saved.getId())
                .enrolledAt(saved.getEnrolledAt())
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .build();
    }

    public List<UserEnrollmentResponse> getMyEnrollments(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return enrollmentRepository.findByUser(user)
                .stream()
                .map(enrollment -> UserEnrollmentResponse.builder()
                        .enrollmentId(enrollment.getId())
                        .enrolledAt(enrollment.getEnrolledAt())
                        .courseId(enrollment.getCourse().getId())
                        .courseTitle(enrollment.getCourse().getTitle())
                        .build()
                )
                .toList();
    }
}
