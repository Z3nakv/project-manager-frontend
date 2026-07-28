import { Link } from "react-router";
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
import { isManager } from "../../utils/policies";
import { useDeleteProjectMutation } from "../../hooks/mutations/useProjectMutations";
import AssignTaskMembers from "../tasks/TaskCard/AssignTaskMembers";
import type { ProjectItemType } from "../../types/project";
import type { User } from "../../types/user";
import { statusConfig, taskReducer } from "../tasks/TaskList/taskList.config";
import { formatDate } from "../../utils";
import { useMemo } from "react";
import { getDeadlineStatus } from "../tasks/TaskCard/taskCard.config";

export type ProjectCardProps = {
  project: ProjectItemType;
  user: User;
};

const ProjectCard = ({ project, user }: ProjectCardProps) => {

  const { mutate } = useDeleteProjectMutation({ project, user });

  const userIsManager = isManager(project.manager._id, user._id);
  const team = [...project.team, project.manager];
  
 const deadline = useMemo(() => {
  const tasksWithDeadline = project.tasks.filter(
    (task): task is typeof task & { deadline: string } =>
      task.deadline !== null && task.deadline !== undefined
  );

  if (tasksWithDeadline.length === 0) return "";

  return tasksWithDeadline.reduce((nearest, task) =>
    new Date(task.deadline) < new Date(nearest.deadline) ? task : nearest
  ).deadline;
}, [project.tasks]);

  const upcomingDeadline = getDeadlineStatus(deadline)
  
  const tasksByStatus = useMemo(
      () => taskReducer(project.tasks),
      [project.tasks]
    );

  return (
    <li className="bg-[#1e2330] rounded-xl p-4 border border-[#2d3348] shadow-md hover:-translate-y-1 transition-transform duration-150">
      <div className="h-full flex justify-center gap-4">
        {/* Info principal */}
        <div className="h-full flex flex-col justify-between min-w-0 flex-1">
          <Link
            to={`/projects/${project._id}`}
            className="text-base font-semibold text-slate-200 leading-snug hover:text-indigo-400 transition-colors duration-150 whitespace-nowrap"
          >
            {project.projectName}
          </Link>

          <p className="text-xs font-medium text-indigo-400">
            {project.clientName}
          </p>

          <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <span
            className={`w-fit text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg border ${
              userIsManager
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/25"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
            }`}
          >
            {userIsManager ? "Manager" : "Colaborador"}
          </span>
        </div>

        {/* Acciones */}
        <div className="flex flex-col justify-between items-end gap-3 shrink-0">
          <Menu as="div" className="relative">
            <MenuButton
              aria-label="Opciones del proyecto"
              className="cursor-pointer p-1 rounded-md text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150"
            >
              <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
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

                {userIsManager && (
                  <>
                    <div className="border-t border-[#2d3348]" />
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
                        className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 transition-colors duration-100 data-focus:bg-red-500/10"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Eliminar proyecto
                      </button>
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            </Transition>
          </Menu>

          <ul className="flex gap-1.5">
          {Object.entries(tasksByStatus).map(([status, tasks]) => {
            const config = statusConfig[status];
            return (
              <li
                key={status}
                className="text-sm flex  gap-1"
                title={status}
              >
                <span
                  style={{ color: config.color }}
                  className="w-full text-lg leading-none"
                >
                  {config.icon}
                </span>
                <span className="font-bold text-white">
                  {tasks.length}
                </span>
              </li>
            );
          })}
        </ul>

          <span className="text-xs text-slate-500 text-right">
            <p className={`${upcomingDeadline?.color} ${upcomingDeadline?.bg} p-1 rounded-md`}>Upcoming Task Deadline</p>
            {formatDate(deadline)}
          </span>

          {team.length > 0 && (
            <AssignTaskMembers AssignedMembers={team} />
          )}
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
