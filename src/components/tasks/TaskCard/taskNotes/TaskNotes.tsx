import type { projectTask } from "../../../../types/task";
import { FiMessageCircle } from "react-icons/fi";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

type TaskNotesProps = {
  taskNotes: projectTask["notes"];
};

const TaskNotes = ({ taskNotes }: TaskNotesProps) => {
  if (!taskNotes) return null;

  return (
    <Popover className="font-mono">
      <PopoverButton className="flex items-center gap-1.5 text-slate-500 mb-1.5 cursor-pointer group">
        <FiMessageCircle className="w-6 h-6 text-slate-300 group-data-open:text-indigo-400 transition-colors duration-150" />
        <span className="text-[10px] uppercase tracking-wider">
          {taskNotes.length} {taskNotes.length === 1 ? "nota" : "notas"}
        </span>
      </PopoverButton>

      {taskNotes.length > 0 && (
        <PopoverPanel
          static
          className="grid grid-rows-[0fr] data-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out"
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1.5 pt-1 pb-2">
              {taskNotes.filter(Boolean).map((note) => (
                <div key={note._id} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <p
                    className={`text-xs text-slate-400 leading-relaxed ${note.completed ? "line-through" : ""}`}
                  >
                    {note?.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PopoverPanel>
      )}
    </Popover>
  );
};

export default TaskNotes;