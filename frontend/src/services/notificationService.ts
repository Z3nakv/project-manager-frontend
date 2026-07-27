import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { notificationsArraySchema } from "../types/notification";
import { httpDelete, httpPut } from "../lib/http";

// services/notificationService.ts
export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  const response = notificationsArraySchema.safeParse(data);
  if (response.success) return response.data;
};

type MessageResponse = { message: string };

export const markAsRead = async (notificationId: string) => {
  try {
    const data = await httpPut<MessageResponse>(`/notifications/${notificationId}/read`);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const clearAll = async () => {
  try {
    const data = await httpDelete<MessageResponse>("/notifications");
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};
