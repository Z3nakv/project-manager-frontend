/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { addUserToProject, findUserByEmail, removeUserFromProject } from '../../../services/teamService';
import { socket } from '../../../lib/socket';
import { useAddUserToProjectMutation, useFindUserByEmailMutation, useRemoveUserFromProjectMutation } from '../useTeamMembersMutation';

vi.mock('../../../services/teamService', () => ({
  findUserByEmail: vi.fn(),
  addUserToProject: vi.fn(),
  removeUserFromProject: vi.fn(),
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

describe('useTeamMutations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useFindUserByEmailMutation', () => {
    it('debe guardar el usuario encontrado en la cache con la key correcta', async () => {
      const foundUser = { _id: 'user-1', email: 'buscado@test.com', name: 'Buscado' };
      vi.mocked(findUserByEmail).mockResolvedValue(foundUser as any);
      const { wrapper, queryClient } = createWrapper();
      const setQueryDataSpy = vi.spyOn(queryClient, 'setQueryData');

      const { result } = renderHook(() => useFindUserByEmailMutation(), { wrapper });

      result.current.mutate({ email: 'buscado@test.com' } as any);

      await waitFor(() => expect(setQueryDataSpy).toHaveBeenCalled());
      expect(setQueryDataSpy).toHaveBeenCalledWith(['user', 'buscado@test.com'], foundUser);
    });

    it('NO debe lanzar error si findUserByEmail falla (sin onError definido)', async () => {
      vi.mocked(findUserByEmail).mockRejectedValue(new Error('Usuario No Encontrado'));
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useFindUserByEmailMutation(), { wrapper });

      result.current.mutate({ email: 'noexiste@test.com' } as any);

      await waitFor(() => expect(result.current.isError).toBe(true));
      // Este hook no tiene onError propio, así que ningún toast debería dispararse acá;
      // el manejo del error queda a cargo de quien consuma el hook (ej. mostrar el error inline)
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  describe('useAddUserToProjectMutation', () => {
    const user = { _id: 'user-1', name: 'Nuevo Colaborador' } as any;

    it('debe emitir el socket, resetear el form, navegar e invalidar las queries correctas', async () => {
      vi.mocked(addUserToProject).mockResolvedValue({ message: 'Usuario agregado correctamente' } as any);
      const mockReset = vi.fn();
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(
        () => useAddUserToProjectMutation({ user, reset: mockReset, projectId: 'proj-1' }),
        { wrapper }
      );

      result.current.mutate({ _id: user._id } as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Usuario agregado correctamente'));

      expect(socket.emit).toHaveBeenCalledWith(
        'member_added',
        expect.objectContaining({ userId: 'user-1' })
      );
      expect(mockReset).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalled();
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projects'] });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projectTeam', 'proj-1'] });
    });

    it('debe mostrar toast de error y NO ejecutar los efectos de éxito si falla', async () => {
      vi.mocked(addUserToProject).mockRejectedValue(new Error('El usuario ya existe en el proyecto'));
      const mockReset = vi.fn();
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useAddUserToProjectMutation({ user, reset: mockReset, projectId: 'proj-1' }),
        { wrapper }
      );

      result.current.mutate({ _id: user._id } as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('El usuario ya existe en el proyecto'));
      expect(mockReset).not.toHaveBeenCalled();
      expect(socket.emit).not.toHaveBeenCalled();
    });
  });

  describe('useRemoveUserFromProjectMutation', () => {
    it('debe emitir el socket con manager y colaborador, e invalidar las 3 queries relacionadas', async () => {
      vi.mocked(removeUserFromProject).mockResolvedValue({
        message: 'Usuario eliminado correctamente',
        manager: 'Adrian',
        colaborador: 'user-2',
      } as any);
      const { wrapper, queryClient } = createWrapper();
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(
        () => useRemoveUserFromProjectMutation({ projectId: 'proj-1' }),
        { wrapper }
      );

      result.current.mutate('user-2' as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Usuario eliminado correctamente'));

      expect(socket.emit).toHaveBeenCalledWith(
        'member_removed',
        expect.objectContaining({
          message: expect.stringContaining('Adrian'),
          userId: 'user-2',
        })
      );
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projects'] });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projectTeam', 'proj-1'] });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['project', 'proj-1'] });
    });

    it('debe mostrar toast de error si falla la eliminación', async () => {
      vi.mocked(removeUserFromProject).mockRejectedValue(new Error('El usuario no existe en el proyecto'));
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useRemoveUserFromProjectMutation({ projectId: 'proj-1' }),
        { wrapper }
      );

      result.current.mutate('user-999' as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('El usuario no existe en el proyecto'));
      expect(socket.emit).not.toHaveBeenCalled();
    });
  });
});