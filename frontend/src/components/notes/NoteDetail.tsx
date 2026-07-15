// NoteDetail.tsx
import { useLocation, useParams } from "react-router";
import { TrashIcon } from "@heroicons/react/20/solid";
import type { Note } from "../../types";

import { formatDate } from "../../utils";
import { useDeleteNoteMutation } from "../../hooks/mutations/useNotesMutation";

type NoteDetailProps = {
  note: Note;
};

const NoteDetail = ({ note }: NoteDetailProps) => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectID = params.projectID!;
  const taskID = queryParams.get("viewTask")!;
  
  const { isPending, handleDeleteNote } = useDeleteNoteMutation({ taskID, projectID, note })

  return (
    <div className="flex justify-between items-start p-3.5 rounded-xl bg-[#252d3d] border border-[#2d3348]">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-300">
          {note.content}{" "} por :
          <span className="text-indigo-400 font-semibold"> {note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      <button
        onClick={handleDeleteNote}
        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150 cursor-pointer"
        disabled={isPending}
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NoteDetail;