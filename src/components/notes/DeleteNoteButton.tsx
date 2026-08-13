import { TrashIcon } from "@heroicons/react/20/solid";
import { useDeleteNoteMutation } from "../../hooks/mutations/useNotesMutation";
import type { Note } from "../../types/note";

type DeleteNoteButtonProps = {
    projectId:string,
    taskId: string,
    note: Note
}

const DeleteNoteButton = ({projectId, taskId, note}:DeleteNoteButtonProps) => {
    const { isPending: isDeleteNotePending, handleDeleteNote } =
        useDeleteNoteMutation({
          taskId,
          projectId,
          note,
        });
  return (
    <button
      onClick={handleDeleteNote}
      className="p-1.5 rounded-lg hover:bg-red-300 transition-colors duration-150 cursor-pointer"
      disabled={isDeleteNotePending}
    >
      <TrashIcon className="h-4 w-4 text-red-500" />
    </button>
  );
};

export default DeleteNoteButton;
