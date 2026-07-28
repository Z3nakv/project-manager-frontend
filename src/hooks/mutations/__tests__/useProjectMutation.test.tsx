/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from '../useProjectMutations';
import { createProject, deleteProject, updateProject } from '../../../services/ProjectService';
import { socket } from '../../../lib/socket';

vi.mock('../../../services/ProjectService', () => ({
  createProject: vi.fn(),
  updateProject: vi.fn(),
  deleteProject: vi.fn(),
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
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useProjectMutations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useCreateProjectMutation', () => {
    it('debe mostrar toast y navegar al dashboard al crear el proyecto', async () => {
      vi.mocked(createProject).mockResolvedValue('Proyecto creado correctamente' as any);

      const { result } = renderHook(() => useCreateProjectMutation(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ projectName: 'Nuevo' } as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Proyecto creado correctamente'));
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('debe mostrar toast de error si falla la creación', async () => {
      vi.mocked(createProject).mockRejectedValue(new Error('Nombre requerido'));

      const { result } = renderHook(() => useCreateProjectMutation(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({} as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Nombre requerido'));
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('useUpdateProjectMutation', () => {
    const project = {
      projectName: 'Proyecto Editado',
      clientName: 'Cliente',
      description: 'Desc',
      team: [{ _id: 'member-1' }, { _id: 'member-2' }],
    } as any;

    it('debe emitir el socket con el equipo correcto y navegar al éxito', async () => {
      vi.mocked(updateProject).mockResolvedValue('Proyecto Actualizado' as any);
      const navigateMock = vi.fn();

      const { result } = renderHook(
        () => useUpdateProjectMutation({ projectId: 'proj-1', project, navigate: navigateMock }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({} as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Proyecto Actualizado'));
      expect(socket.emit).toHaveBeenCalledWith(
        'project_updated',
        expect.objectContaining({
          team: ['member-1', 'member-2'],
        })
      );
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });

    it('debe mostrar toast de error si falla la actualización', async () => {
      vi.mocked(updateProject).mockRejectedValue(new Error('Sin permisos'));
      const navigateMock = vi.fn();

      const { result } = renderHook(
        () => useUpdateProjectMutation({ projectId: 'proj-1', project, navigate: navigateMock }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({} as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Sin permisos'));
      expect(navigateMock).not.toHaveBeenCalled();
      expect(socket.emit).not.toHaveBeenCalled();
    });
  });

  describe('useDeleteProjectMutation', () => {
    const user = { _id: 'user-1', name: 'Adrian' } as any;
    const project = {
      _id: 'proj-1',
      projectName: 'Proyecto a Eliminar',
      team: [{ _id: 'member-1' }],
    } as any;

    it('debe emitir el socket, invalidar queries y navegar al eliminar', async () => {
      vi.mocked(deleteProject).mockResolvedValue('Proyecto Eliminado' as any);

      const { result } = renderHook(() => useDeleteProjectMutation({ user, project }), {
        wrapper: createWrapper(),
      });

      result.current.mutate('proj-1' as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Proyecto Eliminado'));
      expect(socket.emit).toHaveBeenCalledWith(
        'project_deleted',
        expect.objectContaining({
          message: expect.stringContaining('Adrian'),
          projectId: 'proj-1',
          team: ['member-1'],
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('debe mostrar toast de error si falla la eliminación', async () => {
      vi.mocked(deleteProject).mockRejectedValue(new Error('No autorizado'));

      const { result } = renderHook(() => useDeleteProjectMutation({ user, project }), {
        wrapper: createWrapper(),
      });

      result.current.mutate('proj-1' as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('No autorizado'));
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});