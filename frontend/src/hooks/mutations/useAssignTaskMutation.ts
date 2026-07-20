import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { assignTask } from "../../services/assignTask";
import type { assignTaskType } from "../../types/assignTaskSchema";
import { socket } from "../../lib/socket";

type useAssignTaskMutationProps = {
    taskID: string
    projectID: string
}

export const useAssignTaskMutation = ({ taskID, projectID }: useAssignTaskMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userIDs: assignTaskType) => assignTask( {projectID, taskID, userIDs} ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectID] });
      toast.success(data.message);
      socket.emit('assignedTask', {userID: data.userID, taskName: data.taskName, projectName: data.projectName, projectID: data.projectID, userIDs:data.userIDs})
    },
    onError: (error) => toast.error(error.message),
  });
};