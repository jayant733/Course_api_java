package com.courseplatform.course_api.service;

import java.util.List;

import com.courseplatform.course_api.dto.AdminCreateCourseRequest;
import com.courseplatform.course_api.dto.CourseDetailResponse;
import com.courseplatform.course_api.dto.CourseSummaryResponse;

public interface CourseService {

    List<CourseSummaryResponse> getAllCourses();

    CourseDetailResponse getCourseById(String id);

    List<CourseSummaryResponse> searchCourses(String keyword);

    List<CourseSummaryResponse> searchCatalog(String keyword, String topic);

    String createCourse(AdminCreateCourseRequest request);

    void updateCourse(String id, AdminCreateCourseRequest request);

    void deleteCourse(String id);
}
