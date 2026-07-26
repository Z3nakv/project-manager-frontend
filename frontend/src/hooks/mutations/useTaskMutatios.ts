import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateStatus, updateTask } from "../../services/taskServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { socket } from "../../lib/socket";
import type { UseFormReset } from "react-hook-form";
import { useAuth } from "../useAuth";
import type { Task, TaskFormType } from "../../types/task";
import type { ProjectItemSchemaDetailsType, ProjectItemType } from "../../types/project";
import type { TeamMember } from "../../types/team";

type useCreateTaskMutationProps = {
  reset?: UseFormReset<TaskFormType>;
  projectId: ProjectItemType["_id"];
};

export const useCreateTaskMutation = ({ reset, projectId }: useCreateTaskMutationProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      if (reset) reset();
      navigate(location.pathname, { replace: true });

      socket.emit("task_created", { message: `Tarea creada en proyecto ${data.project.projectName}`, project: data.project });
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate, isPending };
};

type useUpdateTaskMutationProps = {
  taskId: Task["_id"];
  projectId: ProjectItemType["_id"];
};

export const useUpdateTaskMutation = ({ taskId, projectId }: useUpdateTaskMutationProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      toast.success(data.message);
      socket.emit("taskUpdated", {
        message: `Tarea "${data.task?.name ?? "tarea"}" actualizada`,
        project: data.project,
      });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => console.log(error.message),
  });
  return { mutate };
};

type useUpdateTaskStatusMutationProps = {
  projectId: ProjectItemType["_id"];
  team: TeamMember["_id"][];
};

export const useUpdateTaskStatusMutation = ({ projectId, team }: useUpdateTaskStatusMutationProps) => {
  const queryClient = useQueryClient();
  const { data: user } = useAuth();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });

      socket.emit("task_status_update", {
        message: `${user?.name} ha actualizado la tarea "${data.task?.name ?? "tarea"}"`,
        projectId,
        team: team.map((member) => member),
        triggeredBy: user?._id,
      });
    },
  });
  return { mutate };
};

type useDeleteTaskMutationProps = {
  projectId: ProjectItemSchemaDetailsType["_id"];
};

export const useDeleteTaskMutation = ({ projectId }: useDeleteTaskMutationProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });

      socket.emit("taskDeleted", { message: `Tarea eliminada en proyecto ${data.project.projectName}`, project: data.project });
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate };
};