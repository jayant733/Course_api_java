import API from "../api/axios";

export const enrollInCourse = (courseId: string | number) => {
  return API.post(`/enrollments?courseId=${courseId}`);
};

export const getMyEnrollments = () => {
  return API.get("/users/me/enrollments");
};