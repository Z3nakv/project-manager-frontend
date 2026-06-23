import { Link, useNavigate } from "react-router";
import type { ProjectItemType, User } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../services/ProjectService";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { isManager } from "../utils/policies";
import { socket } from "../lib/socket";

export type ProjectItemProps = {
  project: ProjectItemType;
  user: User;
};

const ProjectItem = ({ project, user }: ProjectItemProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      socket.emit("project_deleted", {
            message: `${user?.name} ha eliminado el proyecto ${project.projectName}`,
            projectID: project._id,
            team: project.team.map(memberID => memberID._id)
        })
        queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success(data);
      navigate("/dashboard");
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <li className="bg-[#1e2330] rounded-xl p-4 border border-[#2d3348] shadow-md hover:-translate-y-1 transition-transform duration-150 cursor-pointer flex flex-col gap-3">
      {/* Header: título + menú */}
      <div className="flex justify-between items-start gap-2">
        <Link
          to={`/projects/${project._id}`}
          className="text-base font-semibold text-slate-200 leading-snug flex-1 hover:text-indigo-400 transition-colors duration-150"
        >
          {project.projectName}
        </Link>

        <Menu as="div" className="relative flex-none">
          <MenuButton className="p-1 rounded-md text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150">
            <EllipsisVerticalIcon className="cursor-pointer h-6 w-6" aria-hidden="true" />
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
            <MenuItems className="absolute right-0 top-8 z-10 min-w-44 rounded-xl overflow-hidden border border-[#2d3348] bg-[#252d3d] shadow-[0_8px_24px_rgba(0,0,0,0.4)] focus:outline-none">
              <MenuItem>
                <Link
                  to={`/projects/${project._id}`}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 transition-colors duration-100 data-focus:bg-[#2d3a4f]"
                >
                  <EyeIcon className="h-4 w-4 text-slate-400" />
                  Ver proyecto
                </Link>
              </MenuItem>

              <div className="border-t border-[#2d3348]" />

              {isManager(project.manager._id, user._id) ? (
                <>
                  <MenuItem>
                    <Link
                      to={`/projects/${project._id}/edit`}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 transition-colors duration-100 data-focus:bg-[#2d3a4f]"
                    >
                      <PencilSquareIcon className="h-4 w-4 text-slate-400" />
                      Editar proyecto
                    </Link>
                  </MenuItem>

                  <div className="border-t border-[#2d3348]" />

                  <MenuItem>
                    <button
                      onClick={() => mutate(project._id)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 transition-colors duration-100 data-focus:bg-red-500/10"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Eliminar proyecto
                    </button>
                  </MenuItem>
                </>
              ) : null}
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      {/* Cliente */}
      <p className="text-xs font-medium text-indigo-400">
        {project.clientName}
      </p>

      {/* Descripción */}
      <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2">
        {project.description}
      </p>

      {/* Badge */}
      <div>
        {isManager(project.manager._id, user._id) ? (
          <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
            Manager
          </span>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            Colaborador
          </span>
        )}
      </div>
    </li>
  );
};

export default ProjectItem;
