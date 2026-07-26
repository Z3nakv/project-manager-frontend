import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { assignTask } from "../../services/assignTask";
import type { assignTaskType } from "../../types/assignTaskSchema";
import { socket } from "../../lib/socket";

type AssignTaskMutationResponse = {
  message: string;
  userId: string;
  taskName: string;
  projectName: string;
  projectId: string;
  userIds: string[];
};

type useAssignTaskMutationProps = {
  taskId: string;
  projectId: string;
};

export const useAssignTaskMutation = ({ taskId, projectId }: useAssignTaskMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userIds: assignTaskType) => assignTask({ projectId, taskId, userIds }),
    onSuccess: (data: AssignTaskMutationResponse) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success(data.message);
      socket.emit("assignedTask", {
        userId: data.userId,
        taskName: data.taskName,
        projectName: data.projectName,
        projectId: data.projectId,
        userIds: data.userIds,
      });
    },
    onError: (error) => toast.error(error.message),
  });
};