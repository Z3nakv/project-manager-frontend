/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { uploadAttachment } from '../../../services/AttachmentService';
import { useUploadAttachment } from '../useAttachmentMutations';

vi.mock('../../../services/AttachmentService', () => ({
  uploadAttachment: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
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

describe('useUploadAttachment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe invalidar la query de taskAttachments con el taskId correcto al subir el archivo', async () => {
    vi.mocked(uploadAttachment).mockResolvedValue({
      _id: 'attach-1',
      filename: 'documento.pdf',
    } as any);

    const { wrapper, queryClient } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useUploadAttachment(), { wrapper });

    const formData = new FormData();
    formData.append('file', new File(['contenido'], 'documento.pdf'));

    result.current.mutate({ projectId: 'proj-1', taskId: 'task-1', formData });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verificamos que usa taskId de las "variables", no del closure del hook —
    // importante porque este hook no recibe taskId como parámetro fijo,
    // lo recibe en cada mutate()
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['taskAttachments', 'task-1'] });
    expect(uploadAttachment).toHaveBeenCalledWith(
      expect.objectContaining({ projectId: 'proj-1', taskId: 'task-1' })
    );
  });

  it('debe mostrar toast de error si la subida falla', async () => {
    vi.mocked(uploadAttachment).mockRejectedValue(new Error('Archivo demasiado grande'));

    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useUploadAttachment(), { wrapper });

    const formData = new FormData();
    formData.append('file', new File(['x'.repeat(1000)], 'grande.pdf'));

    result.current.mutate({ projectId: 'proj-1', taskId: 'task-1', formData });

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Archivo demasiado grande'));
  });

  it('NO debe invalidar queries si la subida falla', async () => {
    vi.mocked(uploadAttachment).mockRejectedValue(new Error('Formato no permitido'));

    const { wrapper, queryClient } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useUploadAttachment(), { wrapper });

    const formData = new FormData();
    result.current.mutate({ projectId: 'proj-1', taskId: 'task-1', formData });

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});