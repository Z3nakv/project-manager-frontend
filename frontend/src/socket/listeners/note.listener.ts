import type { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Socket } from "socket.io-client";
import { SocketEvents } from "../events";

interface NoteNotificationPayload {
  message: string;
}

export function registerNoteListener(
    socket: Socket,
    queryClient: QueryClient
) {
    const onNoteAdded = (payload : NoteNotificationPayload) => {
        
        
        toast.info(payload.message)

        queryClient.invalidateQueries({
            queryKey: ["notifications"],
        });
    }

    const onNoteDeleted = (payload: NoteNotificationPayload) => {
        toast.info(payload.message)

        queryClient.invalidateQueries({
            queryKey: ["notifications"],
        });
    }

    socket.on(
        SocketEvents.NOTE_ADDED,
        onNoteAdded
      );
    
      socket.on(
        SocketEvents.NOTE_DELETED,
        onNoteDeleted
      );

      return () => {

    socket.off(
      SocketEvents.NOTE_ADDED,
        onNoteAdded
    );

    socket.off(
      SocketEvents.NOTE_DELETED,
        onNoteDeleted
    );

  };
}