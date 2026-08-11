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
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
        <FolderIcon className="h-3.5 w-3.5 text-slate-600" />
        Mover a carpeta
      </label>
      <select
        className="w-full bg-[#161925] border border-zinc-800 text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors duration-150 cursor-pointer"
        defaultValue={taskData.status}
        onChange={handleUpdateStatus}
      >
        {Object.entries(statusTranslations).map(([key, value]) => (
          <option key={key} value={key} className="bg-[#0f1117]">
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusSelector;