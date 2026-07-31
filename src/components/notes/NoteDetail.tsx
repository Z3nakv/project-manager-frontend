// NoteDetail.tsx
import { useLocation } from "react-router";
import { TrashIcon, CheckIcon } from "@heroicons/react/20/solid";

import { formatDate } from "../../utils";
import { useDeleteNoteMutation, useUpdateNoteStatusMutation } from "../../hooks/mutations/useNotesMutation";
import type { Note } from "../../types/note";
import useProjectId from "../../hooks/useProjectId";

type NoteDetailProps = {
  note: Note;
};

const NoteDetail = ({ note }: NoteDetailProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = useProjectId();
  const taskId = queryParams.get("viewTask")!;

  const { isPending: isDeleteNotePending, handleDeleteNote } = useDeleteNoteMutation({
    taskId,
    projectId,
    note,
  });

  const { isPending: isNoteStatusPending, handUpdateNoteStatus } = useUpdateNoteStatusMutation({
    taskId,
    projectId,
    note,
  });

  return (
    <div className="flex justify-between items-start p-3.5 rounded-xl bg-[#252d3d] border border-[#2d3348]">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-300">
          {note.content} por :
          <span className="text-indigo-400 font-semibold">
            {" "}
            {note.createdBy.name}
          </span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      <div>
        <button
          onClick={handUpdateNoteStatus}
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150 cursor-pointer"
          disabled={isNoteStatusPending}
        >
          <CheckIcon className="h-4 w-4" />
        </button>

        <button
          onClick={handleDeleteNote}
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150 cursor-pointer"
          disabled={isDeleteNotePending}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;
