package com.courseplatform.course_api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class BlacklistedToken {

    @Id
    private String token;

    private LocalDateTime blacklistedAt;

    public BlacklistedToken() {}

    public BlacklistedToken(String token) {
        this.token = token;
        this.blacklistedAt = LocalDateTime.now();
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getBlacklistedAt() {
        return blacklistedAt;
    }
}