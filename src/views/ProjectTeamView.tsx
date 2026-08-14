import { UserGroupIcon, UserPlusIcon } from "@heroicons/react/20/solid";
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
  const { data, isLoading, isError } = useGetProjectTeam({ projectId });
  const { mutate } = useRemoveUserFromProjectMutation({ projectId });
  const handleRemoveUserFromProject = (memberId: string) => {
    mutate({ projectId, userId: memberId });
  };
  if (isLoading) return <ProjectTeamSkeleton />;
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
              Proyecto
            </p>
            <h1 className="text-3xl font-bold text-text-primary">
              Administrar Equipo
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Gestiona los colaboradores de este proyecto
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(location.pathname + "?addMember=true")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md shadow-primary/20 cursor-pointer"
            >
              <UserPlusIcon className="h-4 w-4" />
              Agregar
            </button>

            <Link
              to={`/projects/${projectId}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-surface-elevated hover:bg-surface-hover border border-border text-text-secondary hover:text-text-primary text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md"
            >
              Volver
            </Link>
          </div>
        </div>

        
        <div className="relative pt-4 w-full max-w-3xl mx-auto px-4 sm:px-0">
          
          <div className="absolute top-0 left-8 sm:left-5 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5 pt-1.5 pb-1">
            <UserGroupIcon className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-text-muted">
              Miembros actuales
            </span>
          </div>

          <div className="bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-lifted">
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-border-subtle">
              <span className="ml-auto text-xs text-text-muted">
                {data.length} {data.length === 1 ? "miembro" : "miembros"}
              </span>
            </div>

            <TeamMembersList
              teamMembers={data}
              handleRemoveUserFromProject={handleRemoveUserFromProject}
            />
          </div>
        </div>

        <AddMemberModal />
      </div>
    );
};

export default ProjectTeamView;
