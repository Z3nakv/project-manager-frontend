import { notificationsArraySchema } from "../types/notification";
import { httpDelete, httpGet, httpPut } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";

export const getNotifications = async () => {
  const data = await httpGet("/notifications");
  return parseOrThrow(notificationsArraySchema, data, "getNotifications")
};

type MessageResponse = { message: string };

export const markAsRead = async (notificationId: string) => {
    const data = await httpPut<MessageResponse>(`/notifications/${notificationId}/read`);
    return data.message;
};

export const clearAll = async () => {
    const data = await httpDelete<MessageResponse>("/notifications");
    return data.message;
};
