import type { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Socket } from "socket.io-client";
import { SocketEvents } from "../events";

export function registerMemberListeners(
    socket: Socket,
    queryClient: QueryClient
) {
    const onMemberAdded = (data) => {

    toast.info(data.message);

    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });

  };

  const onMemberRemoved = (data) => {

    toast.info(data.message);

    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });

  };

  socket.on(
    SocketEvents.MEMBER_ADDED,
    onMemberAdded
  );

  socket.on(
    SocketEvents.MEMBER_REMOVED,
    onMemberRemoved
  );

  return () => {

    socket.off(
      SocketEvents.MEMBER_ADDED,
      onMemberAdded
    );

    socket.off(
      SocketEvents.MEMBER_REMOVED,
      onMemberRemoved
    );

  };
}