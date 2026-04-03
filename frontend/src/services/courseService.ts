import API from "../api/axios";

export const getAllCourses = () => {
  return API.get("/courses");
};

export const getCourseById = (id: string | number) => {
  return API.get(`/courses/${id}`);
};

export const searchCourses = (query: string) => {
  return API.get(`/search?q=${encodeURIComponent(query)}`);
};

export const searchCourseCatalog = (keyword: string) => {
  return API.get(`/courses/search?keyword=${encodeURIComponent(keyword)}`);
};
