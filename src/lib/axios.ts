import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/auth";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

api.interceptors.request.use( (config) => {
    const token = getAccessToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    if(['post', 'put', 'delete', 'patch'].includes(config.method || '')) {
        config.headers['Idempotency-Key'] = 
        typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;;
    }
    return config;
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest); // reintenta la request original
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);