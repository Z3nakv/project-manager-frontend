import { CalendarIcon, ClockIcon } from "@heroicons/react/20/solid";
import type { Task } from "../../../types/task";
import { formatDate } from "../../../utils";

type TimeStampsProps = {
  taskData: Task;
};

const TimeStamps = ({ taskData }: TimeStampsProps) => {
  return (
    <div className="flex gap-4 mb-5 font-mono text-xs text-text-muted">
      <span className="flex items-center gap-1.5">
        <CalendarIcon className="h-3.5 w-3.5 text-text-muted" />
        Creada: {formatDate(taskData.createdAt)}
      </span>
      <span className="flex items-center gap-1.5">
        <ClockIcon className="h-3.5 w-3.5 text-text-muted" />
        Modificada: {formatDate(taskData.updatedAt)}
      </span>
    </div>
  );
};

export default TimeStamps;