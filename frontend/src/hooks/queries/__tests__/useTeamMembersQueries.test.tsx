/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getProjectTeam } from '../../../services/teamService';
import { useGetProjectTeam } from '../useTeamMembersQueries';

vi.mock('../../../services/teamService', () => ({
  getProjectTeam: vi.fn(),
}));

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useGetProjectTeam', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a getProjectTeam con el projectId correcto y devolver los datos', async () => {
    const mockTeam = [
      { _id: 'user-1', name: 'Ana', email: 'ana@test.com' },
      { _id: 'user-2', name: 'Carlos', email: 'carlos@test.com' },
    ];
    vi.mocked(getProjectTeam).mockResolvedValue(mockTeam as any);
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useGetProjectTeam({ projectId: 'proj-1' }), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getProjectTeam).toHaveBeenCalledWith('proj-1');
    expect(result.current.data).toEqual(mockTeam);
  });

  it('debe usar una queryKey distinta por cada projectId (evita colisión de cache entre proyectos)', async () => {
    vi.mocked(getProjectTeam).mockResolvedValue([] as any);
    const queryClient = new QueryClient();

    renderHook(() => useGetProjectTeam({ projectId: 'proj-A' }), {
      wrapper: createWrapper(queryClient),
    });
    renderHook(() => useGetProjectTeam({ projectId: 'proj-B' }), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(getProjectTeam).toHaveBeenCalledTimes(2));

    // Confirma que ambas queries están cacheadas de forma independiente
    expect(queryClient.getQueryData(['projectTeam', 'proj-A'])).toEqual([]);
    expect(queryClient.getQueryData(['projectTeam', 'proj-B'])).toEqual([]);
  });

  it('NO debe reintentar automáticamente si la petición falla (retry: false)', async () => {
    vi.mocked(getProjectTeam).mockRejectedValue(new Error('Proyecto no encontrado'));
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useGetProjectTeam({ projectId: 'proj-1' }), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // Con retry: false, getProjectTeam solo se llama UNA vez, sin reintentos automáticos
    expect(getProjectTeam).toHaveBeenCalledTimes(1);
  });
});