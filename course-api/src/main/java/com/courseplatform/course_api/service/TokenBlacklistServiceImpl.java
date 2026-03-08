package com.courseplatform.course_api.service;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.model.BlacklistedToken;
import com.courseplatform.course_api.repository.BlacklistedTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenBlacklistServiceImpl implements TokenBlacklistService {

    private final BlacklistedTokenRepository repository;

    @Override
    public void blacklistToken(String token) {
        repository.save(new BlacklistedToken(token));
    }

    @Override
    public boolean isBlacklisted(String token) {
        return repository.existsById(token);
    }
}