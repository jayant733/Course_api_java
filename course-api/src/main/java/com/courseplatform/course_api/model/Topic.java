package com.courseplatform.course_api.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Subtopic> subtopics = new ArrayList<>();

    protected Topic() {
        // Required by JPA
    }

    private Topic(String id, String title) {
        this.id = Objects.requireNonNull(id, "Topic id cannot be null");
        this.title = validateTitle(title);
    }

    public static Topic create(String id, String title) {
        return new Topic(id, title);
    }

    // =========================
    // Domain Behavior
    // =========================

    void setCourse(Course course) {
        // package-private: only Course should call this
        this.course = course;
    }

    public void updateTitle(String title) {
        this.title = validateTitle(title);
    }

    public void addSubtopic(Subtopic subtopic) {
        Objects.requireNonNull(subtopic, "Subtopic cannot be null");
        subtopic.setTopic(this);
        this.subtopics.add(subtopic);
    }

    public void removeSubtopic(Subtopic subtopic) {
        if (this.subtopics.remove(subtopic)) {
            subtopic.setTopic(null);
        }
    }

    public int getSubtopicCount() {
        return subtopics.size();
    }

    // =========================
    // Getters (no public setters!)
    // =========================

    public String getId() {
    return id;
}

public String getTitle() {
    return title;
}

public Course getCourse() {
    return course;
}

public List<Subtopic> getSubtopics() {
    return subtopics;
}

    // =========================
    // Validation
    // =========================

    private String validateTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Topic title cannot be empty");
        }
        return title.trim();
    }
}