import { CheckIcon } from "@heroicons/react/20/solid"
import { GrRevert } from "react-icons/gr"
import { useUpdateNoteStatusMutation } from "../../hooks/mutations/useNotesMutation";
import type { Note } from "../../types/note";

type UpdateNoteStatusButtonProps = {
    projectId:string,
    taskId: string,
    note: Note
}
const UpdateNoteStatusButton = ({projectId, taskId, note}:UpdateNoteStatusButtonProps) => {
    const { isPending: isNoteStatusPending, handUpdateNoteStatus } =
        useUpdateNoteStatusMutation({
          taskId,
          projectId,
          note,
        });
  return (
    <button
          onClick={handUpdateNoteStatus}
          className={`p-1.5 rounded-lg transition-colors duration-150 cursor-pointer ${note.completed ? 'hover:bg-amber-300' : 'hover:bg-emerald-300'}`}
          disabled={isNoteStatusPending}
        >
          {note.completed ? (
            <GrRevert className="h-4 w-4 text-amber-500" />
          ) : (
            <CheckIcon className="h-4 w-4 text-emerald-500" />
          )}
        </button>
  )
}

export default UpdateNoteStatusButton