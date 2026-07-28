import { useQuery } from "@tanstack/react-query";
import { getEditProjectById, getProjectById } from "../../services/ProjectService";

export const useGetEditProjectByIdQuery = (projectId : string) => {
  return useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getEditProjectById({projectId}),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
}

export const useGetProjectById = (projectId: string) => {
  return useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProjectById({ projectId }),
      retry: false
    });
}