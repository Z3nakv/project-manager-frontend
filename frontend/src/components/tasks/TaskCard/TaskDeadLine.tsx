import { ClockIcon } from "@heroicons/react/20/solid"
import type { Task } from "../../../types"
import { formatDate } from "../../../utils"
import { getDeadlineStatus } from "./taskCard.config"

type TaskDeadlineProps = {
    taskDeadline: Task['deadline']
}



const TaskDeadLine = ({ taskDeadline } : TaskDeadlineProps) => {

const deadlineStatus = getDeadlineStatus(taskDeadline!);

  return (
    <>
        {taskDeadline && deadlineStatus ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <ClockIcon className="h-3 w-3 shrink-0" />
              <span className="text-[10px]">
                Límite: {formatDate(taskDeadline)}
              </span>
            </div>
            <span
              className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${deadlineStatus.bg} ${deadlineStatus.color}`}
            >
              {deadlineStatus.label}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-slate-500">
            <ClockIcon className="h-3 w-3 shrink-0" />
            <p className="text-[10px]">Fecha limite no establecida aun</p>
          </div>
        )}
    </>
  )
}

export default TaskDeadLine