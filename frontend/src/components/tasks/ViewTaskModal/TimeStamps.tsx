import type { Task } from "../../../types/task";
import { formatDate } from "../../../utils";

type TimeStampsProps = {
  taskData: Task;
};

const TimeStamps = ({ taskData } : TimeStampsProps) => {
  return (
    <>
      <div className="flex gap-4 mb-5">
        <p className="text-xs text-slate-500">
          Agregada el: {formatDate(taskData.createdAt)}
          <span className="text-slate-400 ml-1">—</span>
        </p>
        <p className="text-xs text-slate-500">
          Actualizada: {formatDate(taskData.updatedAt)}
          <span className="text-slate-400 ml-1">—</span>
        </p>
      </div>
    </>
  );
};

export default TimeStamps;
