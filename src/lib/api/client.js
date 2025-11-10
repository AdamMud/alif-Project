import axios from "axios";

export const API_BASE = "https://46.62.232.61:18473/api";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      // перенаправление на entry — в клиентских компонентах
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
