import {
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { Link, Navigate, useNavigate } from "react-router";
import AddMemberModal from "../components/team/AddMemberModal";
import ProjectTeamSkeleton from "../components/ui/ProjectTeamSkeleton";
import TeamMembersList from "../components/team/TeamMembersList";
import { useRemoveUserFromProjectMutation } from "../hooks/mutations/useTeamMembersMutation";
import { useGetProjectTeam } from "../hooks/queries/useTeamMembersQueries";
import useProjectId from "../hooks/useProjectId";

const ProjectTeamView = () => {
  const navigate = useNavigate();
  const projectId = useProjectId();
  const { data, isLoading, isError } = useGetProjectTeam({ projectId })
  const { mutate } = useRemoveUserFromProjectMutation({ projectId })
  const handleRemoveUserFromProject = (memberId: string) => {
    mutate({ projectId, userId: memberId });
  };
  if(isLoading) return <ProjectTeamSkeleton />
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
  <div className="max-w-3xl mx-auto">
    {/* Header */}
    <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
          Proyecto
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Administrar Equipo
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Gestiona los colaboradores de este proyecto
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate(location.pathname + "?addMember=true")}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md shadow-indigo-500/20 cursor-pointer"
        >
          <UserPlusIcon className="h-4 w-4" />
          Agregar
        </button>

        <Link
          to={`/projects/${projectId}`}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1e2330] hover:bg-[#252d3d] border border-[#2d3348] text-slate-300 hover:text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md"
        >
          Volver
        </Link>
      </div>
    </div>

    {/* Team list */}
    <div className="bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 px-4 sm:px-6 py-4 border-b border-[#2d3348]">
        <UserGroupIcon className="h-4 w-4 text-slate-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Miembros actuales
        </span>
        <span className="ml-auto text-xs text-slate-600">
          {data.length} {data.length === 1 ? "miembro" : "miembros"}
        </span>
      </div>

      <TeamMembersList teamMembers={data} handleRemoveUserFromProject={handleRemoveUserFromProject}/>

    </div>

    <AddMemberModal />
    
  </div>
)
};

export default ProjectTeamView;
