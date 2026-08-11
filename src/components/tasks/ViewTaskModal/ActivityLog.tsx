import { statusTranslations } from "../../../constants/statusColors";
import type { Task } from "../../../types/task";

type ActivityLogProps = {
  taskData: Task;
};

const ActivityLog = ({ taskData }: ActivityLogProps) => {
  if (!taskData.completedBy.length) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-6 mb-3">
        Historial de cambios
      </p>

      <ul
        className="relative border-l border-zinc-800 max-h-48 overflow-y-auto pl-2
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#2d3348]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb:hover]:bg-[#3d4663]"
      >
        {taskData.completedBy.map((activityLog, index) => (
          <li key={activityLog._id} className="mb-4 ml-4 relative">
            <div className="absolute left-[-1.6rem] top-0.5 w-5 h-5 bg-[#161925] border border-zinc-800 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-mono text-slate-400">{index + 1}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-slate-300">
                {statusTranslations[activityLog.status]}
              </span>{" "}
              <span className="text-slate-500">por</span>{" "}
              <span className="text-slate-400 font-medium">
                {activityLog.user.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;