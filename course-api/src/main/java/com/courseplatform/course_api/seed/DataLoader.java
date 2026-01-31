package com.courseplatform.course_api.seed;

import com.courseplatform.course_api.model.*;
import com.courseplatform.course_api.repository.CourseRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final CourseRepository courseRepository;
    private final ObjectMapper objectMapper;

  @EventListener(ApplicationReadyEvent.class)
public void loadData() {
    try {
        if (courseRepository.count() > 0) {
            System.out.println("Seed data already loaded.");
            return;
        }

        InputStream inputStream = new ClassPathResource("data/courses.json").getInputStream();

        List<Course> courses = objectMapper.readValue(inputStream, new TypeReference<List<Course>>() {});

        for (Course course : courses) {
            for (Topic topic : course.getTopics()) {
                topic.setCourse(course);
                for (Subtopic subtopic : topic.getSubtopics()) {
                    subtopic.setTopic(topic);
                }
            }
        }

        courseRepository.saveAll(courses);
        System.out.println("Seed data loaded successfully!");

    } catch (Exception e) {
        e.printStackTrace();
    }
}

}
// Runs automatically when app starts
// Checks if DB already has courses → prevents duplicate load
// Reads JSON file
// Fixes relationships (Course → Topic → Subtopic)
// Saves everything in one go
