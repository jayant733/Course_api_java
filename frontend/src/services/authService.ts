import API from "../api/axios";

export const loginUser = (email: string, password: string) => {
  return API.post("/auth/login", { email, password });
};

export const logoutUser = () => {
  return API.post("/auth/logout");
};

export const registerUser = (email: string, password: string) => {
  return API.post("/users", { email, password });
};