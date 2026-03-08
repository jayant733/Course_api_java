// package com.courseplatform.course_api.service;

// import com.courseplatform.course_api.dto.CreateReviewRequest;
// import com.courseplatform.course_api.model.*;
// import com.courseplatform.course_api.repository.*;

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.*;

// import java.util.Optional;

// import static org.mockito.Mockito.*;

// @ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
// class ReviewServiceImplTest {

//     @Mock private CourseRepository courseRepository;
//     @Mock private UserRepository userRepository;
//     @Mock private CourseReviewRepository reviewRepository;

//     @InjectMocks private ReviewServiceImpl reviewService;

//     @Test
//     void addReview_shouldSaveReviewSuccessfully() {

//         Course course = new Course();
//         User user = new User();

//         CreateReviewRequest request = new CreateReviewRequest();
//         request.setRating(5);
//         request.setComment("Great course");

//         when(reviewRepository.existsByCourse_IdAndUser_Email("spring", "test@mail.com"))
//                 .thenReturn(false);
//         when(courseRepository.findByIdAndDeletedFalse("spring"))
//                 .thenReturn(Optional.of(course));
//         when(userRepository.findByEmail("test@mail.com"))
//                 .thenReturn(Optional.of(user));

//         reviewService.addReview("spring", "test@mail.com", request);

//         verify(reviewRepository).save(any(CourseReview.class));
//     }
// }