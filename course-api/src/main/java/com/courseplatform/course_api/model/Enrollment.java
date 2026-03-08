package com.courseplatform.course_api.model;

import java.time.Instant;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "enrollments",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "course_id"})
)
public class Enrollment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant enrolledAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    protected Enrollment() {
        // JPA
    }

    private Enrollment(User user, Course course, Instant enrolledAt) {
        this.user = Objects.requireNonNull(user, "User cannot be null");
        this.course = Objects.requireNonNull(course, "Course cannot be null");
        this.enrolledAt = Objects.requireNonNull(enrolledAt, "Enrollment time required");
    }

    public static Enrollment create(User user, Course course, Instant enrolledAt) {
        return new Enrollment(user, course, enrolledAt);
    }

    public Long getId() {
        return id;
    }

    public Instant getEnrolledAt() {
        return enrolledAt;
    }

    public User getUser() {
        return user;
    }

    public Course getCourse() {
        return course;
    }
}