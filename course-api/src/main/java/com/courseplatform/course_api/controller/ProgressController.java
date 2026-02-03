package com.courseplatform.course_api.controller;

import org.springframework.web.bind.annotation.*;

import com.courseplatform.course_api.dto.ProgressRequest;
import com.courseplatform.course_api.service.ProgressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @PostMapping("/complete")
    public String completeSubtopic(@RequestBody ProgressRequest request) {
        progressService.markSubtopicCompleted(request.getUserId(), request.getSubtopicId());
        return "Subtopic marked as completed!";
    }
}
