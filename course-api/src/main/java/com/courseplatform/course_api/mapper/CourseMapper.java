package com.courseplatform.course_api.mapper;

import java.util.Collections;
import java.util.List;

import com.courseplatform.course_api.dto.CourseDetailResponse;
import com.courseplatform.course_api.dto.CourseSummaryResponse;
import com.courseplatform.course_api.dto.SubtopicResponse;
import com.courseplatform.course_api.dto.TopicResponse;
import com.courseplatform.course_api.model.Course;
import com.courseplatform.course_api.model.Subtopic;
import com.courseplatform.course_api.model.Topic;

public final class CourseMapper {

    private CourseMapper() {}

    // =============================
    // Summary Mapping
    // =============================
    public static CourseSummaryResponse toSummary(Course course) {

        List<Topic> topics = course.getTopics() == null
                ? Collections.emptyList()
                : course.getTopics();

        int topicCount = topics.size();

        int subtopicCount = topics.stream()
                .mapToInt(topic -> {
                    List<Subtopic> subs = topic.getSubtopics() == null
                            ? Collections.emptyList()
                            : topic.getSubtopics();
                    return subs.size();
                })
                .sum();

        return CourseSummaryResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .topicCount(topicCount)
                .subtopicCount(subtopicCount)
                .build();
    }

    // =============================
    // Detail Mapping
    // =============================
    public static CourseDetailResponse toDetail(Course course) {

        List<Topic> topics = course.getTopics() == null
                ? Collections.emptyList()
                : course.getTopics();

        List<TopicResponse> topicResponses = topics.stream()
                .map(CourseMapper::toTopic)
                .toList();

        return new CourseDetailResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                topicResponses
        );
    }

    private static TopicResponse toTopic(Topic topic) {

        List<Subtopic> subs = topic.getSubtopics() == null
                ? Collections.emptyList()
                : topic.getSubtopics();

        List<SubtopicResponse> subtopics = subs.stream()
                .map(CourseMapper::toSubtopic)
                .toList();

        return new TopicResponse(
                topic.getId(),
                topic.getTitle(),
                subtopics
        );
    }

    private static SubtopicResponse toSubtopic(Subtopic subtopic) {

        return new SubtopicResponse(
                subtopic.getId(),
                subtopic.getTitle(),
                subtopic.getContent()
        );
    }
}