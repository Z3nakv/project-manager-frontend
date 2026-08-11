import { labelColorClasses } from "../../../constants/labelColorClasses"
import type { Task } from "../../../types/task"

type TaskColorLabelsProps = {
    taskLabels: Task['labels']
}

export const TaskColorLabels = ({ taskLabels } : TaskColorLabelsProps) => {
  return (
    <>
        {taskLabels
        ? taskLabels?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-1">
              {taskLabels.map((label) => (
                <span
                  key={label.text}
                  className={`text-xs font-bold px-2 py-1 rounded-md border ${labelColorClasses[label.color]}`}
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