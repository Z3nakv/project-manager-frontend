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
import { useCallback, useMemo } from "react";
import useProjectId from "../../../hooks/useProjectId";
import { useGetProjectById } from "../../../hooks/queries/useProjectQueries";
import { useAuth } from "../../../hooks/useAuth";

const TaskList = () => {
  const projectId = useProjectId();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const { data: user} = useAuth();
  const { data: project } = useGetProjectById(projectId);
  const { mutate } = useUpdateTaskStatusMutation({ projectId });
  const getTaskName = useCallback((task: TaskProjectType) => task.name, []);
  const { filteredItems } = useSearch(project!.tasks, getTaskName);
  const canEdit = useMemo(() => project?.manager._id.toString() === user?._id.toString(), [project, user]);
  
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
                className="w-[85cqw] sm:w-72 2xl:w-auto 2xl:flex-1 2xl:min-w-72 flex flex-col shrink-0 min-w-0 snap-center"
              >
                <div className="relative mt-2 flex justify-end items-center gap-2 font-mono text-sm">

                  <div className="absolute left-0 flex gap-2 items-center bg-surface-base border border-border-subtle border-b-0 rounded-t-lg px-4 pt-1.5 pb-1">
                    <config.icon style={{ color: config.color }} className={"text-lg"} />
                    <h3 className="font-semibold text-text-secondary">
                      {config.label}
                    </h3>
                  </div>

                  <span className="text-text-muted">
                    {tasks.length} tarea{tasks.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <DropTask status={status} >

                <ul className="bg-surface-base border border-border rounded-b-lg rounded-tr-lg p-3 flex flex-col gap-2 min-h-30 w-full max-w-full overflow-hidden box-border">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      canEdit={canEdit}
                      isMobile={isMobile}
                    />
                  ))}

                  {tasks.length === 0 && (
                    <li className="text-center text-text-muted text-xs py-6 border border-dashed border-border rounded-xl">
                      Sin tareas
                    </li>
                  )}
                </ul>
                </DropTask>
              </div>
            );
          })}

          {/* Spacer derecho */}
          <div className="w-[1.5cqw] 3xl:w-0 shrink-0" aria-hidden="true" data-scroll-spacer="end"/>
        </div>
      </DragDropProvider>
    </HorizontalScroller>
  </div>
);
};

export default TaskList;
