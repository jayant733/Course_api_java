package com.courseplatform.course_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courseplatform.course_api.model.User;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndDeletedFalse(String email);

    boolean existsByEmailAndDeletedFalse(String email);

    boolean existsByEmailAndDeletedFalseAndIdNot(String email, Long id);
}
