import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { socket } from "../../lib/socket";

export function useHandleMutationSuccess() {
  const queryClient = useQueryClient();

  return function handleSuccess({
    message,
    invalidateKeys,
    socketEvent,
    socketPayload,
  }: {
    message: string;
    invalidateKeys: unknown[][];
    socketEvent?: string;
    socketPayload?: object;
  }) {
    toast.success(message);
    invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
    if (socketEvent) socket.emit(socketEvent, socketPayload);
  };
}