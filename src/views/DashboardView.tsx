import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/ProjectService";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";
import useSearch from "../hooks/useSearch";
import { useCallback } from "react";
import type { ProjectItemType } from "../types/project";
import ProjectList from "../components/dashboard/ProjectList";

const DashboardView = () => {
  const { data: user, isLoading: authLoading } = useAuth();
  const {data: projects = [], isError, isLoading} = 
  useQuery({queryKey: ["projects"], queryFn: getAllProjects, staleTime: 1000 * 60 * 5});
  const getProjectName = useCallback((data: ProjectItemType) => data.projectName,[]);
  const { filteredItems } = useSearch(projects, getProjectName);
  
  if (isLoading || authLoading) return <DashboardSkeleton />;
  if (isError) return <p>Hubo un error</p>;
  if (!filteredItems || !user) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen px-8 font-mono">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-between mb-10 mt-5">
        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
            Workspace
          </p>
          <h1 className="text-3xl font-bold text-text-primary">Mis Proyectos</h1>
          <p className="text-sm text-text-muted mt-1">
            Maneja y administra tus proyectos
          </p>
        </div>
      </div>


      {/* ── Section label ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 ml-6">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-widest">
          Proyectos activos
        </h2>
        <span className="text-xs text-text-muted">
          {projects?.length ?? 0} proyecto{projects?.length !== 1 ? "s" : ""}
        </span>
      </div>

       <ProjectList projects={filteredItems} user={user} />
    </div>
  );
};

export default DashboardView;
