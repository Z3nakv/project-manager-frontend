import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateStatus, updateTask } from "../../services/taskServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { socket } from "../../lib/socket";
import type { projectItemDetailsType, ProjectItemType, Task, TaskFormType, TeamMember } from "../../types";
import type { UseFormReset } from "react-hook-form";
import { useAuth } from "../useAuth";

type useCreateTaskMutationProps = {
    reset: UseFormReset<TaskFormType>
    projectID: ProjectItemType['_id']
}

export const useCreateTaskMutation = ({ reset, projectID } : useCreateTaskMutationProps) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: createTask,
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["project", projectID] });
          reset();
          navigate(location.pathname, { replace: true })
    
          socket.emit("task_created", { message: `Tarea creada en proyecto ${data.project.projectName}`, project: data.project });
        },
        onError: (error) => toast.error(error.message),
      });
      return { mutate }
}

type useUpdateTaskMutationProps = {
    taskID: Task['_id']
    projectID: ProjectItemType['_id']
}

export const useUpdateTaskMutation = ({ taskID, projectID } : useUpdateTaskMutationProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
          toast.success(data.message);
          socket.emit("taskUpdated", { 
            message: `Tarea "${data.task.name}" actualizada`, 
            project: data.project 
          }); // Emitir evento de actualización
          queryClient.invalidateQueries({ queryKey: ["task", taskID] });
          queryClient.invalidateQueries({ queryKey: ["project", projectID] }); 
          navigate(location.pathname, { replace: true });
        },
        onError: (error) => console.log(error.message),
      });
      return { mutate }
}

type useUpdateTaskStatusMutationProps = {
    projectID : ProjectItemType['_id']
    team: TeamMember['_id'][]
}
export const useUpdateTaskStatusMutation = ( {projectID, team} : useUpdateTaskStatusMutationProps ) => {
    const queryClient = useQueryClient();
    const { data: user } = useAuth();

    const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey: ["project", projectID]})

      socket.emit("task_status_update", {
        message: `${user?.name} ha actualizado la tarea "${data.task?.name}"`,
        projectID,
        team: team.map((member) => member),
        triggeredBy: user?._id,
      });
    },
  });
  return { mutate }
}

type useDeleteTaskMutationProps = {
  projectID: projectItemDetailsType['_id']
}

export const useDeleteTaskMutation = ({ projectID } : useDeleteTaskMutationProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectID] });

      socket.emit("taskDeleted", { message: `Tarea eliminada en proyecto ${data.project.projectName}`, project: data.project });
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate }
}