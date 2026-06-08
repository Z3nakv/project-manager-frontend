import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getProjectByID } from "../services/ProjectService";
import EditProjectForm from "../components/projects/EditProjectForm";


const EditProjectView = () => {
  
  const params = useParams();
  const projectID = params.projectID!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["editProject", projectID],
    queryFn: () => getProjectByID(projectID),
    retry: false
  });
  
  //CONVERTIR EL LOADING EN UN SKELETON
  if (isLoading) return <p>Cargando...</p>;
  //MOSTRAR ERROR EN EL LINK A 404
  if (isError) return <Navigate to={'/404'}/>

  if(data) return <EditProjectForm project={data} />;
};

export default EditProjectView;