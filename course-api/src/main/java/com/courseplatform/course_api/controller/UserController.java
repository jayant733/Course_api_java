package com.courseplatform.course_api.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.UserEnrollmentResponse;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.service.EnrollmentService;
import com.courseplatform.course_api.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final EnrollmentService enrollmentService;

    // 🔓 Public Registration
    @PostMapping
    public ApiResponse<User> register(@RequestBody Map<String, String> body) {

        User user = userService.registerUser(
                body.get("email"),
                body.get("password")
        );

        return new ApiResponse<>(true, user, "User registered successfully");
    }

    // 🔒 Admin Only
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<List<User>> getAllUsers() {

        return new ApiResponse<>(
                true,
                userService.getAllUsers(),
                "Users fetched successfully"
        );
    }

    // 🔒 Admin Only
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ApiResponse<User> getUser(@PathVariable Long id) {

        return new ApiResponse<>(
                true,
                userService.getUserById(id),
                "User fetched successfully"
        );
    }

    // 🔐 Logged-in USER
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/me/enrollments")
    public ApiResponse<List<UserEnrollmentResponse>> getMyEnrollments(Principal principal) {

        return new ApiResponse<>(
                true,
                enrollmentService.getMyEnrollments(principal.getName()),
                "Enrollments fetched successfully"
        );
    }
}