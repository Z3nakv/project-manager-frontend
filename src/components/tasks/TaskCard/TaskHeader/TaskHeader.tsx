import { lazy, Suspense } from "react";
import type { Task } from "../../../../types/task";
const TaskMenuItems = lazy(() => import("./TaskMenuItems"));

type TaskHeaderProps = {
  taskId: Task["_id"];
  taskName: Task["name"];
  taskDescription: Task["description"];
  canEdit: boolean;
};

const TaskHeader = ({
  taskName,
  taskDescription,
  taskId,
  canEdit,
}: TaskHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <span className="font-sans text-sm font-semibold text-slate-200 leading-snug flex-1">
          {taskName}
        </span>
        <Suspense fallback={null}>
          <TaskMenuItems canEdit={canEdit} taskId={taskId} />
        </Suspense>
      </div>
      <p className="font-sans text-xs line-clamp-3 text-slate-400 leading-relaxed mb-3">
        {taskDescription}
      </p>
    </>
  );
};

export default TaskHeader;
