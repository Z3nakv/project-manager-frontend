import { api } from "../lib/axios"
import { notificationsArraySchema } from "../types/notification";

// services/notificationService.ts
export const getNotifications = async () => {
    const { data } = await api.get('/notifications');
    const response = notificationsArraySchema.safeParse(data);
    if(response.success) return response.data;
}

export const markAsRead = async (notificationId: string) => {
    const { data } = await api.put(`/notifications/${notificationId}/read`)
    return data
}

export const clearAll = async () => {
    const { data } = await api.delete('/notifications')
    return data
}