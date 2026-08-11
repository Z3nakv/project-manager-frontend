import { Link } from "react-router";
import { isManager } from "../../utils/policies";
import AssignTaskMembers from "../tasks/TaskCard/AssignTaskMembers";
import type { ProjectItemType } from "../../types/project";
import type { User } from "../../types/user";
import { statusConfig, taskReducer } from "../tasks/TaskList/taskList.config";
import { formatDate } from "../../utils";
import { useMemo } from "react";
import { getDeadlineStatus } from "../tasks/TaskCard/taskCard.config";
import { FaRegFolder } from "react-icons/fa";
import ProjectMenuItems from "./ProjectMenuItems";

export type ProjectCardProps = {
  project: ProjectItemType;
  user: User;
};

const ProjectCard = ({ project, user }: ProjectCardProps) => {
  const userIsManager = isManager(project.manager._id, user._id);
  const team = [...project.team, project.manager];

  const deadline = useMemo(() => {
    const tasksWithDeadline = project.tasks.filter(
      (task): task is typeof task & { deadline: string } =>
        task.deadline !== null && task.deadline !== undefined,
    );

    if (tasksWithDeadline.length === 0) return "";

    return tasksWithDeadline.reduce((nearest, task) =>
      new Date(task.deadline) < new Date(nearest.deadline) ? task : nearest,
    ).deadline;
  }, [project.tasks]);

  const upcomingDeadline = getDeadlineStatus(deadline);

  const tasksByStatus = useMemo(
    () => taskReducer(project.tasks),
    [project.tasks],
  );

  return (
    <div className="relative pt-4">
      {/* Pestaña de la carpeta */}
      <div className="absolute top-1 left-4 w-16 h-4 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md z-100" />

      <li className="font-mono relative bg-[#0f1117] border border-zinc-800 rounded-tl-sm rounded-tr-2xl rounded-b-2xl p-3.5 hover:border-indigo-500/40 cursor-pointer group shadow-md hover:-translate-y-1 transition-transform duration-150 list-none">
        {/* Header: ícono + menú */}
        <div className="flex items-center justify-between mb-2.5">
          <FaRegFolder
            className={`h-5 w-5 ${userIsManager ? "text-indigo-400" : "text-emerald-400"}`}
          />

          <ProjectMenuItems
            projectId={project._id}
            userIsManager={userIsManager}
          />
        </div>

        {/* Título y cliente */}
        <Link
          to={`/projects/${project._id}`}
          className="capitalize text-[15px] font-semibold tracking-tight text-slate-200 leading-snug hover:text-indigo-400 transition-colors duration-150 block truncate"
        >
          {project.projectName}
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-wide text-indigo-400 mt-0.5 mb-2">
          {project.clientName}
        </p>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>

        <div className="flex justify-between">
          <span
            className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md border mb-3 ${
              userIsManager
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/25"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
            }`}
          >
            {userIsManager ? "Manager" : "Colaborador"}
          </span>

          {upcomingDeadline && (
            <p className="text-[11px] text-slate-500 mt-2.5">
              <span
                className={`${upcomingDeadline.color} ${upcomingDeadline.bg} px-1.5 py-0.5 rounded-md`}
              >
                Próxima entrega
              </span>{" "}
              {formatDate(deadline)}
            </p>
          )}
        </div>

        <div className="border-t border-zinc-800 pt-2.5 flex items-center justify-between">
          <ul className="flex gap-2">
            {Object.entries(tasksByStatus).map(([status, tasks]) => {
              const config = statusConfig[status];
              return (
                <li
                  key={status}
                  className="flex items-center gap-1 text-xs"
                  title={status}
                >
                  <span
                    style={{ color: config.color }}
                    className="text-sm leading-none"
                  >
                    <config.icon />
                  </span>
                  <span className="font-bold text-white">{tasks.length}</span>
                </li>
              );
            })}
          </ul>

          {team.length > 0 && <AssignTaskMembers AssignedMembers={team} />}
        </div>
      </li>
    </div>
  );
};

export default ProjectCard;
