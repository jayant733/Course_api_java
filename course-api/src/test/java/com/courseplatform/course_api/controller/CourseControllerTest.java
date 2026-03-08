// package com.courseplatform.course_api.controller;

// import com.courseplatform.course_api.service.CourseService;

// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.data.domain.PageImpl;
// import org.springframework.test.web.servlet.MockMvc;

// import java.util.List;

// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// @WebMvcTest(CourseController.class)
// class CourseControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private CourseService courseService;

//     @Test
//     void getCourses_shouldReturn200() throws Exception {

//         when(courseService.getAllCourses(Mockito.any()))
//                 .thenReturn(new PageImpl<>(List.of()));

//         mockMvc.perform(get("/api/courses"))
//                 .andExpect(status().isOk());
//     }
// }