import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getProjectById } from "../services/ProjectService";
import EditProjectForm from "../components/projects/EditProjectForm";
import EditProjectSkeleton from "../components/ui/EditProjectSkeleton";


const EditProjectView = () => {
  
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById({projectId}),
    staleTime: 1000 * 60 * 5,
    retry: false
  });
  
  if (isLoading) return <EditProjectSkeleton />;
  if (isError) return <Navigate to={'/404'}/>
  
  if(data) return <EditProjectForm project={data} />;
};

export default EditProjectView;