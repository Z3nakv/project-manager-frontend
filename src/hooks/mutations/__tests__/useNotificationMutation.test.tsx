/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { clearAll, markAsRead } from '../../../services/notificationService';
import { useClearAllMutation, useMarkAsReadMutation } from '../useNotificationMutation';

vi.mock('../../../services/notificationService', () => ({
  markAsRead: vi.fn(),
  clearAll: vi.fn(),
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

describe('useNotificationMutations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useMarkAsReadMutation', () => {
    it('debe invalidar la query de notifications al marcar como leída', async () => {
      vi.mocked(markAsRead).mockResolvedValue('Notificación leída' as any);
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useMarkAsReadMutation(), { wrapper });

      result.current.mutate('notif-1' as any);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['notifications'] });
    });

    it('NO debe invalidar queries si la mutación falla', async () => {
      vi.mocked(markAsRead).mockRejectedValue(new Error('Notificación no encontrada'));
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useMarkAsReadMutation(), { wrapper });

      result.current.mutate('notif-fake' as any);

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(invalidateSpy).not.toHaveBeenCalled();
    });
  });

  describe('useClearAllMutation', () => {
    it('debe invalidar la query de notifications al limpiar todas', async () => {
      vi.mocked(clearAll).mockResolvedValue('Notificaciones eliminadas' as any);
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useClearAllMutation(), { wrapper });

      result.current.mutate(undefined as any);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['notifications'] });
    });

    it('NO debe invalidar queries si falla', async () => {
      vi.mocked(clearAll).mockRejectedValue(new Error('Error de red'));
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useClearAllMutation(), { wrapper });

      result.current.mutate(undefined as any);

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(invalidateSpy).not.toHaveBeenCalled();
    });
  });
});