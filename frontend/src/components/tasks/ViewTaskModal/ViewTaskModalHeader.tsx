import { DialogTitle } from "@headlessui/react";
import { statusColors, statusTranslations } from "../../../constants/statusColors";
import type { Task } from "../../../types";
import { XMarkIcon } from "@heroicons/react/20/solid";

type ViewTaskModalHeaderProps = {
  taskData: Task;
  handleClose: () => void | Promise<void>
};

const ViewTaskModalHeader = ({ taskData, handleClose } : ViewTaskModalHeaderProps) => {
  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[taskData.status]}`}
            >
              {statusTranslations[taskData.status]}
            </span>
          </div>
          <DialogTitle
            as="h3"
            className="text-xl font-bold text-slate-100 wrap-break-words"
          >
            {taskData.name}
          </DialogTitle>
        </div>

        <button
          onClick={handleClose}
          className="ml-4 p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150 shrink-0"
        >
          <XMarkIcon className="cursor-pointer h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default ViewTaskModalHeader;
