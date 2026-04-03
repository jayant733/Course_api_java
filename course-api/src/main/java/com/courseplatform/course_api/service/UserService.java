package com.courseplatform.course_api.service;

import java.util.List;

import com.courseplatform.course_api.dto.UpdateUserProfileRequest;
import com.courseplatform.course_api.dto.UserProfileResponse;
import com.courseplatform.course_api.model.User;

public interface UserService {

    User registerUser(String email, String password);

    List<User> getAllUsers();

    User getUserById(Long id);

    User getUserByEmail(String email);

    UserProfileResponse getProfile(Long id, String requesterEmail);

    UserProfileResponse updateProfile(Long id, UpdateUserProfileRequest request, String requesterEmail);

    void deleteProfile(Long id, String requesterEmail);
}
