/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetNotificationsQuery } from '../useNotificationQueries';
import { getNotifications } from '../../../services/notificationService';

vi.mock('../../../services/notificationService', () => ({
  getNotifications: vi.fn(),
}));

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useGetNotificationsQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe traer las notificaciones y exponerlas como data', async () => {
    const mockNotifications = [
      { _id: 'notif-1', content: 'Tarea creada', read: false },
      { _id: 'notif-2', content: 'Proyecto actualizado', read: true },
    ];
    vi.mocked(getNotifications).mockResolvedValue(mockNotifications as any);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    const { result } = renderHook(() => useGetNotificationsQuery(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getNotifications).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockNotifications);
  });

  it('debe exponer isError si la petición falla', async () => {
    vi.mocked(getNotifications).mockRejectedValue(new Error('No autorizado'));
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    const { result } = renderHook(() => useGetNotificationsQuery(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('No autorizado');
  });

  it('sin staleTime configurado, debe refetchear al remontar (comportamiento por defecto)', async () => {
    vi.mocked(getNotifications).mockResolvedValue([] as any);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = createWrapper(queryClient);

    const { result, unmount } = renderHook(() => useGetNotificationsQuery(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getNotifications).toHaveBeenCalledTimes(1);

    unmount();

    const { result: result2 } = renderHook(() => useGetNotificationsQuery(), { wrapper });
    await waitFor(() => expect(result2.current.isSuccess).toBe(true));

    // A diferencia de useGetTaskData (staleTime: 30s) y useTaskSuggestions
    // (staleTime: Infinity), este hook SÍ vuelve a pedir datos porque no
    // tiene staleTime configurado — coherente con que las notificaciones
    // deben verse frescas cada vez que el usuario abre el panel
    expect(getNotifications).toHaveBeenCalledTimes(2);
  });
});