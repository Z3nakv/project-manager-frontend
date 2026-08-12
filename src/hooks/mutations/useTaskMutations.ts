import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  updateStatus,
  updateTask,
} from "../../services/taskServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import type { UseFormReset } from "react-hook-form";
import type { Task, TaskFormType } from "../../types/task";
import type {
  ProjectItemSchemaDetailsType,
  ProjectItemType,
} from "../../types/project";

type useCreateTaskMutationProps = {
  reset?: UseFormReset<TaskFormType>;
  projectId: ProjectItemType["_id"];
  onSuccess?: () => void;
};

type TaskMutationSuccessData = {
  message: string;
};

export const useCreateTaskMutation = ({
  reset,
  projectId,
  onSuccess: onSuccessCallback
}: useCreateTaskMutationProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: (data: TaskMutationSuccessData) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      if (reset) reset();
      navigate(location.pathname, { replace: true });
      onSuccessCallback?.();
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate, isPending };
};

type useUpdateTaskMutationProps = {
  taskId: Task["_id"];
  projectId: ProjectItemType["_id"];
};

export const useUpdateTaskMutation = ({
  taskId,
  projectId,
}: useUpdateTaskMutationProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate };
};

type useUpdateTaskStatusMutationProps = {
  projectId: ProjectItemType["_id"];
};
export const useUpdateTaskStatusMutation = ({
  projectId,
}: useUpdateTaskStatusMutationProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
  return { mutate };
};

type useDeleteTaskMutationProps = {
  projectId: ProjectItemSchemaDetailsType["_id"];
};

export const useDeleteTaskMutation = ({
  projectId,
}: useDeleteTaskMutationProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate };
};
