package com.courseplatform.course_api.seed;

import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.Topic;
import com.courseplatform.course_api.model.Subtopic;
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
import java.util.Map;

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

            InputStream inputStream =
                    new ClassPathResource("data/courses.json").getInputStream();

            List<Map<String, Object>> rawCourses =
                    objectMapper.readValue(inputStream,
                            new TypeReference<List<Map<String, Object>>>() {});

            for (Map<String, Object> rawCourse : rawCourses) {

                Course course = Course.create(
                        (String) rawCourse.get("id"),
                        (String) rawCourse.get("title"),
                        (String) rawCourse.get("description")
                );

                List<Map<String, Object>> topics =
                        (List<Map<String, Object>>) rawCourse.get("topics");

                for (Map<String, Object> rawTopic : topics) {

                    Topic topic = Topic.create(
                            (String) rawTopic.get("id"),
                            (String) rawTopic.get("title")
                    );

                    course.addTopic(topic);

                    List<Map<String, Object>> subtopics =
                            (List<Map<String, Object>>) rawTopic.get("subtopics");

                    for (Map<String, Object> rawSub : subtopics) {

                        Subtopic subtopic = Subtopic.create(
                                (String) rawSub.get("id"),
                                (String) rawSub.get("title"),
                                (String) rawSub.get("content")
                        );

                        topic.addSubtopic(subtopic);
                    }
                }

                courseRepository.save(course);
            }

            System.out.println("Seed data loaded successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}