import { useState } from 'react'
import AddNoteForm from "./AddNoteForm"
import NoteDetail from "./NoteDetail"
import type { Task } from '../../types/task'

type NotesPanelProps = {
  notes: Task['notes']
}

const VISIBLE_NOTES = 3

const NotesPanel = ({ notes }: NotesPanelProps) => {
  const [showAll, setShowAll] = useState(false)
  const visibleNotes = showAll ? notes : notes?.slice(0, VISIBLE_NOTES)

  return (
    <div className="mt-6 font-mono">
      <AddNoteForm />

      <div className="mt-3">
        {notes?.length ? (
          <>
            <p className="font-bold text-base text-text-primary mb-3">
              Notas:{" "}
              <span className="text-text-muted font-normal text-sm">
                ({notes.length})
              </span>
            </p>

            <div className="flex flex-col gap-2">
              {visibleNotes?.map(note => (
                <NoteDetail key={note._id} note={note} />
              ))}
            </div>

            {notes.length > VISIBLE_NOTES && (
              <button
                onClick={() => setShowAll(prev => !prev)}
                className="mt-3 w-full py-2 text-xs text-primary hover:text-primary-hover border border-border hover:border-primary/30 rounded-lg transition-colors cursor-pointer"
              >
                {showAll ? 'Ver menos ↑' : `Ver ${notes.length - VISIBLE_NOTES} notas más ↓`}
              </button>
            )}
          </>
        ) : (
          <p className="text-text-muted text-center text-sm py-6 border border-dashed border-border rounded-xl">
            No hay notas
          </p>
        )}
      </div>
    </div>
  )
}

export default NotesPanel