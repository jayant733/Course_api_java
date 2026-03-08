
package com.courseplatform.course_api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.courseplatform.course_api.dto.CreateReviewRequest;
import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.CourseReview;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.repository.CourseRepository;
import com.courseplatform.course_api.repository.CourseReviewRepository;
import com.courseplatform.course_api.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseReviewRepository reviewRepository;

    @Override
    public void addReview(String courseId, String userEmail, CreateReviewRequest request) {

        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        if (reviewRepository.existsByCourse_IdAndUser_Email(courseId, userEmail)) {
            throw new RuntimeException("You already reviewed this course");
        }

        Course course = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User user = userRepository.findByEmailAndDeletedFalse(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CourseReview review = CourseReview.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .course(course)
                .user(user)
                .build();

        reviewRepository.save(review);
    }

    @Override
    public Page<CourseReview> getCourseReviews(String courseId, Pageable pageable) {
        return reviewRepository.findByCourse_Id(courseId, pageable);
    }
}
