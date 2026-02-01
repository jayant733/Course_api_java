package com.courseplatform.course_api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.dto.UserEnrollmentResponse;
import com.courseplatform.course_api.model.User;
import com.courseplatform.course_api.service.EnrollmentService;
import com.courseplatform.course_api.service.UserService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final EnrollmentService enrollmentService;

    // 🔹 Create new user
    @PostMapping
    public User createUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        return userService.createUser(email, password);
    }

    // 🔹 Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 🔹 Get single user
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 🔹 Student Dashboard — Enrolled Courses
    @GetMapping("/{id}/enrollments")
    public List<UserEnrollmentResponse> getUserEnrollments(@PathVariable Long id) {
        return enrollmentService.getUserEnrollments(id);
    }
}
