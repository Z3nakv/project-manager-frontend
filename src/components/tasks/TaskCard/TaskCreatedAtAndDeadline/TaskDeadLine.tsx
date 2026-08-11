import { ClockIcon } from "@heroicons/react/20/solid";
import type { Task } from "../../../../types/task";
import { formatDate } from "../../../../utils";

type TaskDeadlineProps = {
  taskDeadline: Task["deadline"];
};

const TaskDeadLine = ({ taskDeadline }: TaskDeadlineProps) => {
  return (
    <>
      {taskDeadline ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-50">
            <ClockIcon className="h-5" />
            <span className="text-xs truncate">
              {formatDate(taskDeadline)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-amber-50">
          <ClockIcon className="h-5" />
          <p className="text-xs font-black">--</p>
        </div>
      )}
    </>
  );
};

export default TaskDeadLine;
