/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createNote, deleteNote, updateNoteStatus } from '../NoteService';
import { httpPost, httpDelete, httpPut } from '../../lib/http';

vi.mock('../../lib/http', () => ({
  httpPost: vi.fn(),
  httpDelete: vi.fn(),
  httpPut: vi.fn(),
}));

describe('NoteService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createNote', () => {
    it('debe llamar a httpPost con la URL correcta y devolver solo el mensaje', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Nota Creada Correctamente' });

      const formData = { content: 'Nueva nota' } as any;
      const result = await createNote({ formData, projectId: 'proj-1', taskId: 'task-1' });

      expect(httpPost).toHaveBeenCalledWith('/projects/proj-1/tasks/task-1/notes', formData);
      expect(result).toBe('Nota Creada Correctamente');
    });
  });

  describe('deleteNote', () => {
    it('debe llamar a httpDelete con la URL correcta y devolver solo el mensaje', async () => {
      vi.mocked(httpDelete).mockResolvedValue({ message: 'Nota Eliminada' });

      const result = await deleteNote({ projectId: 'proj-1', taskId: 'task-1', noteId: 'note-1' });

      expect(httpDelete).toHaveBeenCalledWith('/projects/proj-1/tasks/task-1/notes/note-1');
      expect(result).toBe('Nota Eliminada');
    });
  });

  describe('updateNoteStatus', () => {
    it('debe llamar a httpPut con la URL correcta y devolver solo el mensaje', async () => {
      vi.mocked(httpPut).mockResolvedValue({ message: 'Estado de nota actualizado!' });

      const result = await updateNoteStatus({ projectId: 'proj-1', taskId: 'task-1', noteId: 'note-1' });

      expect(httpPut).toHaveBeenCalledWith('/projects/proj-1/tasks/task-1/notes/note-1/status');
      expect(result).toBe('Estado de nota actualizado!');
    });
  });
});