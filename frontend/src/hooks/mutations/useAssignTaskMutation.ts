import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { assignTask } from "../../services/assignTask";

type useAssignTaskMutationProps = {
    taskID: string
    projectID: string
}

export const useAssignTaskMutation = ({ taskID, projectID }: useAssignTaskMutationProps) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userIDs: string[]) => assignTask( {taskID, projectID, userIDs} ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectID] });
      toast.success("Tarea asignada");
    },
    onError: (error) => toast.error(error.message),
  });
};