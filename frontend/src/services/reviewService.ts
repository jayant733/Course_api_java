import API from "../api/axios";

export const getCourseReviews = (courseId: string | number) => {
  return API.get(`/reviews/${courseId}`);
};

export const addCourseReview = (
  courseId: string | number,
  rating: number,
  comment: string
) => {
  return API.post(`/reviews/${courseId}`, {
    rating,
    comment,
  });
};