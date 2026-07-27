/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createAccount,
  confirmAccount,
  requestConfirmationCode,
  authenticateUser,
  forgotPassword,
  validateToken,
  updatePasswordWithToken,
  getUser,
  checkPassword,
  googleAuth,
} from '../authService';
import { httpGet, httpPost } from '../../lib/http';

vi.mock('../../lib/http', () => ({
  httpGet: vi.fn(),
  httpPost: vi.fn(),
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('createAccount', () => {
    it('debe devolver el mensaje al crear la cuenta', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Cuenta creada!, Revisa tu email' });

      const result = await createAccount({ email: 'a@a.com', password: '123456' } as any);

      expect(httpPost).toHaveBeenCalledWith('/auth/create-account', {
        email: 'a@a.com',
        password: '123456',
      });
      expect(result).toBe('Cuenta creada!, Revisa tu email');
    });
  });

  describe('confirmAccount', () => {
    it('debe devolver el mensaje al confirmar la cuenta', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Cuenta confirmada correctamente' });

      const result = await confirmAccount({ token: '123456' });

      expect(httpPost).toHaveBeenCalledWith('/auth/confirm-account', { token: '123456' });
      expect(result).toBe('Cuenta confirmada correctamente');
    });
  });

  describe('requestConfirmationCode', () => {
    it('debe devolver el mensaje al solicitar un nuevo código', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Se envio un nuevo token' });

      const result = await requestConfirmationCode({ email: 'a@a.com' } as any);

      expect(httpPost).toHaveBeenCalledWith('/auth/request-code', { email: 'a@a.com' });
      expect(result).toBe('Se envio un nuevo token');
    });
  });

  describe('authenticateUser', () => {
    it('debe guardar el token en localStorage y devolverlo', async () => {
      vi.mocked(httpPost).mockResolvedValue('jwt-token-real');

      const result = await authenticateUser({ email: 'a@a.com', password: '123' } as any);

      expect(httpPost).toHaveBeenCalledWith('/auth/login', { email: 'a@a.com', password: '123' });
      expect(localStorage.getItem('AUTH_TOKEN_JWT')).toBe('jwt-token-real');
      expect(result).toBe('jwt-token-real');
    });
  });

  describe('forgotPassword', () => {
    it('debe devolver el mensaje al solicitar recuperación', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Revisa tu email para instrucciones' });

      const result = await forgotPassword({ email: 'a@a.com' } as any);

      expect(httpPost).toHaveBeenCalledWith('/auth/forgot-password', { email: 'a@a.com' });
      expect(result).toBe('Revisa tu email para instrucciones');
    });
  });

  describe('validateToken', () => {
    it('debe devolver el mensaje al validar el token', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Token valido, Define tu nuevo password' });

      const result = await validateToken({ token: '654321' });

      expect(httpPost).toHaveBeenCalledWith('/auth/validate-token', { token: '654321' });
      expect(result).toBe('Token valido, Define tu nuevo password');
    });
  });

  describe('updatePasswordWithToken', () => {
    it('debe llamar a la URL con el token en el path y devolver el mensaje', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'El password se modifico correctamente' });

      const result = await updatePasswordWithToken({
        formData: { password: 'nuevoPassword123' } as any,
        token: 'token-en-la-url',
      });

      expect(httpPost).toHaveBeenCalledWith('/auth/update-password/token-en-la-url', {
        password: 'nuevoPassword123',
      });
      expect(result).toBe('El password se modifico correctamente');
    });
  });

  describe('getUser', () => {
    it('debe devolver el usuario validado (bug corregido — antes no retornaba nada)', async () => {
      const mockUser = { _id: 'user-1', name: 'Adrian', email: 'adrian@test.com' };
      vi.mocked(httpGet).mockResolvedValue(mockUser);

      const result = await getUser();

      expect(httpGet).toHaveBeenCalledWith('/auth/user');
      // Antes del fix, "result" era undefined sin importar la respuesta real
      expect(result).toEqual(mockUser);
    });

    it('debe lanzar error si la forma del usuario no coincide con el schema', async () => {
      vi.mocked(httpGet).mockResolvedValue({ _id: 'user-1' }); // sin name/email

      await expect(getUser()).rejects.toThrow(
        'Los datos de "getUser" no tienen el formato esperado.'
      );
    });
  });

  describe('checkPassword', () => {
    it('debe devolver el mensaje al verificar el password', async () => {
      vi.mocked(httpPost).mockResolvedValue({ message: 'Password Correcto' });

      const result = await checkPassword({ password: '123456' } as any);

      expect(httpPost).toHaveBeenCalledWith('/auth/check-password', { password: '123456' });
      expect(result).toBe('Password Correcto');
    });
  });

  describe('googleAuth', () => {
    it('debe devolver user y token tal como los envía el backend', async () => {
      const mockResponse = {
        user: { _id: 'user-1', name: 'Adrian', email: 'adrian@test.com' },
        token: 'google-jwt-token',
      };
      vi.mocked(httpPost).mockResolvedValue(mockResponse);

      const result = await googleAuth('google-access-token');

      expect(httpPost).toHaveBeenCalledWith('/auth/google', { token: 'google-access-token' });
      expect(result).toEqual(mockResponse);
    });
  });
});