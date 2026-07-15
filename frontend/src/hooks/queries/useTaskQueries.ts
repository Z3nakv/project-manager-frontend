import { useQuery } from "@tanstack/react-query";
import { getProjectTaskByID } from "../../services/taskServices";

type useGetTaskDataProps = {
    projectID: string
    taskID: string
}

export const useGetTaskData = ({ projectID, taskID } : useGetTaskDataProps) => {
    return useQuery({
    queryKey: ["task", taskID],
    queryFn: () => getProjectTaskByID({ projectID, taskID }),
    enabled: !!taskID,
  });
  
}