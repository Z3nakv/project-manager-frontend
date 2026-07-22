import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { notificationsArraySchema } from "../types/notification";

// services/notificationService.ts
export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  const response = notificationsArraySchema.safeParse(data);
  if (response.success) return response.data;
};

export const markAsRead = async (notificationId: string) => {
  try {
    const { data } = await api.put(`/notifications/${notificationId}/read`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const clearAll = async () => {
  try {
    const { data } = await api.delete("/notifications");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};
