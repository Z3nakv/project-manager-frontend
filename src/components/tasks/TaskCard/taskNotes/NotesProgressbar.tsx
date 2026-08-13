import type { projectTask } from "../../../../types/task";

type NotesProgressbarProps = {
  taskNotes: projectTask["notes"];
};

const NotesProgressbar = ({ taskNotes }: NotesProgressbarProps) => {
  if (!taskNotes) return null;
  const completedNotes = taskNotes.filter((note) => note.completed).length;

  return (
    <progress
      value={completedNotes}
      max={taskNotes.length}
      className="w-full h-2 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-[#2d3348] [&::-webkit-progress-value]:bg-indigo-600 [&::-moz-progress-bar]:bg-indigo-600"
    />
  );
};

export default NotesProgressbar;
