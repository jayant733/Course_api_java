import API from "../api/axios";

export const enrollInCourse = (courseId: string | number) => {
  return API.post(`/enrollments?courseId=${courseId}`);
};

export const getMyEnrollments = () => {
  return API.get("/users/me/enrollments");
};

export const unenrollFromCourse = (userId: string | number, courseId: string | number) => {
  return API.delete(`/enrollments/users/${userId}/courses/${courseId}`);
};

export const getAllEnrollments = () => {
  return API.get("/enrollments/all");
};
