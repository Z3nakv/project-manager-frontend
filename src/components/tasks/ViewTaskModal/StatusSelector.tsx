import { FolderIcon } from "@heroicons/react/20/solid";
import { statusTranslations } from "../../../constants/statusColors";
import type { Task } from "../../../types/task";

type StatusSelectorProps = {
  taskData: Task;
  handleUpdateStatus: (e: React.ChangeEvent<HTMLSelectElement, Element>) => void;
};

const StatusSelector = ({ taskData, handleUpdateStatus }: StatusSelectorProps) => {
  return (
    <div className="space-y-2 mb-6">
      <label className="text-xs font-semibold uppercase tracking-widest text-text-muted flex items-center gap-1.5">
        <FolderIcon className="h-3.5 w-3.5 text-text-muted" />
        Mover a carpeta
      </label>
      <select
        className="w-full bg-input border border-border text-text-primary text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150 cursor-pointer"
        defaultValue={taskData.status}
        onChange={handleUpdateStatus}
      >
        {Object.entries(statusTranslations).map(([key, value]) => (
          <option key={key} value={key} className="bg-surface-base">
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusSelector;