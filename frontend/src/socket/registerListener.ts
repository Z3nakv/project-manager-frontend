import type { QueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";
import { registerNotificationListeners } from "./listeners/notification.listener";
import { registerProjectListeners } from "./listeners/project.listener";
import { registerTaskListeners } from "./listeners/task.listener";
import { registerMemberListeners } from "./listeners/member.listener";
import { registerNoteListener } from "./listeners/note.listener";

export function registerListeners(
  socket: Socket,
  queryClient: QueryClient
) {
  const cleanups = [
    registerNotificationListeners(socket, queryClient),
    registerProjectListeners(socket, queryClient),
    registerTaskListeners(socket, queryClient),
    registerMemberListeners(socket, queryClient),
    registerNoteListener(socket, queryClient)
  ];

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}