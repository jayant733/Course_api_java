package com.courseplatform.course_api.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "subtopics")
public class Subtopic {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @OneToMany(mappedBy = "subtopic", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<SubtopicProgress> progressRecords = new ArrayList<>();

    protected Subtopic() {
        // Required by JPA
    }

    private Subtopic(String id, String title, String content) {
        this.id = Objects.requireNonNull(id, "Subtopic id cannot be null");
        this.title = validateTitle(title);
        this.content = content;
    }

    public static Subtopic create(String id, String title, String content) {
        return new Subtopic(id, title, content);
    }

    // =========================
    // Domain Behavior
    // =========================

    void setTopic(Topic topic) {
        // package-private: only Topic should call this
        this.topic = topic;
    }

    public void updateContent(String title, String content) {
        this.title = validateTitle(title);
        this.content = content;
    }

    public void addProgressRecord(SubtopicProgress progress) {
        Objects.requireNonNull(progress, "Progress record cannot be null");
        progress.setSubtopic(this);
        this.progressRecords.add(progress);
    }

    public void removeProgressRecord(SubtopicProgress progress) {
        if (this.progressRecords.remove(progress)) {
            progress.setSubtopic(null);
        }
    }

    public int getProgressCount() {
        return progressRecords.size();
    }

    // =========================
    // Getters
    // =========================

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Topic getTopic() {
        return topic;
    }

    public List<SubtopicProgress> getProgressRecords() {
        return Collections.unmodifiableList(progressRecords);
    }

    // =========================
    // Validation
    // =========================

    private String validateTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Subtopic title cannot be empty");
        }
        return title.trim();
    }
}