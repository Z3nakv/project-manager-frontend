/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpGet, httpPost, httpPut, httpDelete } from '../../lib/http';
import { createProject, deleteProject, getAllProjects, getEditProjectById, getProjectHeaderById, getTaskList, updateProject } from '../ProjectService';

vi.mock('../../lib/http', () => ({
  httpGet: vi.fn(),
  httpPost: vi.fn(),
  httpPut: vi.fn(),
  httpDelete: vi.fn(),
}));

const mockUser = { _id: 'user-1', name: 'Adrian', avatarUrl: 'https://image.com/avatar.png' };
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

  describe('getProjectHeaderById', () => {
  it('debe devolver el header del proyecto validado', async () => {
    const mockProjectHeader = {
      projectName: 'Proyecto A',
      clientName: 'Cliente A',
      description: 'Desc A',
    };
    mockedHttpGet.mockResolvedValue(mockProjectHeader);

    const result = await getProjectHeaderById({ projectId: 'proj-1' });

    expect(mockedHttpGet).toHaveBeenCalledWith('/projects/proj-1');
    expect(result).toEqual(mockProjectHeader);
  });

  it('debe lanzar error si falta un campo requerido', async () => {
    mockedHttpGet.mockResolvedValue({
      projectName: 'Proyecto A',
      clientName: 'Cliente A',
      // sin description
    });

    await expect(getProjectHeaderById({ projectId: 'proj-1' })).rejects.toThrow(
      'Los datos de "getProjectHeaderById" no tienen el formato esperado.'
    );
  });
  });

  describe('getTaskList', () => {
  it('debe devolver manager y tasks validados', async () => {
    const mockData = {
      manager: {
        _id: 'user-1',
        name: 'Manager Uno',
        avatarUrl: null,
      },
      tasks: [
        {
          _id: 'task-1',
          name: 'Tarea',
          description: 'Desc',
          status: 'pending',
          createdAt: '2026-07-27T00:00:00.000Z',
          deadline: null,
        },
      ],
    };
    mockedHttpGet.mockResolvedValue(mockData);

    const result = await getTaskList({ projectId: 'proj-1' });

    expect(mockedHttpGet).toHaveBeenCalledWith('/projects/proj-1/tasks');
    expect(result).toEqual(mockData);
  });

  it('debe lanzar error si falta el manager', async () => {
    mockedHttpGet.mockResolvedValue({
      tasks: [],
      // sin manager
    });

    await expect(getTaskList({ projectId: 'proj-1' })).rejects.toThrow(
      'Los datos de "getTaskList" no tienen el formato esperado.'
    );
  });

  it('debe lanzar error si una task tiene un status inválido', async () => {
    mockedHttpGet.mockResolvedValue({
      manager: { _id: 'user-1', name: 'Manager Uno' },
      tasks: [
        {
          _id: 'task-1',
          name: 'Tarea',
          description: 'Desc',
          status: 'invalid-status', // no está en el enum
          createdAt: '2026-07-27T00:00:00.000Z',
          deadline: null,
        },
      ],
    });

    await expect(getTaskList({ projectId: 'proj-1' })).rejects.toThrow(
      'Los datos de "getTaskList" no tienen el formato esperado.'
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