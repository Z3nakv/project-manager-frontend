/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTaskSuggestions } from '../useTaskSuggestions';
import { getTaskSuggestions } from '../../../services/aiService';

vi.mock('../../../services/aiService', () => ({
  getTaskSuggestions: vi.fn(),
}));

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useTaskSuggestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('NO debe ejecutar la query si enabled es false', () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(
      () => useTaskSuggestions('proj-1', ['labels'], 3, false),
      { wrapper: createWrapper(queryClient) }
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(getTaskSuggestions).not.toHaveBeenCalled();
  });

  it('debe llamar a getTaskSuggestions con los argumentos correctos cuando enabled es true', async () => {
    vi.mocked(getTaskSuggestions).mockResolvedValue([
      { name: 'Tarea sugerida', description: 'Desc' },
    ] as any);
    const queryClient = new QueryClient();

    const { result } = renderHook(
      () => useTaskSuggestions('proj-1', ['labels', 'estimatedDays'], 5, true),
      { wrapper: createWrapper(queryClient) }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getTaskSuggestions).toHaveBeenCalledWith('proj-1', ['labels', 'estimatedDays'], 5);
    expect(result.current.data).toEqual([{ name: 'Tarea sugerida', description: 'Desc' }]);
  });

  it('debe usar cache independiente para distintas combinaciones de selectedFields/quantity', async () => {
    vi.mocked(getTaskSuggestions).mockResolvedValue([] as any);
    const queryClient = new QueryClient();

    renderHook(() => useTaskSuggestions('proj-1', ['labels'], 3, true), {
      wrapper: createWrapper(queryClient),
    });
    renderHook(() => useTaskSuggestions('proj-1', ['estimatedDays'], 5, true), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(getTaskSuggestions).toHaveBeenCalledTimes(2));

    // Confirma que ambas combinaciones generan queries separadas en cache,
    // no comparten resultado por error de queryKey
    expect(queryClient.getQueryData(['taskSuggestions', 'proj-1', ['labels'], 3])).toEqual([]);
    expect(queryClient.getQueryData(['taskSuggestions', 'proj-1', ['estimatedDays'], 5])).toEqual([]);
  });

  it('NO debe refetchear al remontar con la misma combinación de parámetros (staleTime: Infinity)', async () => {
    vi.mocked(getTaskSuggestions).mockResolvedValue([{ name: 'X', description: 'Y' }] as any);
    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    const { result, unmount } = renderHook(
      () => useTaskSuggestions('proj-1', ['labels'], 3, true),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getTaskSuggestions).toHaveBeenCalledTimes(1);

    unmount();

    // Remontar con exactamente los mismos parámetros — al ser una sugerencia
    // de IA (costosa y no cambia sola), staleTime: Infinity evita volver a
    // gastar una llamada a la API externa
    const { result: result2 } = renderHook(
      () => useTaskSuggestions('proj-1', ['labels'], 3, true),
      { wrapper }
    );

    await waitFor(() => expect(result2.current.isSuccess).toBe(true));
    expect(getTaskSuggestions).toHaveBeenCalledTimes(1); // sigue siendo 1, no 2
  });
});