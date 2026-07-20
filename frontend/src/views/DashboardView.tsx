import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/ProjectService";
import { Link } from "react-router";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";
import ProjectCard from "../components/projects/ProjectCard";
import useSearch from "../hooks/useSearch";
import PlusIcon from "../components/PlusIcon";
import { useCallback } from "react";
import type { ProjectItemType } from "../types/project";

const DashboardView = () => {

  const { data: user, isLoading: authLoading } = useAuth();

  const { data = [], isError, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    staleTime: 1000 * 60 * 5 // 5 minutos
  });

  const getProjectName = useCallback((data : ProjectItemType) => data.projectName, []);
  const { filteredItems } = useSearch(data, getProjectName);
  
  if (isLoading || authLoading) return <DashboardSkeleton />;
  if (isError) return <p>Hubo un error</p>;
  
  if (!filteredItems || !user) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-[#151921] px-8 ">
      
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

        <Link
          to="/projects/create-project"
          className="flex items-center gap-2 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition-colors duration-150"
        >
          <PlusIcon />
          Nuevo Proyecto
        </Link>
      </div>

      {/* ── Section label ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Proyectos activos
        </h2>
        <span className="text-xs text-slate-600">
          {data?.length ?? 0} proyecto{data?.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grid o empty state ─────────────────────────────── */}
      {data?.length ? (
        <ul 
        /* className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" */
        className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
        >
          {filteredItems.map((project) => (
            <ProjectCard key={project._id} project={project} user={user} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-36 gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#1e2330] border border-[#2d3348] flex items-center justify-center shadow-md">
            <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-slate-300 font-semibold">No hay proyectos aún</p>
            <p className="text-sm text-slate-500 mt-1">
              Crea tu primer proyecto para comenzar
            </p>
          </div>
          <Link
            to="/projects/create-project"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 shadow-md"
          >
            <PlusIcon />
            Crear Proyecto
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardView;