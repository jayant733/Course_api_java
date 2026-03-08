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