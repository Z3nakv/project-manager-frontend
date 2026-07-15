import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearAll, markAsRead } from "../../services/notificationService";

export const useMarkAsReadMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: markAsRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export const useClearAllMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clearAll,
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["notifications"] }),
      });
}