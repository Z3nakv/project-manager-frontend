import { isAxiosError, type AxiosRequestConfig } from "axios";
import { api } from "./axios";

export class ApiError extends Error {
  public readonly status?: number;

  constructor(message: string, status?: number, cause?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.cause = cause;
  }
}

type ErrorResponse = {
  error?: string;
  message?: string;
};

export const extractErrorMessage = (
  error: unknown,
  fallback = "Ocurrió un error inesperado",
) => {
  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (isAxiosError<ErrorResponse>(error)) {
    return error.response?.data?.error || error.response?.data?.message || error.message || fallback;
  }

  return fallback;
};

export const normalizeApiError = (
  error: unknown,
  fallback = "Ocurrió un error inesperado",
) => {
  if (error instanceof ApiError) {
    return error;
  }

  if (isAxiosError<ErrorResponse>(error)) {
    const message = error.response?.data?.error || error.response?.data?.message || error.message || fallback;
    return new ApiError(message, error.response?.status, error);
  }

  if (error instanceof Error) {
    return new ApiError(error.message, undefined, error);
  }

  return new ApiError(fallback, undefined, error);
};

export const request = async <T = unknown>(config: AxiosRequestConfig) => {
  try {
    const { data } = await api.request<T>(config);
    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const httpGet = async <T = unknown>(url: string, config?: AxiosRequestConfig) => {
  return request<T>({ ...config, method: "get", url });
};

export const httpPost = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return request<T>({ ...config, method: "post", url, data });
};

export const httpPut = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return request<T>({ ...config, method: "put", url, data });
};

export const httpDelete = async <T = unknown>(url: string, config?: AxiosRequestConfig) => {
  return request<T>({ ...config, method: "delete", url });
};

export const httpPatch = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return request<T>({ ...config, method: "patch", url, data });
};
