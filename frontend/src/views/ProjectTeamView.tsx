import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getProjectTeam, removeUserFromProject } from "../services/teamService";
import AddMemberModal from "../components/team/AddMemberModal";
import { socket } from "../lib/socket";

const ProjectTeamView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectID = params.projectID!;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectTeam", projectID],
    queryFn: () => getProjectTeam(projectID),
    retry: false,
  });

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onSuccess: (data) => {
      
      socket.emit("member_removed", {
        message: `${data?.manager} te elimino como colaborador del proyecto`,
        projectID,
        userID: data?.colaborador,
      });
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectID] });
      queryClient.invalidateQueries({ queryKey: ["project", projectID] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleRemoveUserFromProject = (memberID: string) => {
    mutate({ projectID, userID: memberID });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

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
          to={`/projects/${projectID}`}
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

      {data.length ? (
        <ul>
          {data.map((member, index) => (
            <li
              key={member._id}
              className={`flex items-center justify-between px-4 sm:px-6 py-4 ${index !== data.length - 1 ? "border-b border-[#2d3348]" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/25 flex items-center justify-center shrink-0">
                  <span className="text-indigo-400 font-bold text-sm">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{member.email}</p>
                </div>
              </div>

              <Menu as="div" className="relative flex-none ml-2">
                <MenuButton className="p-1 rounded-md text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150">
                  <EllipsisVerticalIcon
                    className="cursor-pointer h-6 w-6"
                    aria-hidden="true"
                  />
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-6 top-8 z-10 min-w-44 rounded-xl overflow-hidden border border-[#2d3348] bg-[#252d3d] shadow-[0_8px_24px_rgba(0,0,0,0.4)] focus:outline-none">
                    <MenuItem>
                      <button
                        type="button"
                        onClick={() => handleRemoveUserFromProject(member._id)}
                        className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 transition-colors duration-100 data-focus:bg-red-500/10"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Eliminar del proyecto
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#252d3d] border border-[#2d3348] flex items-center justify-center">
            <UserGroupIcon className="h-6 w-6 text-slate-600" />
          </div>
          <p className="text-slate-400 text-sm font-medium">
            No hay miembros en este equipo
          </p>
          <p className="text-slate-600 text-xs">
            Agrega colaboradores para comenzar
          </p>
        </div>
      )}
    </div>

    <AddMemberModal />
  </div>
)
};

export default ProjectTeamView;
