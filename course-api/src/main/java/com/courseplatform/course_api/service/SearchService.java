package com.courseplatform.course_api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.courseplatform.course_api.dto.SearchCourseResultResponse;
import com.courseplatform.course_api.dto.SearchMatchResponse;
import com.courseplatform.course_api.dto.SearchResponse;
import com.courseplatform.course_api.exception.BadRequestException;
import com.courseplatform.course_api.model.Subtopic;
import com.courseplatform.course_api.repository.SubtopicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SubtopicRepository subtopicRepository;

    public SearchResponse search(String query) {

        if (query == null || query.trim().isEmpty()) {
            throw new BadRequestException("Search query must not be empty");
        }

        List<Subtopic> subtopics = subtopicRepository.searchSubtopics(query);

        Map<String, SearchCourseResultResponse> groupedResults = new HashMap<>();

        for (Subtopic sub : subtopics) {

            String courseId = sub.getTopic().getCourse().getId();
            String courseTitle = sub.getTopic().getCourse().getTitle();
            String topicTitle = sub.getTopic().getTitle();

            String snippet = sub.getContent().length() > 120
                    ? sub.getContent().substring(0, 120) + "..."
                    : sub.getContent();

            SearchMatchResponse match = new SearchMatchResponse(
                    "subtopic",
                    topicTitle,
                    sub.getId(),
                    sub.getTitle(),
                    snippet
            );

            groupedResults
                    .computeIfAbsent(courseId, id ->
                            new SearchCourseResultResponse(id, courseTitle, new ArrayList<>()))
                    .getMatches()
                    .add(match);
        }

        return new SearchResponse(query, new ArrayList<>(groupedResults.values()));
    }
}
