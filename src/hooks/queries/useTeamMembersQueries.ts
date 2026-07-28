import { useQuery } from "@tanstack/react-query";
import { getProjectTeam } from "../../services/teamService";

type useGetProjectTeamProps = {
    projectId: string
}

export const useGetProjectTeam = ({ projectId } : useGetProjectTeamProps) => {
    return useQuery({
        queryKey: ["projectTeam", projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false,
      });
}