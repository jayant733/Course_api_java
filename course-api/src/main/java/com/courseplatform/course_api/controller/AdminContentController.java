package com.courseplatform.course_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.Response.ApiResponse;
import com.courseplatform.course_api.dto.AdminCreateSubtopicRequest;
import com.courseplatform.course_api.dto.AdminCreateTopicRequest;
import com.courseplatform.course_api.dto.AdminUpdateSubtopicRequest;
import com.courseplatform.course_api.dto.AdminUpdateTopicRequest;
import com.courseplatform.course_api.service.AdminContentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminContentController {

    private final AdminContentService adminContentService;

    @PostMapping("/courses/{courseId}/topics")
    public ResponseEntity<ApiResponse<String>> addTopic(
            @PathVariable String courseId,
            @Valid @RequestBody AdminCreateTopicRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(
                true,
                adminContentService.addTopic(courseId, request),
                "Topic created successfully"));
    }

    @PutMapping("/topics/{topicId}")
    public ResponseEntity<ApiResponse<String>> updateTopic(
            @PathVariable String topicId,
            @Valid @RequestBody AdminUpdateTopicRequest request) {
        adminContentService.updateTopic(topicId, request);
        return ResponseEntity.ok(new ApiResponse<>(true, topicId, "Topic updated successfully"));
    }

    @DeleteMapping("/topics/{topicId}")
    public ResponseEntity<ApiResponse<String>> deleteTopic(@PathVariable String topicId) {
        adminContentService.deleteTopic(topicId);
        return ResponseEntity.ok(new ApiResponse<>(true, topicId, "Topic deleted successfully"));
    }

    @PostMapping("/topics/{topicId}/subtopics")
    public ResponseEntity<ApiResponse<String>> addSubtopic(
            @PathVariable String topicId,
            @Valid @RequestBody AdminCreateSubtopicRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(
                true,
                adminContentService.addSubtopic(topicId, request),
                "Subtopic created successfully"));
    }

    @PutMapping("/subtopics/{subtopicId}")
    public ResponseEntity<ApiResponse<String>> updateSubtopic(
            @PathVariable String subtopicId,
            @Valid @RequestBody AdminUpdateSubtopicRequest request) {
        adminContentService.updateSubtopic(subtopicId, request);
        return ResponseEntity.ok(new ApiResponse<>(true, subtopicId, "Subtopic updated successfully"));
    }

    @DeleteMapping("/subtopics/{subtopicId}")
    public ResponseEntity<ApiResponse<String>> deleteSubtopic(@PathVariable String subtopicId) {
        adminContentService.deleteSubtopic(subtopicId);
        return ResponseEntity.ok(new ApiResponse<>(true, subtopicId, "Subtopic deleted successfully"));
    }
}
