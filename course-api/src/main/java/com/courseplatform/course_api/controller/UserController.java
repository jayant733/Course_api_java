package com.courseplatform.course_api.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.CourseProgressResponse;
import com.courseplatform.course_api.dto.UpdateUserProfileRequest;
import com.courseplatform.course_api.dto.UserEnrollmentResponse;
import com.courseplatform.course_api.dto.UserProfileResponse;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.service.EnrollmentService;
import com.courseplatform.course_api.service.ProgressService;
import com.courseplatform.course_api.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final EnrollmentService enrollmentService;
    private final ProgressService progressService;

    // =============================
    // ADMIN: GET ALL USERS
    // =============================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<List<User>> getAllUsers() {

        return new ApiResponse<>(
                true,
                userService.getAllUsers(),
                "Users fetched successfully"
        );
    }

    // =============================
    // ADMIN: GET USER BY ID
    // =============================
    @GetMapping("/{id}")
    public ApiResponse<UserProfileResponse> getUser(@PathVariable Long id, Principal principal) {

        return new ApiResponse<>(
                true,
                userService.getProfile(id, principal.getName()),
                "User fetched successfully"
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<UserProfileResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserProfileRequest request,
            Principal principal) {
        return new ApiResponse<>(
                true,
                userService.updateProfile(id, request, principal.getName()),
                "User updated successfully"
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteUser(@PathVariable Long id, Principal principal) {
        userService.deleteProfile(id, principal.getName());
        return new ApiResponse<>(true, null, "User deleted successfully");
    }

    // =============================
    // USER: MY ENROLLMENTS
    // =============================
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/me/enrollments")
    public ApiResponse<List<UserEnrollmentResponse>> getMyEnrollments(Principal principal) {

        return new ApiResponse<>(
                true,
                enrollmentService.getMyEnrollments(principal.getName()),
                "Enrollments fetched successfully"
        );
    }

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> getCurrentUser(Principal principal) {
        User currentUser = userService.getUserByEmail(principal.getName());
        return new ApiResponse<>(
                true,
                UserProfileResponse.builder()
                        .id(currentUser.getId())
                        .email(currentUser.getEmail())
                        .role(currentUser.getRole().name())
                        .phoneNumber(currentUser.getPhoneNumber())
                        .build(),
                "Current user fetched successfully"
        );
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{id}/courses")
    public ApiResponse<List<UserEnrollmentResponse>> getUserEnrollments(@PathVariable Long id) {
        return new ApiResponse<>(
                true,
                enrollmentService.getUserEnrollments(id),
                "Enrollments fetched successfully"
        );
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @DeleteMapping("/{id}/courses/{courseId}")
    public ApiResponse<String> unenrollUser(
            @PathVariable Long id,
            @PathVariable String courseId) {
        enrollmentService.unenrollUser(id, courseId);
        return new ApiResponse<>(true, null, "Unenrolled successfully");
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{id}/courses/{courseId}/progress")
    public ApiResponse<CourseProgressResponse> getUserCourseProgress(
            @PathVariable Long id,
            @PathVariable String courseId) {
        return new ApiResponse<>(
                true,
                progressService.getCourseProgress(id, courseId),
                "Progress fetched successfully"
        );
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PostMapping("/{id}/courses/{courseId}/progress/reset")
    public ApiResponse<String> resetUserCourseProgress(
            @PathVariable Long id,
            @PathVariable String courseId) {
        progressService.resetCourseProgress(id, courseId);
        return new ApiResponse<>(true, null, "Progress reset successfully");
    }
}
