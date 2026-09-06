import { useGetProjectHeaderById } from "../../hooks/queries/useProjectQueries";

type ProjectCrumbProps = {
  projectId: string;
};

export function ProjectCrumb({ projectId }: ProjectCrumbProps) {
  const { data: project } = useGetProjectHeaderById(projectId);
  return <>{project?.projectName ?? "Proyecto"}</>;
}