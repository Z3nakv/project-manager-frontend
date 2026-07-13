import { useEffect, type PropsWithChildren } from "react";
import { socket } from "../lib/socket";
import type { User } from "../types";
import { registerListeners } from "./registerListener";
import { useQueryClient } from "@tanstack/react-query";
import { SocketEvents } from "./events";

function SocketProvider({ children, user } : PropsWithChildren<{ user: User }>) {

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?._id) return;

    const joinUserRoom = () => {
      socket.emit(SocketEvents.JOIN_USER, user._id);
    };

    if (!socket.connected) {
        socket.connect();
    }

    if (socket.connected) {
      joinUserRoom();
    }

    socket.on("connect", joinUserRoom);

    const cleanup =
      registerListeners(
        socket,
        queryClient
      );

    return () => {
      socket.off("connect", joinUserRoom);
      cleanup();
      socket.disconnect();
    };
  }, [user?._id, queryClient]);

  return <>{children}</>;
}

export default SocketProvider;