import API from "../api/axios";

export const getAllUsers = () => {
  return API.get("/users");
};

export const getUserById = (id: string | number) => {
  return API.get(`/users/${id}`);
};

export const getCurrentUser = () => {
  return API.get("/users/me");
};

export const updateUser = (id: string | number, payload: {
  email?: string;
  phoneNumber?: string;
  currentPassword?: string;
  newPassword?: string;
}) => {
  return API.put(`/users/${id}`, payload);
};

export const deleteUser = (id: string | number) => {
  return API.delete(`/users/${id}`);
};
