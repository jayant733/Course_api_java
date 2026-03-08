package com.courseplatform.course_api.service;

public interface TokenBlacklistService {
    void blacklistToken(String token);
    boolean isBlacklisted(String token);
}