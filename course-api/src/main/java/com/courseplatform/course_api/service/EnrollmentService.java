package com.courseplatform.course_api.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@Transactional(readOnly = true)
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    // =========================================
    // ENROLL USER
    // =========================================
    @Transactional
    public EnrollmentResponse enrollUser(String email, String courseId) {

        // 1️⃣ Fetch User
        User user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with email: " + email));

        // 2️⃣ Fetch Course (ONLY if not soft-deleted)
        Course course = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found with id: " + courseId));

        // 3️⃣ Prevent duplicate enrollment
        if (enrollmentRepository.findByUserAndCourse(user, course).isPresent()) {
            throw new BadRequestException("User already enrolled in this course");
        }

        // 4️⃣ Create enrollment via domain factory
        Enrollment enrollment = Enrollment.create(
                user,
                course,
                Instant.now()
        );

        Enrollment saved = enrollmentRepository.save(enrollment);

        // 5️⃣ Build response
        return EnrollmentResponse.builder()
                .enrollmentId(saved.getId())
                .enrolledAt(saved.getEnrolledAt())
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .build();
    }

    // =========================================
    // GET MY ENROLLMENTS
    // =========================================
    public List<UserEnrollmentResponse> getMyEnrollments(String email) {

        User user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with email: " + email));

        return enrollmentRepository.findByUser(user)
                .stream()
                // 1️⃣ Filter soft-deleted enrollments
                .filter(enrollment -> !enrollment.isDeleted())
                // 2️⃣ Filter enrollments whose course is deleted
                .filter(enrollment -> !enrollment.getCourse().isDeleted())
                .map(enrollment ->
                        UserEnrollmentResponse.builder()
                                .enrollmentId(enrollment.getId())
                                .enrolledAt(enrollment.getEnrolledAt())
                                .courseId(enrollment.getCourse().getId())
                                .courseTitle(enrollment.getCourse().getTitle())
                                .build()
                )
                .toList();
    }
}