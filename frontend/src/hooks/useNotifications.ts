import { useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../lib/socket";
import type { SocketNotification, NotificationType } from "../types/notification";

// Un solo lugar que decide qué queries invalidar por tipo de notificación
const queryInvalidationMap: Record<NotificationType, (n: SocketNotification) => string[][]> = {
  project_updated: () => [["projects"]],
  project_deleted: () => [["projects"]],
  member_added: () => [["projects"]],
  member_removed: () => [["projects"]],
  task_created: (n) => [["project", n.projectId]],
  task_updated: (n) => [["project", n.projectId]],
  task_deleted: (n) => [["project", n.projectId]],
  task_status_updated: (n) => [["project", n.projectId], ["notifications"]],
};

export function useSocketNotifications(userId?: string) {
  const queryClient = useQueryClient();

  // Join room del usuario
  useEffect(() => {
    if (!userId) return;

    const joinRoom = () => socket.emit("join_user", userId);
    joinRoom();
    socket.on("connect", joinRoom);

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [userId]);

  // Un solo listener para todas las notificaciones
  useEffect(() => {
    const handleNotification = (payload: SocketNotification) => {
      toast.info(payload.message);

      const keysToInvalidate = queryInvalidationMap[payload.type]?.(payload) ?? [];
      keysToInvalidate.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey })
      );

      // El notification center siempre se refresca, sin importar el tipo
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    socket.off("notification"); // guard contra doble suscripción
    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [queryClient]);
}