import { httpDelete, httpGet, httpPut } from "../lib/http";
import { notificationsArraySchema } from "../types/notification";

// services/notificationService.ts
export const getNotifications = async () => {
  const data = await httpGet<unknown>("/notifications");
  const response = notificationsArraySchema.safeParse(data);
  if (response.success) return response.data;
  throw new Error("Los datos de notificaciones no tienen el formato esperado.");
};

export const markAsRead = async (notificationId: string) => {
  return httpPut(`/notifications/${notificationId}/read`);
};

export const clearAll = async () => {
  return httpDelete("/notifications");
};
