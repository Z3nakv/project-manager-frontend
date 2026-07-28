/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpGet, httpPost, httpPut, httpDelete } from '../../lib/http';
import { createProject, deleteProject, getAllProjects, getEditProjectById, getProjectById, updateProject } from '../ProjectService';

vi.mock('../../lib/http', () => ({
  httpGet: vi.fn(),
  httpPost: vi.fn(),
  httpPut: vi.fn(),
  httpDelete: vi.fn(),
}));

const mockUser = { _id: 'user-1', name: 'Adrian', email: 'adrian@test.com' };
const mockedHttpGet = vi.mocked(httpGet);
const mockedHttpPost = vi.mocked(httpPost);
const mockedHttpPut = vi.mocked(httpPut);
const mockedHttpDelete = vi.mocked(httpDelete)

describe('projectService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
 
  describe('getAllProjects', () => {
    it('debe devolver el listado de proyectos validado', async () => {
      const projectFixture =
        {
          _id: 'proj-1',
          projectName: 'Proyecto A',
          clientName: 'Cliente A',
          description: 'Desc A',
          manager: mockUser,
          team: [mockUser],
          tasks: [{ _id: 'task-1', status: 'pending', deadline: null }],
        }
      mockedHttpGet.mockResolvedValue([projectFixture]);
      const result = await getAllProjects();
      expect(mockedHttpGet).toHaveBeenCalledWith('/projects');
      expect(result).toEqual([projectFixture]);
    });

    it('debe lanzar error si algún proyecto no tiene la forma esperada', async () => {
      mockedHttpGet.mockResolvedValue([{ _id: 'proj-1' }]);
      await expect(getAllProjects()).rejects.toThrow(
        'Los datos de "getAllProjects" no tienen el formato esperado.'
      );
    });
  });

  describe('getProjectById', () => {
    it('debe devolver el proyecto completo validado, con tasks anidadas', async () => {
      const mockProject = {
        _id: 'proj-1',
        projectName: 'Proyecto A',
        clientName: 'Cliente A',
        description: 'Desc A',
        manager: mockUser,
        team: [mockUser],
        tasks: [
          {
            _id: 'task-1',
            name: 'Tarea',
            description: 'Desc',
            status: 'pending',
            completedBy: [],
            project: { team: [{ _id: 'user-1' }], manager: { _id: 'user-1' } },
            createdAt: '2026-07-27T00:00:00.000Z',
            updatedAt: '2026-07-27T00:00:00.000Z',
          },
        ],
      };
      mockedHttpGet.mockResolvedValue(mockProject);
      const result = await getProjectById({ projectId: 'proj-1' });
      expect(mockedHttpGet).toHaveBeenCalledWith('/projects/proj-1');
      expect(result).toEqual(mockProject);
    });

    it('debe lanzar error si falta el manager', async () => {
      vi.mocked(mockedHttpGet).mockResolvedValue({
        _id: 'proj-1',
        projectName: 'Proyecto',
        clientName: 'Cliente',
        description: 'Desc',
        team: [],
        tasks: [],
        // sin manager
      });

      await expect(getProjectById({ projectId: 'proj-1' })).rejects.toThrow(
        'Los datos de "getProjectById" no tienen el formato esperado.'
      );
    });
  });

  describe('getEditProjectById', () => {
    it('debe devolver los datos de edición validados', async () => {
      const mockEditData = {
        projectName: 'Proyecto A',
        clientName: 'Cliente A',
        description: 'Desc A',
        team: [{ _id: 'user-1' }],
      };
      mockedHttpGet.mockResolvedValue(mockEditData);

      const result = await getEditProjectById({ projectId: 'proj-1' });

      expect(mockedHttpGet).toHaveBeenCalledWith('/projects/proj-1/edit');
      expect(result).toEqual(mockEditData);
    });
  });

  describe('createProject', () => {
    it('debe devolver solo el mensaje de la respuesta', async () => {
      mockedHttpPost.mockResolvedValue({ message: 'Proyecto creado correctamente' });

      const result = await createProject({
        formData: { projectName: 'Nuevo', clientName: 'Cliente', description: 'Desc' } as any,
      });

      expect(mockedHttpPost).toHaveBeenCalledWith('/projects/create-project', {
        projectName: 'Nuevo',
        clientName: 'Cliente',
        description: 'Desc',
      });
      expect(result).toBe('Proyecto creado correctamente');
    });
  });

  describe('updateProject', () => {
    it('debe devolver solo el mensaje al actualizar', async () => {
      mockedHttpPut.mockResolvedValue({ message: 'Proyecto Actualizado' });

      const result = await updateProject({
        projectId: 'proj-1',
        formData: { projectName: 'Editado' } as any,
      });

      expect(mockedHttpPut).toHaveBeenCalledWith('/projects/proj-1', { projectName: 'Editado' });
      expect(result).toBe('Proyecto Actualizado');
    });
  });

  describe('deleteProject', () => {
    it('debe devolver solo el mensaje al eliminar', async () => {
      mockedHttpDelete.mockResolvedValue({ message: 'Proyecto Eliminado' });

      const result = await deleteProject('proj-1');

      expect(mockedHttpDelete).toHaveBeenCalledWith('/projects/proj-1');
      expect(result).toBe('Proyecto Eliminado');
    });
  });
});