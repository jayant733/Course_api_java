package com.courseplatform.course_api.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.courseplatform.course_api.dto.SearchResponse;
import com.courseplatform.course_api.service.SearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    // 👤 USER + 👑 ADMIN
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public SearchResponse search(@RequestParam String q) {
        return searchService.search(q);
    }
}
