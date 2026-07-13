import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ProjectItemSchemaDetailsType,
  TaskProjectType,
  TaskStatus,
} from "../../types";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useParams } from "react-router";
import { updateStatus } from "../../services/taskServices";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { socket } from "../../lib/socket";
import { useIsMobile } from "../../hooks/useIsMobile";
import HorizontalScroller from "../ui/HorizontalScroller";
import { initialStatusGroups, statusConfig } from "./taskList.config";


type TaskListProps = {
  tasks: TaskProjectType[];
  canEdit: boolean;
  team: string[];
};

const TaskList = ({ tasks, canEdit, team }: TaskListProps) => {
  const { data: user } = useAuth();
  const params = useParams();
  const projectID = params.projectID!;
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  
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

    if(isMobile) return;

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
      socket.emit("task_status_update", {
        message: `${user?.name} ha actualizado la tarea "${task?.name}"`,
        taskID,
        status,
        projectID,
        team: team.map((member) => member),
        triggeredBy: user?._id,
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

      <HorizontalScroller>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className="flex gap-4 pb-4" style={{ minWidth: "max-content" }}>
            {Object.entries(groupedTasks).map(([status, tasks]) => {
              const config = statusConfig[status];

              return (
                <div
                  key={status}
                  className="w-[85vw] sm:w-72 2xl:w-auto 2xl:flex-1 flex flex-col shrink-0"
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
                      <TaskCard key={task._id} task={task} canEdit={canEdit} isMobile={isMobile} />
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
          </div>
        </DragDropProvider>
      </HorizontalScroller>
    </div>
  );
};

export default TaskList;
