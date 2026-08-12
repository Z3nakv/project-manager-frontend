import { useGetProjectById } from "../../hooks/queries/useProjectQueries";

type ProjectCrumbProps = {
  projectId: string;
};

export function ProjectCrumb({ projectId }: ProjectCrumbProps) {
  const { data: project } = useGetProjectById(projectId);
  return <>{project?.projectName ?? "Proyecto"}</>;
}