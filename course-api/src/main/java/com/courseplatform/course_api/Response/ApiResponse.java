package com.courseplatform.course_api.Response;



public record ApiResponse<T>(
        boolean success,
        T data,
        String message
) {}