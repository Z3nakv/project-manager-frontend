/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} from '../useTaskMutations';
import { createTask, deleteTask, updateStatus, updateTask } from '../../../services/taskServices';
import { socket } from '../../../lib/socket';
import { useAuth } from '../../useAuth';

vi.mock('../../../services/taskServices', () => ({
  createTask: vi.fn(),
  updateTask: vi.fn(),
  updateStatus: vi.fn(),
  deleteTask: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('../../../lib/socket', () => ({
  socket: { emit: vi.fn() },
}));

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('../../useAuth', () => ({
  useAuth: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useTaskMutations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      data: { _id: 'user-1', name: 'Adrian' },
    } as any);
  });

  describe('useCreateTaskMutation', () => {
    it('debe mostrar toast, resetear el form, navegar y emitir el socket al crear la tarea', async () => {
      const mockReset = vi.fn();
      vi.mocked(createTask).mockResolvedValue({
        message: 'Tarea creada correctamente',
        project: { _id: 'proj-1', projectName: 'Proyecto Test' },
      } as any);

      const { result } = renderHook(
        () => useCreateTaskMutation({ reset: mockReset, projectId: 'proj-1' }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({ name: 'Nueva tarea' } as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Tarea creada correctamente'));
      expect(mockReset).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalled();
      expect(socket.emit).toHaveBeenCalledWith(
        'task_created',
        expect.objectContaining({ message: expect.stringContaining('Proyecto Test') })
      );
    });

    it('debe mostrar un toast de error si createTask falla', async () => {
      vi.mocked(createTask).mockRejectedValue(new Error('Error de red'));

      const { result } = renderHook(
        () => useCreateTaskMutation({ projectId: 'proj-1' }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({ name: 'Nueva tarea' } as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error de red'));
      expect(socket.emit).not.toHaveBeenCalled();
    });

    it('NO debe fallar si no se pasa la función reset (es opcional)', async () => {
      vi.mocked(createTask).mockResolvedValue({
        message: 'Tarea creada',
        project: { _id: 'proj-1', projectName: 'Proyecto' },
      } as any);

      const { result } = renderHook(
        () => useCreateTaskMutation({ projectId: 'proj-1' }), // sin reset
        { wrapper: createWrapper() }
      );

      result.current.mutate({ name: 'Tarea' } as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalled());
      // Si esto no lanzó, el guard "if (reset) reset()" funciona correctamente
    });
  });

  describe('useUpdateTaskMutation', () => {
    it('debe mostrar toast de éxito y emitir el evento de socket correcto (bug corregido)', async () => {
      vi.mocked(updateTask).mockResolvedValue({
        message: 'Tarea actualizada',
        taskName: 'Tarea Editada',
        project: { _id: 'proj-1' },
      } as any);

      const { result } = renderHook(
        () => useUpdateTaskMutation({ taskId: 'task-1', projectId: 'proj-1' }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({ name: 'Tarea Editada' } as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Tarea actualizada'));
      expect(socket.emit).toHaveBeenCalledWith(
        'taskUpdated',
        expect.objectContaining({ message: expect.stringContaining('Tarea Editada') })
      );
    });

    it('debe mostrar un toast de error si falla (bug corregido — antes solo hacía console.log)', async () => {
      vi.mocked(updateTask).mockRejectedValue(new Error('No autorizado'));

      const { result } = renderHook(
        () => useUpdateTaskMutation({ taskId: 'task-1', projectId: 'proj-1' }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({ name: 'Tarea' } as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('No autorizado'));
    });
  });

  describe('useUpdateTaskStatusMutation', () => {
    it('debe emitir el socket con el usuario y equipo correctos', async () => {
      vi.mocked(updateStatus).mockResolvedValue({
        message: 'Estado actualizado',
        task: { taskName: 'Tarea X' },
        user: {userName: 'Adrian', userId: 'user-1'}
      } as any);

      const team = ['member-1', 'member-2'] as any;
      const { result } = renderHook(
        () => useUpdateTaskStatusMutation({ projectId: 'proj-1', team }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({ status: 'completed' } as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Estado actualizado'));
      expect(socket.emit).toHaveBeenCalledWith(
        'task_status_update',
        expect.objectContaining({
          message: expect.stringContaining('Tarea X'),
          projectId: 'proj-1',
          team,
          triggeredBy: 'user-1',
        })
      );
    });

    it('debe mostrar toast de error si falla', async () => {
      vi.mocked(updateStatus).mockRejectedValue(new Error('Status inválido'));

      const { result } = renderHook(
        () => useUpdateTaskStatusMutation({ projectId: 'proj-1', team: [] as any }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({ status: 'invalid' } as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Status inválido'));
    });
  });

  describe('useDeleteTaskMutation', () => {
    it('debe mostrar toast de éxito y emitir el evento de socket al eliminar', async () => {
      vi.mocked(deleteTask).mockResolvedValue({
        message: 'Tarea eliminada',
        project: { _id: 'proj-1', projectName: 'Proyecto Test' },
      } as any);

      const { result } = renderHook(
        () => useDeleteTaskMutation({ projectId: 'proj-1' }),
        { wrapper: createWrapper() }
      );

      result.current.mutate('task-1' as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Tarea eliminada'));
      expect(socket.emit).toHaveBeenCalledWith(
        'taskDeleted',
        expect.objectContaining({ message: expect.stringContaining('Proyecto Test') })
      );
    });

    it('debe mostrar toast de error si falla la eliminación', async () => {
      vi.mocked(deleteTask).mockRejectedValue(new Error('No se pudo eliminar'));

      const { result } = renderHook(
        () => useDeleteTaskMutation({ projectId: 'proj-1' }),
        { wrapper: createWrapper() }
      );

      result.current.mutate('task-1' as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('No se pudo eliminar'));
    });
  });
});