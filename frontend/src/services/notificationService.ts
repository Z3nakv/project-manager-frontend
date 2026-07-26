import { del, get, put, throwApiError } from "../lib/axios";
import { notificationsArraySchema } from "../types/notification";

export const getNotifications = async () => {
  try {
    const data = await get<unknown>("/notifications");
    const response = notificationsArraySchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error("Datos de notificaciones no válidos");
  } catch (error) {
    if (error instanceof Error && error.message === "Datos de notificaciones no válidos") {
      throw error;
    }
    throwApiError(error);
  }
};

export const markAsRead = async (notificationId: string) => {
  try {
    return await put(`/notifications/${notificationId}/read`);
  } catch (error) {
    throwApiError(error);
  }
};

export const clearAll = async () => {
  try {
    return await del("/notifications");
  } catch (error) {
    throwApiError(error);
  }
};