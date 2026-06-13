import { Link, Navigate, useNavigate, useParams } from "react-router";
import TaskList from "../components/tasks/TaskList";
import ViewTaskModal from "../components/tasks/ViewTaskModal";
import EditTaskData from "../components/tasks/EditTaskData";
import AddTaskModal from "../components/tasks/AddTaskModal";
import { PlusIcon, UsersIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { getProjectByID } from "../services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import RemovedFromProjectModal from "../components/RemoveFromProjectModal";
import { useForbidden } from "../hooks/useForbidden";
import ProjectDetailsSkeleton from "../components/ui/ProjectDetailsSkeleton";

const ProjectDetailsView = () => {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const projectID = params.projectID!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["project", projectID],
    queryFn: () => getProjectByID(projectID),
    retry: false,
  });

  const canEdit = useMemo(
    () => data?.manager._id.toString() === user?._id.toString(),
    [data, user],
  );

  const { isForbidden } = useForbidden();

  if (isLoading || authLoading) return <ProjectDetailsSkeleton />;
  if (isError) return <Navigate to={"/404"} />;
  
  if (data)
    return (
      <div className="min-h-screen bg-[#151921]">
        {/* ── Back link ──────────────────────────────────────── */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#1e2330] hover:bg-[#252d3d] border border-[#2d3348] text-slate-300 hover:text-slate-100 text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-150 shadow-md mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver
        </Link>

        {/* ── Title block ────────────────────────────────────── */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
            Proyecto
          </p>
          <h1 className="text-3xl font-bold text-slate-100 wrap-break-word">
            {data?.projectName}
          </h1>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            {data?.description}
          </p>
        </div>

        {/* ── Action buttons ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => navigate(location.pathname + `?newTask=true`)}
            className="cursor-pointer flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md"
          >
            <PlusIcon className="h-4 w-4" />
            Agregar Tarea
          </button>

          <Link
            to="team"
            className="flex items-center gap-2 bg-[#1e2330] hover:bg-[#252d3d] border border-[#2d3348] text-slate-300 hover:text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md"
          >
            <UsersIcon className="h-4 w-4" />
            Colaboradores
          </Link>
        </div>

        {/* ── Divider ────────────────────────────────────────── */}
        <div className="border-t border-[#2d3348] mb-8" />

        {/* ── Task list ──────────────────────────────────────── */}
        <TaskList
          tasks={data?.tasks}
          canEdit={canEdit}
          team={[
            ...new Set([
              ...data.team.map((member) => member._id),
              data.manager._id,
            ]),
          ]}
        />

        {/* ── Modals ─────────────────────────────────────────── */}
        <AddTaskModal />
        <ViewTaskModal />
        <EditTaskData />
        <RemovedFromProjectModal show={isForbidden} />
      </div>
    );
};

export default ProjectDetailsView;
