import { DialogTitle } from "@headlessui/react";
import { statusColors, statusTranslations } from "../../../constants/statusColors";
import type { Task } from "../../../types/task";

type ViewTaskModalHeaderProps = {
  taskData: Task;
};

const ViewTaskModalHeader = ({ taskData }: ViewTaskModalHeaderProps) => {
  return (
    <div className="relative mb-6">
      

      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[taskData.status]}`}
        >
          {statusTranslations[taskData.status]}
        </span>
      </div>
      <DialogTitle
        as="h3"
        className="text-xl font-bold text-text-primary wrap-break-words pr-8"
      >
        {taskData.name}
      </DialogTitle>
    </div>
  );
};

export default ViewTaskModalHeader;