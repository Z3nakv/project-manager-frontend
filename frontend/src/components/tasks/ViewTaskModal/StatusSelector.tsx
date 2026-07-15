import { statusTranslations } from "../../../constants/statusColors";
import type { Task } from "../../../types";

type StatusSelectorProps = {
  taskData: Task;
  handleUpdateStatus: (e: React.ChangeEvent<HTMLSelectElement, Element>) => void
};

const StatusSelector = ({ taskData, handleUpdateStatus } : StatusSelectorProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Cambiar estado
        </label>
        <select
          className="w-full bg-[#151921] border border-[#2d3348] text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors duration-150 cursor-pointer"
          defaultValue={taskData.status}
          onChange={handleUpdateStatus}
        >
          {Object.entries(statusTranslations).map(([key, value]) => (
            <option key={key} value={key} className="bg-[#1e2330]">
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default StatusSelector;
