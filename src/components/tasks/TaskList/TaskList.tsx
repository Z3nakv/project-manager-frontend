import { useQueryClient } from "@tanstack/react-query";
import DropTask from "../DropTask";
import TaskCard from "../TaskCard/TaskCard";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import HorizontalScroller from "../../ui/HorizontalScroller";
import { useUpdateTaskStatusMutation } from "../../../hooks/mutations/useTaskMutations";
import { statusConfig, taskReducer } from "./taskList.config";
import useSearch from "../../../hooks/useSearch";
import type { TaskProjectType, TaskStatus } from "../../../types/task";
import type { ProjectItemSchemaDetailsType } from "../../../types/project";
import { useCallback } from "react";
import useProjectId from "../../../hooks/useProjectId";

type TaskListProps = {
  tasks: TaskProjectType[];
  canEdit: boolean;
};

const TaskList = ({ tasks, canEdit }: TaskListProps) => {
  const projectId = useProjectId();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const getTaskName = useCallback((task: TaskProjectType) => task.name, []);
  const { filteredItems } = useSearch(tasks, getTaskName);

  const { mutate } = useUpdateTaskStatusMutation({ projectId });

  const handleDragEnd = (e: DragEndEvent) => {
    if (isMobile) return;

    const status = e.operation.target?.id as TaskStatus;
    const taskId = e.operation.source?.id.toString();

    if (status && taskId) {
      mutate({ projectId, taskId, status });
      queryClient.setQueryData(
        ["project", projectId],
        (prevData: ProjectItemSchemaDetailsType) => {
          const updatedTasks = prevData.tasks.map((task) => {
            if (task._id === taskId) {
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
    }
  };

  const groupedTasks = taskReducer(filteredItems);

  return (
  <div>
    <HorizontalScroller className="snap-x snap-mandatory">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex gap-4 pb-4 justify-center-safe" data-scroll-track>
          {/* Spacer izquierdo */}
          <div className="w-[7.5cqw] sm:w-0 shrink-0" aria-hidden="true" data-scroll-spacer="start"/>

          {Object.entries(groupedTasks).map(([status, tasks]) => {
            const config = statusConfig[status];

            return (
              <div
                key={status}
                data-scroll-column
                className="w-[85cqw] sm:w-72 2xl:w-auto 2xl:flex-1 flex flex-col shrink-0 snap-center"
              >
                <div className="flex items-center gap-2 font-mono text-sm">
                  <div className="flex gap-2 items-center bg-[#161925] border border-indigo-500/30 border-b-0 rounded-t-lg px-4 pt-1.5 pb-1">
                    <config.icon style={{ color: config.color }} className={"text-lg"} />
                    <h3 className="font-semibold text-slate-300">
                      {config.label}
                    </h3>
                  </div>

                  <span className="text-slate-500">
                    {tasks.length} tarea{tasks.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <DropTask status={status} />

                <ul className="bg-[#161925] border border-indigo-500/30 rounded-b-lg rounded-tr-lg p-3 flex flex-col gap-2.5 min-h-30">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      canEdit={canEdit}
                      isMobile={isMobile}
                    />
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

          {/* Spacer derecho */}
          <div className="w-[7.5cqw] sm:w-0 shrink-0" aria-hidden="true" data-scroll-spacer="end"/>
        </div>
      </DragDropProvider>
    </HorizontalScroller>
  </div>
);
};

export default TaskList;
