import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { socket } from "../../lib/socket";
import { useNavigate, type NavigateFunction } from "react-router";
import { createProject, deleteProject, updateProject } from "../../services/ProjectService";
import { useRef } from "react";
import type { ProjectItemType } from "../../types/project";
import type { User } from "../../types/user";

export const useCreateProjectMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
          toast.success(data);
          queryClient.invalidateQueries({queryKey: ['projects']});
          navigate("/dashboard");
        },
        onError: (error) => toast.error(error.message),
      });
    return { mutate }
}

type useEditProjectMutationProps = {
  projectId: string
  project: Pick<ProjectItemType, "projectName" | "clientName" | "description" | "team">;
  navigate: NavigateFunction
}

export const useUpdateProjectMutation = ({ projectId, project, navigate} : useEditProjectMutationProps) => {

  const queryClient = useQueryClient();
  const isSubmitting = useRef(false);

  const { mutate, isPending } = useMutation({
      mutationFn: updateProject,
      onSuccess: (data) => {
        isSubmitting.current = false;
        toast.success(data);
  
        queryClient.invalidateQueries({queryKey: ['projects']})
        queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
  
        socket.emit("project_updated", {
          message: `El proyecto "${project.projectName}" ha sido actualizado`,
          team: project.team.map(memberId => memberId._id)
        });
        navigate("/dashboard");
      },
      onError: (error) => {
        isSubmitting.current = false;
        toast.error(error.message)
      },
    }); 
    return {mutate, isPending}
}

export type ProjectItemProps = {
  project: ProjectItemType;
  user: User;
};

export const useDeleteProjectMutation = ({ user, project } : ProjectItemProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      socket.emit("project_deleted", {
            message: `${user?.name} ha eliminado el proyecto ${project.projectName}`,
            projectId: project._id,
            team: project.team.map(memberId => memberId._id)
        })
        queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success(data);
      navigate("/dashboard");
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate }
}

