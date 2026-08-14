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
      className="w-full h-2 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-border [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary"
    />
  );
};

export default NotesProgressbar;
