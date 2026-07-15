import { useQuery } from "@tanstack/react-query";
import { getProjectTeam } from "../../services/teamService";

type useGetProjectTeamProps = {
    projectID: string
}

export const useGetProjectTeam = ({ projectID } : useGetProjectTeamProps) => {
    return useQuery({
        queryKey: ["projectTeam", projectID],
        queryFn: () => getProjectTeam(projectID),
        retry: false,
      });
}