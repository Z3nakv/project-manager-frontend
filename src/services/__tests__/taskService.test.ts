/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getProjectTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateStatus,
} from '../taskServices';
import { httpGet, httpPost, httpPut, httpDelete } from '../../lib/http';

vi.mock('../../lib/http', () => ({
  httpGet: vi.fn(),
  httpPost: vi.fn(),
  httpPut: vi.fn(),
  httpDelete: vi.fn(),
}));

describe('taskServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProjectTaskById', () => {
  it('debe devolver la tarea validada', async () => {
    const mockTask = {
      _id: 'task-1',
      name: 'Tarea',
      description: 'Desc',
      status: 'pending',
      completedBy: [],
      project: {
        team: [{ _id: 'user-1' }],
        manager: { _id: 'user-2' },
      },
      createdAt: '2026-07-27T00:00:00.000Z',
      updatedAt: '2026-07-27T00:00:00.000Z',
    };
    vi.mocked(httpGet).mockResolvedValue(mockTask);

    const result = await getProjectTaskById({ projectId: 'proj-1', taskId: 'task-1' });

    expect(httpGet).toHaveBeenCalledWith('/projects/proj-1/tasks/task-1');
    expect(result).toEqual(mockTask);
  });
  });

  describe('createTask', () => {
    it('debe devolver message y project validados', async () => {
      vi.mocked(httpPost).mockResolvedValue({
        message: 'Tarea creada correctamente',
        project: { projectName: 'Proyecto', projectTeam: [{ _id: 'user-1' }], projectId: 'proj-1' },
      });

      const result = await createTask({ formData: { name: 'Tarea' } as any, projectId: 'proj-1' });

      expect(httpPost).toHaveBeenCalledWith('/projects/proj-1/tasks', { name: 'Tarea' });
      expect(result.message).toBe('Tarea creada correctamente');
      expect(result.project.projectId).toBe('proj-1');
    });

    it('debe lanzar error si la forma de la respuesta no coincide con el schema', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'ok' }); // sin "project"

      await expect(
        createTask({ formData: { name: 'Tarea' } as any, projectId: 'proj-1' })
      ).rejects.toThrow('Los datos de "createTask" no tienen el formato esperado.');
    });
  });

  describe('updateTask', () => {
    it('debe retornar los datos validados (bug corregido — antes no retornaba nada)', async () => {
      vi.mocked(httpPut).mockResolvedValue({
        message: 'Tarea Actualizada Correctamente',
        taskName: 'Tarea Editada',
        project: { projectTeam: [{ _id: 'user-1' }], projectId: 'proj-1' },
      });

      const result = await updateTask({
        projectId: 'proj-1',
        taskId: 'task-1',
        formData: { name: 'Tarea Editada' } as any,
      });

      // Antes del fix, "result" era undefined sin importar la respuesta del backend
      expect(result).not.toBeUndefined();
      expect(result.taskName).toBe('Tarea Editada');
      expect(result.message).toBe('Tarea Actualizada Correctamente');
    });

    it('debe lanzar error si falta taskName en la respuesta', async () => {
      vi.mocked(httpPut).mockResolvedValue({
        message: 'ok',
        project: { projectTeam: [], projectId: 'proj-1' },
        // sin taskName
      });

      await expect(
        updateTask({ projectId: 'proj-1', taskId: 'task-1', formData: {} as any })
      ).rejects.toThrow('Los datos de "updateTask" no tienen el formato esperado.');
    });
  });

  describe('deleteTask', () => {
    it('debe devolver message y project validados', async () => {
      vi.mocked(httpDelete).mockResolvedValue({
        message: 'Tarea Eliminada Correctamente',
        project: { projectName: 'Proyecto', projectTeam: [], projectId: 'proj-1' },
      });

      const result = await deleteTask({ projectId: 'proj-1', taskId: 'task-1' });

      expect(httpDelete).toHaveBeenCalledWith('/projects/proj-1/tasks/task-1');
      expect(result.message).toBe('Tarea Eliminada Correctamente');
    });
  });

  describe('updateStatus', () => {
    it('debe devolver message, task y user validados', async () => {
      vi.mocked(httpPost).mockResolvedValue({
        message: 'Tarea Actualizada',
        task: { taskName: 'Tarea X' },
        user: { userName: 'Adrian', userId: 'user-1' },
      });

      const result = await updateStatus({ projectId: 'proj-1', taskId: 'task-1', status: 'completed' });

      expect(httpPost).toHaveBeenCalledWith('/projects/proj-1/tasks/task-1/status', {
        status: 'completed',
      });
      expect(result.task.taskName).toBe('Tarea X');
      expect(result.user.userId).toBe('user-1');
    });

    it('debe lanzar error si falta el campo user', async () => {
      vi.mocked(httpPost).mockResolvedValue({
        message: 'ok',
        task: { taskName: 'Tarea X' },
        // sin user
      });

      await expect(
        updateStatus({ projectId: 'proj-1', taskId: 'task-1', status: 'completed' })
      ).rejects.toThrow('Los datos de "updateStatus" no tienen el formato esperado.');
    });
  });
});