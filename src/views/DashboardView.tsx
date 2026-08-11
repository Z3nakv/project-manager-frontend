import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/ProjectService";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";
import useSearch from "../hooks/useSearch";
import PlusIcon from "../components/PlusIcon";
import { useCallback } from "react";
import type { ProjectItemType } from "../types/project";
import ButtonLink from "../components/ui/ButtonLink";
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
    <div className="min-h-screen bg-[#151921] px-8 font-mono">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-between mb-10 mt-5">
        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
            Workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-100">Mis Proyectos</h1>
          <p className="text-sm text-slate-400 mt-1">
            Maneja y administra tus proyectos
          </p>
        </div>

        <ButtonLink icon={PlusIcon} to={'/dashboard/create-project'} classname="bg-indigo-600 hover:bg-indigo-500 text-white mt-4">
          Nuevo Proyecto
        </ButtonLink>
      </div>

      {/* ── Section label ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 ml-6">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Proyectos activos
        </h2>
        <span className="text-xs text-slate-600">
          {projects?.length ?? 0} proyecto{projects?.length !== 1 ? "s" : ""}
        </span>
      </div>

       <ProjectList projects={filteredItems} user={user} />
    </div>
  );
};

export default DashboardView;
