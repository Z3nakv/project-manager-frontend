import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, type NavigateFunction } from "react-router";
import { createProject, deleteProject, updateProject } from "../../services/ProjectService";
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
  navigate: NavigateFunction
}

export const useUpdateProjectMutation = ({ projectId, navigate} : useEditProjectMutationProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
      mutationFn: updateProject,
      onSuccess: (data) => {
        toast.success(data);
        queryClient.invalidateQueries({queryKey: ['projects']});
        queryClient.invalidateQueries({queryKey: ['editProject', projectId]});
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }); 
    return {mutate, isPending}
}

export type ProjectItemProps = {
  project: ProjectItemType;
  user: User;
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success(data);
      navigate("/dashboard");
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate }
}

