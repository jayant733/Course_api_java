import API from "../api/axios";

export const markLessonComplete = (subtopicId: string | number) => {
  return API.post("/progress/complete", { subtopicId });
};