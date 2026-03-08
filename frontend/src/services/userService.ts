import API from "../api/axios";

export const getAllUsers = () => {
  return API.get("/users");
};

export const getUserById = (id: string | number) => {
  return API.get(`/users/${id}`);
};