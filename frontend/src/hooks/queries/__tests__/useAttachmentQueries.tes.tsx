/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getTaskAttachments } from '../../../services/AttachmentService';
import { useTaskAttachments } from '../useAttachmentsQueries';

vi.mock('../../../services/AttachmentService', () => ({
  getTaskAttachments: vi.fn(),
}));

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useTaskAttachments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a getTaskAttachments con projectId y taskId correctos', async () => {
    const mockAttachments = [{ _id: 'attach-1', filename: 'doc.pdf' }];
    vi.mocked(getTaskAttachments).mockResolvedValue(mockAttachments as any);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    const { result } = renderHook(
      () => useTaskAttachments({ projectId: 'proj-1', taskId: 'task-1' }),
      { wrapper: createWrapper(queryClient) }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getTaskAttachments).toHaveBeenCalledWith({ projectId: 'proj-1', taskId: 'task-1' });
    expect(result.current.data).toEqual(mockAttachments);
  });

  it('NO debe ejecutar la query si taskId está vacío (enabled: false)', () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(
      () => useTaskAttachments({ projectId: 'proj-1', taskId: '' }),
      { wrapper: createWrapper(queryClient) }
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(getTaskAttachments).not.toHaveBeenCalled();
  });

  it('NO debe refetchear al recuperar el foco de la ventana (refetchOnWindowFocus: false)', async () => {
    vi.mocked(getTaskAttachments).mockResolvedValue([] as any);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    const { result } = renderHook(
      () => useTaskAttachments({ projectId: 'proj-1', taskId: 'task-1' }),
      { wrapper: createWrapper(queryClient) }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getTaskAttachments).toHaveBeenCalledTimes(1);

    // Simula que la pestaña pierde y recupera el foco
    act(() => {
      window.dispatchEvent(new Event('visibilitychange'));
      window.dispatchEvent(new Event('focus'));
    });

    // Si refetchOnWindowFocus estuviera en true (el default), esto dispararía
    // una segunda llamada; con false, se mantiene en 1
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(getTaskAttachments).toHaveBeenCalledTimes(1);
  });

  it('debe usar cache independiente por taskId (coherente con la key de invalidación de useUploadAttachment)', async () => {
    vi.mocked(getTaskAttachments).mockResolvedValue([] as any);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    renderHook(() => useTaskAttachments({ projectId: 'proj-1', taskId: 'task-A' }), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(getTaskAttachments).toHaveBeenCalledTimes(1));

    // La key coincide exactamente con lo que invalida useUploadAttachment
    expect(queryClient.getQueryData(['taskAttachments', 'task-A'])).toEqual([]);
  });
});