package com.courseplatform.course_api.service;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courseplatform.course_api.dto.AdminCreateCourseRequest;
import com.courseplatform.course_api.dto.CourseDetailResponse;
import com.courseplatform.course_api.dto.CourseSummaryResponse;
import com.courseplatform.course_api.exception.ResourceAlreadyExistsException;
import com.courseplatform.course_api.exception.ResourceNotFoundException;
import com.courseplatform.course_api.mapper.CourseMapper;
import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.repository.CourseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseServiceImpl implements CourseService  {

    private final CourseRepository courseRepository;

    // =============================
    // Get All (Non-Paginated)
    // =============================
    @Override
    public List<CourseSummaryResponse> getAllCourses() {
        return courseRepository.findByDeletedFalse()
                .stream()
                .map(CourseMapper::toSummary)
                .toList();
    }

    // =============================
    // Get All (Paginated)
    // =============================
    

    // =============================
    // Get By ID
    // =============================
    @Override
    public CourseDetailResponse getCourseById(String id) {

        Course course = courseRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        return CourseMapper.toDetail(course);
    }

    // =============================
    // Search
    // =============================
    @Override
    public List<CourseSummaryResponse> searchCourses(String keyword) {

        return courseRepository
                .findByTitleContainingIgnoreCase(keyword)
                .stream()
                .map(CourseMapper::toSummary)
                .toList();
    }

    // =============================
    // Create Course
    // =============================
    @Override
    @Transactional
    public String createCourse(AdminCreateCourseRequest request) {

        validateDuplicateTitle(request.getTitle());

        String generatedId = generateCourseId(request.getTitle());

        Course course = Course.create(
                generatedId,
                request.getTitle(),
                request.getDescription());

        courseRepository.save(course);

        return course.getId();
    }

    // =============================
    // Private Helpers
    // =============================
    private void validateDuplicateTitle(String title) {
        if (courseRepository.existsByTitleIgnoreCase(title)) {
            throw new ResourceAlreadyExistsException(
                    "Course with title '" + title + "' already exists");
        }
    }

    private String generateCourseId(String title) {

        String base = title
                .toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");

        int counter = 1;
        String candidate = base;

        while (courseRepository.existsById(candidate)) {
            candidate = base + "-" + counter++;
        }

        return candidate;
    }

    @Override
    @Transactional
    public void updateCourse(String id, AdminCreateCourseRequest request) {

        Course course = courseRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course.updateDetails(request.getTitle(), request.getDescription());
    }

    @Override
    @Transactional
    public void deleteCourse(String id) {

        Course course = courseRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course.softDelete();
    }
}