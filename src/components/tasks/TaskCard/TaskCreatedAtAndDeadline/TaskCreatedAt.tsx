import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import type { Task } from "../../../../types/task";
import { formatDate } from "../../../../utils";

type taskCreatedAtProps = {
  taskCreatedAt: Task["createdAt"];
};

const TaskCreatedAt = ({ taskCreatedAt }: taskCreatedAtProps) => {
  return (
    <>
      {taskCreatedAt && (
        <div className="flex items-center gap-1.5 text-amber-50">
          <CalendarDaysIcon className="h-5" />
          <span className="text-xs truncate">
            {formatDate(taskCreatedAt)}
          </span>
        </div>
      )}
    </>
  );
};

export default TaskCreatedAt;
