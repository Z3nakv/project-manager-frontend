import type { QueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";
import { SocketEvents } from "../events";

export function registerNotificationListeners(
  socket: Socket,
  queryClient: QueryClient
) {

  const onNewNotification = () => {
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });
  };

  socket.on(SocketEvents.NEW_NOTIFICATION, onNewNotification);

  return () => {
    socket.off(SocketEvents.NEW_NOTIFICATION, onNewNotification);
  };
}