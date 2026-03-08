package com.courseplatform.course_api.service;

import com.courseplatform.course_api.dto.LoginRequest;

public interface AuthService {

    String login(LoginRequest request);
}