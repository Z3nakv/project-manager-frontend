import { useLocation } from "react-router";
import { formatDate } from "../../utils";
import type { Note } from "../../types/note";
import useProjectId from "../../hooks/useProjectId";
import { getColor } from "../../utils/getColor";
import UpdateNoteStatusButton from "./UpdatenoteStatusButton";
import DeleteNoteButton from "./DeleteNoteButton";

type NoteDetailProps = {
  note: Note;
};

const NoteDetail = ({ note }: NoteDetailProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = useProjectId();
  const taskId = queryParams.get("viewTask")!;

  return (
    <div className="flex justify-between items-center px-2 py-1 rounded-xl bg-[#252d3d] border border-[#2d3348]">
      <div className="flex items-center gap-10">
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center text-md font-bold shrink-0 ${getColor(note._id)}`}
        >
          {" "}
          <p className="text-xs">
            {note.createdBy.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col ">
          <p className="text-xs text-slate-300">{note.content}</p>
          <p className="text-[10px] text-slate-500">
            {formatDate(note.createdAt)}
          </p>
        </div>
      </div>
      <div>
        <UpdateNoteStatusButton
          projectId={projectId}
          taskId={taskId}
          note={note}
        />
        <DeleteNoteButton projectId={projectId} taskId={taskId} note={note} />
      </div>
    </div>
  );
};

export default NoteDetail;
