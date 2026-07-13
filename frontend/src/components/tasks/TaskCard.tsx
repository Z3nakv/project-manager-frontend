import { useNavigate, useParams } from "react-router";
import type { TaskProjectType } from "../../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTask } from "../../services/taskServices";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ChatBubbleLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { useDraggable } from "@dnd-kit/react";
import { toast } from "react-toastify";
import { formatDate } from "../../utils";
import { socket } from "../../lib/socket";

type TaskCardProps = {
  task: TaskProjectType;
  canEdit: boolean;
  isMobile: boolean;
};

const getDeadlineStatus = (deadline?: string) => {
  if (!deadline) return null;
  const today = new Date();
  const due = new Date(deadline);
  const diffDays = Math.ceil(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0)
    return {
      label: "Vencida",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/25",
    };
  if (diffDays <= 2)
    return {
      label: "Vence pronto",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/25",
    };
  return {
    label: "A tiempo",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/25",
  };
};

const TaskCard = ({ task, canEdit, isMobile }: TaskCardProps) => {
  
  const { ref } = useDraggable({ id: task._id, disabled: isMobile });

  const navigate = useNavigate();
  const params = useParams();
  const projectID = params.projectID!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["project", projectID] });

      socket.emit("taskDeleted", { message: `Tarea eliminada en proyecto ${data.project.projectName}`, project: data.project });
    },
    onError: (error) => toast.error(error.message),
  });

  const deadlineStatus = getDeadlineStatus(task.deadline!);

  return (
    <li
      ref={ref}
      className="bg-[#1e2330] rounded-xl p-4 border border-[#2d3348] cursor-grab active:cursor-grabbing shadow-md hover:-translate-y-1 transition-transform duration-150"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-base font-semibold text-slate-200 leading-snug flex-1">
          {task.name}
        </span>

        <Menu as="div" className="relative flex-none">
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
            <MenuItems className="absolute right-0 top-8 z-10 min-w-40 rounded-xl overflow-hidden border border-[#2d3348] bg-[#252d3d] shadow-[0_8px_24px_rgba(0,0,0,0.4)] focus:outline-none">
              <MenuItem>
                <button
                  onClick={() =>
                    navigate(location.pathname + `?viewTask=${task._id}`)
                  }
                  className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 transition-colors duration-100 data-focus:bg-[#2d3a4f]"
                >
                  <EyeIcon className="h-4 w-4 text-slate-400" />
                  Ver tarea
                </button>
              </MenuItem>

              <div className="border-t border-[#2d3348]" />

              {canEdit ? (
                <>
                  <MenuItem>
                    <button
                      onClick={() =>
                        navigate(location.pathname + `?editTask=${task._id}`)
                      }
                      className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 transition-colors duration-100 data-focus:bg-[#2d3a4f]"
                    >
                      <PencilSquareIcon className="h-4 w-4 text-slate-400" />
                      Editar tarea
                    </button>
                  </MenuItem>

                  <div className="border-t border-[#2d3348]" />

                  <MenuItem>
                    <button
                      onClick={() => mutate({ projectID, taskID: task._id })}
                      className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 transition-colors duration-100 data-focus:bg-red-500/10"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Eliminar tarea
                    </button>
                  </MenuItem>
                </>
              ) : null}
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      {/* Descripción */}
      <p className="text-[13px] text-slate-400 leading-relaxed mb-3">
        {task.description}
      </p>

      {/* Fechas */}
      <div className="flex flex-col gap-1.5 mb-3">
        {/* Fecha de creación */}
        {task.createdAt && (
          <div className="flex items-center gap-1.5 text-slate-600">
            <CalendarDaysIcon className="h-3 w-3 shrink-0" />
            <span className="text-[10px]">
              Creada: {formatDate(task.createdAt)}
            </span>
          </div>
        )}

        {/* Fecha límite */}
        {task.deadline && deadlineStatus ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <ClockIcon className="h-3 w-3 shrink-0" />
              <span className="text-[10px]">
                Límite: {formatDate(task.deadline)}
              </span>
            </div>
            <span
              className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${deadlineStatus.bg} ${deadlineStatus.color}`}
            >
              {deadlineStatus.label}
            </span>
          </div>
        )
        : <div className="flex items-center gap-1.5 text-slate-500">
            <ClockIcon className="h-3 w-3 shrink-0" />
            <p className="text-[10px]">Fecha limite no establecida aun</p>
          </div>
      }
      </div>

      {/* Notas */}
      {task.notes?.length > 0 && (
        <>
          <div className="border-t border-[#2d3348] mt-2 mb-2" />

          <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
            <ChatBubbleLeftIcon className="h-3 w-3" />
            <span className="text-[10px] uppercase tracking-wider">
              {task.notes.length} {task.notes.length === 1 ? "nota" : "notas"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {task.notes.filter(Boolean).map((note) => (
              <div key={note._id} className="flex items-start gap-2 py-1">
                <div className="w-1 h-1 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {note?.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </li>
  );
};

export default TaskCard;
