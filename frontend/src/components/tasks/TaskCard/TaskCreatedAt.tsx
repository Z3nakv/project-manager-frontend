import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../../utils";
import type { Task } from "../../../types";

type taskCreatedAtProps = {
  taskCreatedAt: Task["createdAt"];
};

const TaskCreatedAt = ({ taskCreatedAt }: taskCreatedAtProps) => {
  return (
    <>
      {taskCreatedAt && (
        <div className="flex items-center gap-1.5 text-slate-600">
          <CalendarDaysIcon className="h-3 w-3 shrink-0" />
          <span className="text-[10px]">
            Creada: {formatDate(taskCreatedAt)}
          </span>
        </div>
      )}
    </>
  );
};

export default TaskCreatedAt;
