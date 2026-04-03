import API from "../api/axios";
import { clearSession, saveSession } from "./sessionService";

export interface AuthResponse {
  userId: number;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  email: string;
  role: string;
}

export const loginUser = (email: string, password: string) => {
  return API.post("/auth/login", { email, password });
};

export const logoutUser = () => {
  return API.post("/auth/logout");
};

export const registerUser = (
  email: string,
  password: string,
  role: string,
  phoneNumber?: string
) => {
  return API.post("/auth/register", {
    email,
    password,
    role,
    phoneNumber
  });
};

export const refreshSession = (refreshToken: string) => {
  return API.post("/auth/refresh", { refreshToken });
};

export const forgotPassword = (email: string) => {
  return API.post("/auth/forgot-password", { email });
};

export const resetPassword = (token: string, newPassword: string) => {
  return API.post("/auth/reset-password", { token, newPassword });
};

export function persistAuthResponse(payload: AuthResponse) {
  saveSession({
    userId: payload.userId,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    email: payload.email,
    role: payload.role,
  });
}

export async function logoutAndClear() {
  try {
    await logoutUser();
  } finally {
    clearSession();
  }
}
