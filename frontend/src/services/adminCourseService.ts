import API from "../api/axios";

export const createCourse = (courseData: any) => {
  return API.post("/admin/courses", courseData);
};

export const updateCourse = (id: string | number, courseData: any) => {
  return API.put(`/admin/courses/${id}`, courseData);
};

export const deleteCourse = (id: string | number) => {
  return API.delete(`/admin/courses/${id}`);
};

export const addTopicToCourse = (courseId: string | number, payload: { title: string }) => {
  return API.post(`/admin/courses/${courseId}/topics`, payload);
};

export const addSubtopicToTopic = (topicId: string | number, payload: { title: string; content: string }) => {
  return API.post(`/admin/topics/${topicId}/subtopics`, payload);
};

export const updateTopic = (topicId: string | number, payload: { title: string }) => {
  return API.put(`/admin/topics/${topicId}`, payload);
};

export const deleteTopic = (topicId: string | number) => {
  return API.delete(`/admin/topics/${topicId}`);
};

export const updateSubtopic = (subtopicId: string | number, payload: { title: string; content: string }) => {
  return API.put(`/admin/subtopics/${subtopicId}`, payload);
};

export const deleteSubtopic = (subtopicId: string | number) => {
  return API.delete(`/admin/subtopics/${subtopicId}`);
};
