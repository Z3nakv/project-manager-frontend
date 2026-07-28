/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAssignTaskMutation } from '../useAssignTaskMutation';
import { assignTask } from '../../../services/assignTask';
import { socket } from '../../../lib/socket';

vi.mock('../../../services/assignTask', () => ({
  assignTask: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('../../../lib/socket', () => ({
  socket: { emit: vi.fn() },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    queryClient,
  };
}

describe('useAssignTaskMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe invalidar el proyecto, mostrar toast y emitir el socket con los datos correctos', async () => {
    vi.mocked(assignTask).mockResolvedValue({
      message: 'Tarea asignada correctamente',
      taskName: 'Diseño de login',
      projectName: 'Proyecto Test',
      projectId: 'proj-1',
      userIds: ['user-1', 'user-2'],
    } as any);

    const { wrapper, queryClient } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useAssignTaskMutation({ taskId: 'task-1', projectId: 'proj-1' }),
      { wrapper }
    );

    result.current.mutate({ userIds: ['user-1', 'user-2'] } as any);

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Tarea asignada correctamente'));

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['project', 'proj-1'] });
    expect(assignTask).toHaveBeenCalledWith({
      projectId: 'proj-1',
      taskId: 'task-1',
      userIds: { userIds: ['user-1', 'user-2'] },
    });
    expect(socket.emit).toHaveBeenCalledWith('assignedTask', {
      taskName: 'Diseño de login',
      projectName: 'Proyecto Test',
      projectId: 'proj-1',
      userIds: ['user-1', 'user-2'],
    });
  });

  it('NO debe incluir userId (singular) en el evento de socket (bug corregido)', async () => {
    vi.mocked(assignTask).mockResolvedValue({
      message: 'Tarea asignada correctamente',
      taskName: 'Tarea X',
      projectName: 'Proyecto',
      projectId: 'proj-1',
      userIds: ['user-1'],
    } as any);

    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useAssignTaskMutation({ taskId: 'task-1', projectId: 'proj-1' }),
      { wrapper }
    );

    result.current.mutate({ userIds: ['user-1'] } as any);

    await waitFor(() => expect(socket.emit).toHaveBeenCalled());

    const emittedPayload = vi.mocked(socket.emit).mock.calls[0][1];
    expect(emittedPayload).not.toHaveProperty('userId');
  });

  it('debe mostrar toast de error si la asignación falla (ej. colaborador no válido)', async () => {
    vi.mocked(assignTask).mockRejectedValue(
      new Error('Solo puedes asignar colaboradores del proyecto')
    );

    const { wrapper, queryClient } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useAssignTaskMutation({ taskId: 'task-1', projectId: 'proj-1' }),
      { wrapper }
    );

    result.current.mutate({ userIds: ['user-ajeno'] } as any);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Solo puedes asignar colaboradores del proyecto')
    );
    expect(invalidateSpy).not.toHaveBeenCalled();
    expect(socket.emit).not.toHaveBeenCalled();
  });
});