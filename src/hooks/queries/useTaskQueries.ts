import { useQuery } from "@tanstack/react-query";
import { getProjectTaskById } from "../../services/taskServices";

type useGetTaskDataProps = {
    projectId: string;
    taskId: string | null;
}

export const useGetTaskData = ({ projectId, taskId } : useGetTaskDataProps) => {
    return useQuery({
    queryKey: ["task", projectId, taskId],
    queryFn: () => getProjectTaskById({ 
      projectId, 
      taskId: taskId as string
    }),
    enabled: !!projectId && !!taskId,
    staleTime: 1000 * 30, 
  });
  
}