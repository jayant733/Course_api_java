import API from "../api/axios";

export const markLessonComplete = (subtopicId: string | number) => {
  return API.post("/progress/complete", { subtopicId });
};

export const getCourseProgress = (userId: string | number, courseId: string | number) => {
  return API.get(`/progress/users/${userId}/courses/${courseId}`);
};

export const resetCourseProgress = (userId: string | number, courseId: string | number) => {
  return API.post(`/progress/users/${userId}/courses/${courseId}/reset`);
};
