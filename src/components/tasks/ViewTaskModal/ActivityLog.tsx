import { statusTranslations } from "../../../constants/statusColors";
import type { Task } from "../../../types/task";

type ActivityLogProps = {
  taskData: Task;
};

const ActivityLog = ({ taskData }: ActivityLogProps) => {
  if (!taskData.completedBy.length) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mt-6 mb-3">
        Historial de cambios
      </p>

      <ul
        className="relative border-l border-border-subtle max-h-48 overflow-y-auto pl-2
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-border
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb:hover]:bg-border-strong"
      >
        {taskData.completedBy.map((activityLog, index) => (
          <li key={activityLog._id} className="mb-4 ml-4 relative">
            <div className="absolute left-[-1.6rem] top-0.5 w-5 h-5 bg-surface-base border border-border rounded-full flex items-center justify-center">
              <span className="text-[10px] font-mono text-text-muted">{index + 1}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-text-primary">
                {statusTranslations[activityLog.status]}
              </span>{" "}
              <span className="text-text-muted">por</span>{" "}
              <span className="text-text-secondary font-medium">
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