/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateProfile, changePassword } from '../profileService';
import { httpPost, httpPut } from '../../lib/http';

vi.mock('../../lib/http', () => ({
  httpPost: vi.fn(),
  httpPut: vi.fn(),
}));

describe('profileService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('updateProfile', () => {
    it('debe llamar a httpPut con la URL y datos correctos, y devolver el mensaje', async () => {
      vi.mocked(httpPut).mockResolvedValue({ message: 'Perfil actualizado correctamente' });

      const formData = { name: 'Adrian Rivarola', email: 'adrian@test.com' } as any;
      const result = await updateProfile(formData);

      expect(httpPut).toHaveBeenCalledWith('/auth/profile', formData);
      expect(result).toBe('Perfil actualizado correctamente');
    });

    it('debe propagar el error normalizado si la petición falla', async () => {
      vi.mocked(httpPut).mockRejectedValue(new Error('El email ya está registrado'));

      await expect(updateProfile({} as any)).rejects.toThrow('El email ya está registrado');
    });
  });

  describe('changePassword', () => {
    it('debe llamar a httpPost con la URL y datos correctos, y devolver el mensaje', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'El password se modifico correctamente' });

      const formData = {
        current_password: 'viejo123',
        password: 'nuevo456',
      } as any;
      const result = await changePassword(formData);

      expect(httpPost).toHaveBeenCalledWith('/auth/update-password', formData);
      expect(result).toBe('El password se modifico correctamente');
    });

    it('debe propagar el error normalizado si el password actual es incorrecto', async () => {
      vi.mocked(httpPost).mockRejectedValue(new Error('El password actual es incorrecto!'));

      await expect(changePassword({} as any)).rejects.toThrow(
        'El password actual es incorrecto!'
      );
    });
  });
});