import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN_JWT");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (["post", "put", "delete", "patch"].includes(config.method || "")) {
    config.headers["Idempotency-Key"] =
      typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      window.dispatchEvent(new CustomEvent("forbidden"));
    }

    return Promise.reject(error);
  },
);
