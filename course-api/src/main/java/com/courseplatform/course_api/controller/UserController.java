package com.courseplatform.course_api.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

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

    // 🔓 Public registration
    @PostMapping
    public User createUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        return userService.createUser(email, password);
    }

    // 🔒 Admin use
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 🔒 Admin use
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✅ Logged-in Student Dashboard
    @GetMapping("/me/enrollments")
    public List<UserEnrollmentResponse> getMyEnrollments(Principal principal) {
        String email = principal.getName();
        return enrollmentService.getMyEnrollments(email);
    }
}
