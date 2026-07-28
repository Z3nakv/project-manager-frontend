import { Navigate } from "react-router";
import EditProjectForm from "../components/projects/EditProjectForm";
import EditProjectSkeleton from "../components/ui/EditProjectSkeleton";
import useProjectId from "../hooks/useProjectId";
import { useGetEditProjectByIdQuery } from "../hooks/queries/useProjectQueries";

const EditProjectView = () => {
  const projectId = useProjectId();
  const { data: project, isError, isLoading } = useGetEditProjectByIdQuery(projectId);
  if (isLoading) return <EditProjectSkeleton />;
  if (isError) return <Navigate to={'/404'}/>
  if(project) return <EditProjectForm project={project} />;
};

export default EditProjectView;