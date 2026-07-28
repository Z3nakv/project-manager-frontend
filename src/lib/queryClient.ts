import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./http";

const shouldRetryQuery = (failureCount: number, error: unknown) => {
  if (
    error instanceof ApiError && 
    error.status && 
    error.status >= 400 && 
    error.status < 500
  ) {
    return false;
  }

  return failureCount < 1;
};

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: shouldRetryQuery,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5,
      },
      mutations: {
        retry: false,
      },
    },
  });
