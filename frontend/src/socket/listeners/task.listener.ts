import type { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Socket } from "socket.io-client";
import { SocketEvents } from "../events";

export function registerTaskListeners (
    socket: Socket,
    queryClient: QueryClient
) {
    const onTaskCreated = (data : {message:string, projectID:string}) => {

    toast.info(data.message);

    queryClient.invalidateQueries({
      queryKey: ["project", data.projectID],
    });

  };

  const onTaskUpdated = (data : {message:string, projectID: string}) => {

    toast.info(data.message);

    queryClient.invalidateQueries({
      queryKey: ["project", data.projectID],
    });

  };

  const onTaskDeleted = (data : {message:string, projectID: string}) => {

    toast.info(data.message);

    queryClient.invalidateQueries({
      queryKey: ["project", data.projectID],
    });

  };

  const onTaskStatusUpdated = (data : {message:string, projectID: string}) => {

    toast.info(data.message);

    queryClient.invalidateQueries({
      queryKey: ["project", data.projectID],
    });

    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });

  };

  socket.on(
    SocketEvents.TASK_CREATED,
    onTaskCreated
  );

  socket.on(
    SocketEvents.TASK_UPDATED,
    onTaskUpdated
  );

  socket.on(
    SocketEvents.TASK_DELETED,
    onTaskDeleted
  );

  socket.on(
    SocketEvents.TASK_STATUS_UPDATED,
    onTaskStatusUpdated
  );

  return () => {

    socket.off(
      SocketEvents.TASK_CREATED,
      onTaskCreated
    );

    socket.off(
      SocketEvents.TASK_UPDATED,
      onTaskUpdated
    );

    socket.off(
      SocketEvents.TASK_DELETED,
      onTaskDeleted
    );

    socket.off(
      SocketEvents.TASK_STATUS_UPDATED,
      onTaskStatusUpdated
    );

  };
}