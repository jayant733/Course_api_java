package com.courseplatform.course_api.service;

import java.util.List;

import com.courseplatform.course_api.model.User;

public interface UserService {

    User registerUser(String email, String password);

    List<User> getAllUsers();

    User getUserById(Long id);

    User getUserByEmail(String email);
}