import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid"
import type { Task } from "../../../types"

type TaskNotesProps = {
    taskNotes: Task['notes']
}

const TaskNotes = ({ taskNotes } : TaskNotesProps) => {
  return (
    <>
        {taskNotes?.length > 0 && (
        <>
          <div className="border-t border-[#2d3348] mt-2 mb-2" />

          <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
            <ChatBubbleLeftIcon className="h-3 w-3" />
            <span className="text-[10px] uppercase tracking-wider">
              {taskNotes.length} {taskNotes.length === 1 ? "nota" : "notas"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {taskNotes.filter(Boolean).map((note) => (
              <div key={note._id} className="flex items-start gap-2 py-1">
                <div className="w-1 h-1 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {note?.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default TaskNotes