import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/notificationService";

export const useGetNotificationsQuery = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
      });
}