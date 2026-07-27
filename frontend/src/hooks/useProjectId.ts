import { useParams } from "react-router";

const useProjectId = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) {
    throw new Error("projectId no encontrado en la URL");
  }
  return projectId ?? null;
};

export default useProjectId;
