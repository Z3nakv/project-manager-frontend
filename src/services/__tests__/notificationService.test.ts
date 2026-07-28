/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNotifications, markAsRead, clearAll } from '../notificationService';
import { httpGet, httpPut, httpDelete } from '../../lib/http';

vi.mock('../../lib/http', () => ({
  httpGet: vi.fn(),
  httpPut: vi.fn(),
  httpDelete: vi.fn(),
}));

const mockUser = { _id: 'user-1' };

function buildMockNotification(overrides = {}) {
  return {
    _id: 'notif-1',
    content: 'Adrian creó la tarea "Diseño de login"',
    createdAt: '2026-07-27T00:00:00.000Z',
    updatedAt: '2026-07-27T00:00:00.000Z',
    project: { _id: 'proj-1' },
    task: { _id: 'task-1' },
    triggeredBy: { _id: 'user-2', name: 'Adrian', email: 'adrian@test.com' },
    user: mockUser,
    type: 'task_created',
    read: false,
    ...overrides,
  };
}

describe('notificationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getNotifications', () => {
    it('debe devolver las notificaciones validadas', async () => {
      const mockNotifications = [buildMockNotification()];
      vi.mocked(httpGet).mockResolvedValue(mockNotifications);

      const result = await getNotifications();

      expect(httpGet).toHaveBeenCalledWith('/notifications');
      expect(result).toEqual(mockNotifications);
    });

    it('debe aceptar project y task como null (bug corregido — antes fallaba silenciosamente)', async () => {
      const mockNotifications = [buildMockNotification({ project: null, task: null })];
      vi.mocked(httpGet).mockResolvedValue(mockNotifications);

      const result = await getNotifications();

      expect(result).toEqual(mockNotifications);
    });

    it('debe lanzar un error explícito si la forma no coincide (bug corregido — antes devolvía undefined)', async () => {
      vi.mocked(httpGet).mockResolvedValue([{ _id: 'notif-1' }]); // forma incompleta

      // Antes del fix, esto devolvía `undefined` en silencio en vez de lanzar
      await expect(getNotifications()).rejects.toThrow(
        'Los datos de "getNotifications" no tienen el formato esperado.'
      );
    });

    it('debe lanzar error si "type" no es uno de los valores válidos del enum', async () => {
      const mockNotifications = [buildMockNotification({ type: 'tipo_invalido' })];
      vi.mocked(httpGet).mockResolvedValue(mockNotifications);

      await expect(getNotifications()).rejects.toThrow(
        'Los datos de "getNotifications" no tienen el formato esperado.'
      );
    });
  });

  describe('markAsRead', () => {
    it('debe devolver el mensaje al marcar como leída', async () => {
      vi.mocked(httpPut).mockResolvedValue({ message: 'Notificación leída' });

      const result = await markAsRead('notif-1');

      expect(httpPut).toHaveBeenCalledWith('/notifications/notif-1/read');
      expect(result).toBe('Notificación leída');
    });
  });

  describe('clearAll', () => {
    it('debe devolver el mensaje al limpiar todas las notificaciones', async () => {
      vi.mocked(httpDelete).mockResolvedValue({ message: 'Notificaciones eliminadas' });

      const result = await clearAll();

      expect(httpDelete).toHaveBeenCalledWith('/notifications');
      expect(result).toBe('Notificaciones eliminadas');
    });
  });
});