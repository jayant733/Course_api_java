// package com.courseplatform.course_api.service;

// import com.courseplatform.course_api.model.Course;
// import com.courseplatform.course_api.repository.CourseRepository;

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.*;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.domain.*;

// import java.util.Optional;
// import java.util.List;

// import static org.mockito.Mockito.*;
// import static org.junit.jupiter.api.Assertions.*;

// @ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
// class CourseServiceImplTest {

//     @Mock
//     private CourseRepository courseRepository;

//     @InjectMocks
//     private CourseServiceImpl courseService;

//     // ✅ Test 1: Pagination fetch
//     @Test
//     void getAllCourses_shouldReturnPagedCourses() {

//         Pageable pageable = PageRequest.of(0, 5);
//         Page<Course>; page = new PageImpl<>(List.of(new Course(), new Course()));

//         when(courseRepository.findByDeletedFalse(pageable)).thenReturn(page);

//         Page<Course> result = courseService.getAllCourses(pageable);

//         assertEquals(2, result.getContent().size());
//         verify(courseRepository).findByDeletedFalse(pageable);
//     }

//     // ✅ Test 2: Soft delete
//     @Test
//     void deleteCourse_shouldMarkDeletedTrue() {

//         Course course = new Course();
//         course.setDeleted(false);

//         when(courseRepository.findByIdAndDeletedFalse("spring"))
//                 .thenReturn(Optional.of(course));

//         courseService.deleteCourse("spring");

//         assertTrue(course.isDeleted());
//         verify(courseRepository).save(course);
//     }
// }