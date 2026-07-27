/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  findUserByEmail,
  addUserToProject,
  getProjectTeam,
  removeUserFromProject,
} from '../teamService';
import { httpGet, httpPost, httpDelete } from '../../lib/http';

vi.mock('../../lib/http', () => ({
  httpGet: vi.fn(),
  httpPost: vi.fn(),
  httpDelete: vi.fn(),
}));

describe('teamService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findUserByEmail', () => {
    it('debe devolver el usuario validado si la respuesta tiene el formato correcto', async () => {
      vi.mocked(httpPost).mockResolvedValue({
        _id: 'user-1',
        email: 'buscado@test.com',
        name: 'Buscado',
      });

      const result = await findUserByEmail({
        projectId: 'proj-1',
        formData: { email: 'buscado@test.com' } as any,
      });

      expect(httpPost).toHaveBeenCalledWith('/projects/proj-1/team/find', {
        email: 'buscado@test.com',
      });
      expect(result).toEqual({ _id: 'user-1', email: 'buscado@test.com', name: 'Buscado' });
    });

    it('debe lanzar error si la respuesta no coincide con teamMemberSchema', async () => {
      vi.mocked(httpPost).mockResolvedValue({ foo: 'bar' }); // forma inválida

      await expect(
        findUserByEmail({ projectId: 'proj-1', formData: { email: 'x@x.com' } as any })
      ).rejects.toThrow('Los datos de "findUserByEmail" no tienen el formato esperado.');
    });
  });

  describe('addUserToProject', () => {
    it('debe devolver el mensaje validado al agregar un usuario', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Usuario agregado correctamente' });

      const result = await addUserToProject({ projectId: 'proj-1', _id: 'user-1' });

      expect(httpPost).toHaveBeenCalledWith('/projects/proj-1/team', { _id: 'user-1' });
      expect(result).toEqual({ message: 'Usuario agregado correctamente' });
    });

    it('debe lanzar error si falta el campo message', async () => {
      vi.mocked(httpPost).mockResolvedValue({});

      await expect(
        addUserToProject({ projectId: 'proj-1', _id: 'user-1' })
      ).rejects.toThrow('Los datos de "addUserToProject" no tienen el formato esperado.');
    });
  });

  describe('getProjectTeam', () => {
    it('debe devolver el equipo validado', async () => {
      const mockTeam = [
        { _id: 'user-1', name: 'Ana', email: 'ana@test.com' },
        { _id: 'user-2', name: 'Carlos', email: 'carlos@test.com' },
      ];
      vi.mocked(httpGet).mockResolvedValue(mockTeam);

      const result = await getProjectTeam('proj-1');

      expect(httpGet).toHaveBeenCalledWith('/projects/proj-1/team');
      expect(result).toEqual(mockTeam);
    });

    it('debe lanzar error si algún miembro del equipo tiene forma inválida', async () => {
      vi.mocked(httpGet).mockResolvedValue([{ _id: 'user-1' }]); // falta name/email

      await expect(getProjectTeam('proj-1')).rejects.toThrow(
        'Los datos de "getProjectTeam" no tienen el formato esperado.'
      );
    });
  });

  describe('removeUserFromProject', () => {
    it('debe devolver message, manager y colaborador validados', async () => {
      vi.mocked(httpDelete).mockResolvedValue({
        message: 'Usuario eliminado correctamente',
        manager: 'Adrian',
        colaborador: 'user-2',
      });

      const result = await removeUserFromProject({ projectId: 'proj-1', userId: 'user-2' });

      expect(httpDelete).toHaveBeenCalledWith('/projects/proj-1/team/user-2');
      expect(result).toEqual({
        message: 'Usuario eliminado correctamente',
        manager: 'Adrian',
        colaborador: 'user-2',
      });
    });

    it('debe lanzar error si falta alguno de los 3 campos requeridos', async () => {
      vi.mocked(httpDelete).mockResolvedValue({ message: 'Usuario eliminado correctamente' }); // sin manager/colaborador

      await expect(
        removeUserFromProject({ projectId: 'proj-1', userId: 'user-2' })
      ).rejects.toThrow('Los datos de "removeUserFromProject" no tienen el formato esperado.');
    });
  });
});