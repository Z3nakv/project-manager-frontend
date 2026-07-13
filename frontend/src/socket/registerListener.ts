import type { QueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";
import { registerNotificationListeners } from "./listeners/notification.listener";
import { registerProjectListeners } from "./listeners/project.listener";
import { registerTaskListeners } from "./listeners/task.listener";
import { registerMemberListeners } from "./listeners/member.listener";

export function registerListeners(
  socket: Socket,
  queryClient: QueryClient
) {
  const cleanups = [
    registerNotificationListeners(socket, queryClient),
    registerProjectListeners(socket, queryClient),
    registerTaskListeners(socket, queryClient),
    registerMemberListeners(socket, queryClient),
  ];

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}