import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig
} from "axios";
import { clearSession, getSession, saveSession } from "../services/sessionService";

/**
 * Axios instance
 */
const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

const REFRESH_CLIENT = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Request interceptor
 * Attach auth token automatically
 */
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = getSession();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Global error handling
 */
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      const session = getSession();

      if (session.refreshToken) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await REFRESH_CLIENT.post("/auth/refresh", {
            refreshToken: session.refreshToken,
          });
          const payload = refreshResponse.data?.data;

          saveSession({
            userId: payload.userId,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            email: payload.email,
            role: payload.role,
          });

          originalRequest.headers.Authorization = `Bearer ${payload.accessToken}`;
          return API(originalRequest);
        } catch {
          clearSession();
        }
      } else {
        clearSession();
      }

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
