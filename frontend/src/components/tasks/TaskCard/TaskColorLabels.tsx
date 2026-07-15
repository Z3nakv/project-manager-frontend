import { labelColorClasses } from "../../../constants/labelColorClasses"
import type { Task } from "../../../types"

type TaskColorLabelsProps = {
    taskLabels: Task['labels']
}

export const TaskColorLabels = ({ taskLabels } : TaskColorLabelsProps) => {
  return (
    <>
        {taskLabels
        ? taskLabels?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {taskLabels.map((label) => (
                <span
                  key={label.text}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${labelColorClasses[label.color]}`}
                >
                  {label.text}
                </span>
              ))}
            </div>
          )
        : null}
    </>
  )
}

export default TaskColorLabels