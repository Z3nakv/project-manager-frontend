import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN_JWT");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (["post", "put", "delete", "patch"].includes(config.method?.toLowerCase() ?? "")) {
    config.headers["Idempotency-Key"] = crypto.randomUUID();
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

export const request = async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  const response = await api.request<T>(config);
  return response.data;
};

export const get = async <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: "GET", url });

export const post = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: "POST", url, data });

export const put = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: "PUT", url, data });

export const patch = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: "PATCH", url, data });

export const del = async <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: "DELETE", url });

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === "string") {
      return responseData;
    }

    if (responseData && typeof responseData === "object" && "error" in responseData) {
      const errorMessage = responseData.error;
      if (typeof errorMessage === "string") {
        return errorMessage;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ha ocurrido un error inesperado";
};

export const throwApiError = (error: unknown): never => {
  throw new Error(getApiErrorMessage(error), { cause: error });
};