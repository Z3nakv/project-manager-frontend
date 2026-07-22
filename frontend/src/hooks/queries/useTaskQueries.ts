import { useQuery } from "@tanstack/react-query";
import { getProjectTaskById } from "../../services/taskServices";

type useGetTaskDataProps = {
    projectId: string
    taskId: string
}

export const useGetTaskData = ({ projectId, taskId } : useGetTaskDataProps) => {
    return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getProjectTaskById({ projectId, taskId }),
    enabled: !!taskId,
  });
  
}