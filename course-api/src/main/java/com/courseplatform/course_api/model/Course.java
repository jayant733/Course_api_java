package com.courseplatform.course_api.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course extends BaseEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> topics = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments = new ArrayList<>();

    protected Course() {
        // Required by JPA
    }

    private Course(String id, String title, String description) {
        this.id = Objects.requireNonNull(id, "Course id cannot be null");
        this.title = validateTitle(title);
        this.description = description;
    }

    // Factory method (better than builder for domain control)
    public static Course create(String id, String title, String description) {
        return new Course(id, title, description);
    }

    public void softDelete() {
    this.markDeleted();
}

    // =========================
    // Domain Behavior
    // =========================

    public void updateDetails(String title, String description) {
        this.title = validateTitle(title);
        this.description = description;
    }

    public void addTopic(Topic topic) {
        Objects.requireNonNull(topic, "Topic cannot be null");
        topic.setCourse(this);
        this.topics.add(topic);
    }

    public void removeTopic(Topic topic) {
        if (this.topics.remove(topic)) {
            topic.setCourse(null);
        }
    }

    public int getTotalEnrollments() {
        return enrollments.size();
    }

    // =========================
    // Getters (No setters!)
    // =========================


public String getId() {
    return id;
}

public String getTitle() {
    return title;
}

public String getDescription() {
    return description;
}

public List<Topic> getTopics() {
    return topics;
}

public List<Enrollment> getEnrollments() {
    return enrollments;
}

    // =========================
    // Validation
    // =========================

    private String validateTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Course title cannot be empty");
        }
        return title.trim();
    }
}