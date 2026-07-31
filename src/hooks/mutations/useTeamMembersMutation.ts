import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addUserToProject, findUserByEmail, removeUserFromProject } from "../../services/teamService"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import type { TeamMember } from "../../types/team";

export const useFindUserByEmailMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: findUserByEmail,
            onSuccess: (data) => {
                queryClient.setQueryData(['user', data?.email], data)
            }
        })
}

type useAddUserToProjectMutationProps = {
    user: TeamMember
    reset: () => void
    projectId: string
}

export const useAddUserToProjectMutation = ({ reset, projectId } : useAddUserToProjectMutationProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: addUserToProject,
        onSuccess: (data) => {
            toast.success(data.message);
            reset()
            navigate(location.pathname, {replace: true});
            queryClient.invalidateQueries({queryKey:['projects']});
            queryClient.invalidateQueries({queryKey:['projectTeam', projectId]});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}

type useRemoveUserFromProjectMutationProps = {
    projectId: string
}

export const useRemoveUserFromProjectMutation = ({ projectId } : useRemoveUserFromProjectMutationProps) => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: removeUserFromProject,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({queryKey:['projects']});
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: (error) => toast.error(error.message),
  });
}