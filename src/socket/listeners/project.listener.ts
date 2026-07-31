import type { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Socket } from "socket.io-client";
import { SocketEvents } from "../events";

export function registerProjectListeners(
  socket: Socket,
  queryClient: QueryClient
) {

  const onProjectUpdated = (data: {message:string}) => {
    toast.info(data.message);
    queryClient.invalidateQueries({queryKey: ["projects"]});};

  const onProjectDeleted = (data: {message:string}) => {
    toast.info(data.message);
    queryClient.invalidateQueries({queryKey: ["projects"]})};

  socket.on(
    SocketEvents.PROJECT_UPDATED,
    onProjectUpdated
  );

  socket.on(
    SocketEvents.PROJECT_DELETED,
    onProjectDeleted
  );

  return () => {

    socket.off(
      SocketEvents.PROJECT_UPDATED,
      onProjectUpdated
    );

    socket.off(
      SocketEvents.PROJECT_DELETED,
      onProjectDeleted
    );

  };

}