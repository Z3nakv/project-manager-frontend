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
            <div className="flex flex-wrap gap-1.5 mb-2.5 ">
              {taskLabels.map((label) => (
                <span
                  key={label.text}
                  className={`text-xs font-bold px-3 py-2 rounded-md border ${labelColorClasses[label.color]}`}
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