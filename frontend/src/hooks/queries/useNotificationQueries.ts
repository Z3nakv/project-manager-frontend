import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/notificationService";

export const useGetNotificationsQuery = (enabled = true) => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        enabled,
      });
}