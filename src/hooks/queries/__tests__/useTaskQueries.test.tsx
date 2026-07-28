/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetTaskData } from '../useTaskQueries';
import { getProjectTaskById } from '../../../services/taskServices';

vi.mock('../../../services/taskServices', () => ({
  getProjectTaskById: vi.fn(),
}));

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useGetTaskData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a getProjectTaskById con projectId y taskId correctos', async () => {
    vi.mocked(getProjectTaskById).mockResolvedValue({ _id: 'task-1', name: 'Tarea' } as any);
    const queryClient = new QueryClient();

    const { result } = renderHook(
      () => useGetTaskData({ projectId: 'proj-1', taskId: 'task-1' }),
      { wrapper: createWrapper(queryClient) }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getProjectTaskById).toHaveBeenCalledWith({ projectId: 'proj-1', taskId: 'task-1' });
    expect(result.current.data).toEqual({ _id: 'task-1', name: 'Tarea' });
  });

  it('NO debe ejecutar la query si taskId está vacío (enabled: false)', async () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(
      () => useGetTaskData({ projectId: 'proj-1', taskId: '' }),
      { wrapper: createWrapper(queryClient) }
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(getProjectTaskById).not.toHaveBeenCalled();
  });

  it('NO debe volver a pedir datos al desmontar/remontar dentro del staleTime (bug corregido)', async () => {
    vi.mocked(getProjectTaskById).mockResolvedValue({ _id: 'task-1', name: 'Tarea' } as any);
    // Un solo QueryClient compartido entre ambos "montajes" del modal —
    // simula abrir y cerrar el modal sin perder el caché
    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    const { result, unmount } = renderHook(
      () => useGetTaskData({ projectId: 'proj-1', taskId: 'task-1' }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getProjectTaskById).toHaveBeenCalledTimes(1);

    // Simula cerrar el modal (desmontar)
    unmount();

    // Simula volver a abrir el modal inmediatamente (remontar, mismo queryClient)
    const { result: result2 } = renderHook(
      () => useGetTaskData({ projectId: 'proj-1', taskId: 'task-1' }),
      { wrapper }
    );

    await waitFor(() => expect(result2.current.isSuccess).toBe(true));

    // La clave del test: sigue siendo 1 llamada, no 2 — el caché sirvió los datos
    // sin refetch porque no pasaron los 30s del staleTime
    expect(getProjectTaskById).toHaveBeenCalledTimes(1);
  });

  it('SÍ debe volver a pedir datos si pasó el staleTime (30s)', async () => {
    vi.useFakeTimers();
    vi.mocked(getProjectTaskById).mockResolvedValue({ _id: 'task-1', name: 'Tarea' } as any);
    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    const { result, unmount } = renderHook(
      () => useGetTaskData({ projectId: 'proj-1', taskId: 'task-1' }),
      { wrapper }
    );

    await vi.waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getProjectTaskById).toHaveBeenCalledTimes(1);

    unmount();

    // Avanzamos el reloj 31 segundos — más allá del staleTime de 30s
    vi.advanceTimersByTime(31_000);

    const { result: result2 } = renderHook(
      () => useGetTaskData({ projectId: 'proj-1', taskId: 'task-1' }),
      { wrapper }
    );

    await vi.waitFor(() => expect(result2.current.isSuccess).toBe(true));

    // Esta vez sí debería haber refetcheado — 2 llamadas en total
    expect(getProjectTaskById).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});