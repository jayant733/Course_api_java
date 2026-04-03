package com.courseplatform.course_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.PasswordResetToken;
import com.courseplatform.course_api.model.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenAndUsedFalse(String token);

    void deleteByUser(User user);
}
