import { useQuery } from "@tanstack/react-query";
import { getEditProjectById, getProjectHeaderById, getTaskList } from "../../services/ProjectService";

export const useGetEditProjectByIdQuery = (projectId : string) => {
  return useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getEditProjectById({projectId}),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
}

export const useGetProjectHeaderById = (projectId: string) => {
  return useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProjectHeaderById({ projectId }),
      retry: false
    });
}

export const useGetTaskList = (projectId: string) => {
  return useQuery({
      queryKey: ["projectTasks", projectId],
      queryFn: () => getTaskList({ projectId }),
      retry: false
    });
}