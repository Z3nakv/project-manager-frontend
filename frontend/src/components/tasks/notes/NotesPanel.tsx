// NotesPanel.tsx
import type { Task } from "../../../types"
import AddNoteForm from "./AddNoteForm"
import NoteDetail from "./NoteDetail"

type NotesPanelProps = {
  notes: Task['notes']
}

const NotesPanel = ({ notes }: NotesPanelProps) => {
  
  return (
    <div className="mt-6">
      <AddNoteForm />

      <div className="mt-8">
        {notes?.length ? (
          <>
            <p className="font-bold text-base text-slate-300 mb-4">Notas:</p>
            <div className="flex flex-col gap-2">
              {notes.map(note => (
                <NoteDetail key={note._id} note={note} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-slate-500 text-center text-sm py-6 border border-dashed border-[#2d3348] rounded-xl">
            No hay notas
          </p>
        )}
      </div>
    </div>
  )
}

export default NotesPanel