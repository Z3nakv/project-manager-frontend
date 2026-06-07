import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ProjectItemSchemaDetailsType,
  TaskProjectType,
  TaskStatus
} from "../../types";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useParams } from "react-router";
import { updateStatus } from "../../services/taskServices";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { socket } from "../../lib/socket";


type TaskListProps = {
  tasks: TaskProjectType[];
  canEdit: boolean;
  team: string[]
};

type GroupedTasks = {
  [key: string]: TaskProjectType[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  inProgress: [],
  onHold: [],
  underReview: [],
  completed: [],
};

const statusConfig: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  pending: { label: "Pendiente", color: "#6366f1", icon: "◎" },
  inProgress: { label: "En progreso", color: "#f59e0b", icon: "⟳" },
  onHold: { label: "En pausa", color: "#ef4444", icon: "⚠" },
  underReview: { label: "En revisión", color: "#0ea5e9", icon: "⊙" },
  completed: { label: "Completado", color: "#10b981", icon: "✓" },
};

const TaskList = ({ tasks, canEdit, team }: TaskListProps) => {
  
  const { data: user } = useAuth();
  const params = useParams();
  const projectID = params.projectID!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });


  const handleDragEnd = (e: DragEndEvent) => {
    const status = e.operation.target?.id as TaskStatus;
    const taskID = e.operation.source?.id.toString();

    if (status && taskID) {
      mutate({ projectID, taskID, status });
      queryClient.setQueryData(
        ["project", projectID],
        (prevData: ProjectItemSchemaDetailsType) => {
          const updatedTasks = prevData.tasks.map((task) => {
            if (task._id === taskID) {
              return {
                ...task,
                status,
              };
            }
            return task;
          });

          return {
            ...prevData,
            tasks: updatedTasks,
          };
        },
      );

      const task = tasks.find((task) => task._id === taskID);
      socket.emit("send_message", {
        message: `${user?.name} ha actualizado la tarea "${task?.name}"`,
        taskID,
        status,
        projectID,
        team: team.map(member => member),
        triggeredBy: user?._id
      });
    }
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <div className="mt-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
        Tareas
      </h2>

      <div
        className="flex gap-4 pb-4
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#2d3348]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb:hover]:bg-[#3d4663]"
      >
        <DragDropProvider onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => {
            const config = statusConfig[status];

            return (
              <div
                key={status}
                className="min-w-72 2xl:min-w-0 2xl:flex-1 flex flex-col"
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span
                    style={{ color: config.color }}
                    className="text-base leading-none"
                  >
                    {config.icon}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-300">
                    {config.label}
                    <span className="ml-2 text-slate-500 font-normal">
                      ({tasks.length})
                    </span>
                  </h3>
                </div>

                {/* Color bar */}
                <div
                  className="h-0.5 rounded-full mb-4"
                  style={{ background: config.color }}
                />

                {/* Drop zone */}
                <DropTask status={status} />

                {/* Cards */}
                <ul className="flex flex-col gap-3 mb-3 mt-3">
                  {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))}

                  {tasks.length === 0 && (
                    <li className="text-center text-slate-600 text-xs py-6 border border-dashed border-[#2d3348] rounded-xl">
                      Sin tareas
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </DragDropProvider>
      </div>
    </div>
  );
};

export default TaskList;
