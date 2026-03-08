
package com.courseplatform.course_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.BlacklistedToken;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, String> {
}