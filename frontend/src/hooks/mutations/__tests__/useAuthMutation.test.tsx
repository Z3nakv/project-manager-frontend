/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  useCreateAccountMutation,
  useAuthenticateUserMutation,
  useForgotPasswordMutation,
  useValidateTokenMutation,
  useUpdatePasswordWithTokenMutation,
  useGoogleAuthMutation,
} from '../useAuthMutation';
import {
  createAccount,
  authenticateUser,
  forgotPassword,
  validateToken,
  updatePasswordWithToken,
  googleAuth,
} from '../../../services/authService';

vi.mock('../../../services/authService', () => ({
  createAccount: vi.fn(),
  confirmAccount: vi.fn(),
  requestConfirmationCode: vi.fn(),
  authenticateUser: vi.fn(),
  forgotPassword: vi.fn(),
  validateToken: vi.fn(),
  updatePasswordWithToken: vi.fn(),
  googleAuth: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
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

describe('useAuthMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('useCreateAccountMutation', () => {
    it('debe mostrar toast y resetear el form al crear la cuenta', async () => {
      vi.mocked(createAccount).mockResolvedValue('Cuenta creada correctamente' as any);
      const mockReset = vi.fn();
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useCreateAccountMutation({ reset: mockReset }), { wrapper });

      result.current.mutate({} as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Cuenta creada correctamente'));
      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it('debe mostrar toast de error y NO resetear el form si falla', async () => {
      vi.mocked(createAccount).mockRejectedValue(new Error('El usuario ya está registrado'));
      const mockReset = vi.fn();
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useCreateAccountMutation({ reset: mockReset }), { wrapper });

      result.current.mutate({} as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('El usuario ya está registrado'));
      expect(mockReset).not.toHaveBeenCalled();
    });
  });

  describe('useAuthenticateUserMutation', () => {
    it('debe limpiar la query de user y navegar al dashboard tras login exitoso', async () => {
      vi.mocked(authenticateUser).mockResolvedValue('jwt-token-falso' as any);
      const { wrapper, queryClient } = createWrapper();
      const removeQueriesSpy = vi.spyOn(queryClient, 'removeQueries');

      const { result } = renderHook(() => useAuthenticateUserMutation(), { wrapper });

      result.current.mutate({ email: 'a@a.com', password: '123' } as any);

      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'));
      expect(removeQueriesSpy).toHaveBeenCalledWith({ queryKey: ['user'] });
    });

    it('debe mostrar toast de error si las credenciales son incorrectas', async () => {
      vi.mocked(authenticateUser).mockRejectedValue(new Error('Password incorrecto'));
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useAuthenticateUserMutation(), { wrapper });

      result.current.mutate({ email: 'a@a.com', password: 'mal' } as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Password incorrecto'));
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('useValidateTokenMutation', () => {
    it('debe llamar a setIsValidToken(true) si el token es válido', async () => {
      vi.mocked(validateToken).mockResolvedValue('Token válido' as any);
      const setIsValidToken = vi.fn();
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useValidateTokenMutation({ setIsValidToken }), { wrapper });

      result.current.mutate('123456' as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Token válido'));
      expect(setIsValidToken).toHaveBeenCalledWith(true);
    });

    it('NO debe llamar a setIsValidToken si el token es inválido', async () => {
      vi.mocked(validateToken).mockRejectedValue(new Error('Token no válido'));
      const setIsValidToken = vi.fn();
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useValidateTokenMutation({ setIsValidToken }), { wrapper });

      result.current.mutate('000000' as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Token no válido'));
      expect(setIsValidToken).not.toHaveBeenCalled();
    });
  });

  describe('useUpdatePasswordWithTokenMutation', () => {
    it('debe navegar a login tras actualizar el password', async () => {
      vi.mocked(updatePasswordWithToken).mockResolvedValue('Password actualizado' as any);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useUpdatePasswordWithTokenMutation(), { wrapper });

      result.current.mutate({} as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Password actualizado'));
      expect(mockNavigate).toHaveBeenCalledWith('/auth/login');
    });
  });

  describe('useForgotPasswordMutation', () => {
    it('debe resetear el form al enviar el email de recuperación', async () => {
      vi.mocked(forgotPassword).mockResolvedValue('Revisa tu email' as any);
      const mockReset = vi.fn();
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useForgotPasswordMutation({ reset: mockReset }), { wrapper });

      result.current.mutate({ email: 'a@a.com' } as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Revisa tu email'));
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });

  describe('useGoogleAuthMutation', () => {
    it('debe guardar el token en localStorage, limpiar user y navegar al dashboard', async () => {
      vi.mocked(googleAuth).mockResolvedValue({ token: 'google-jwt-token', user: {} } as any);
      const { wrapper, queryClient } = createWrapper();
      const removeQueriesSpy = vi.spyOn(queryClient, 'removeQueries');

      const { result } = renderHook(() => useGoogleAuthMutation(), { wrapper });

      result.current.authenticateWithGoogle('google-access-token' as any);

      await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Sesion iniciada correctamente'));
      expect(localStorage.getItem('AUTH_TOKEN_JWT')).toBe('google-jwt-token');
      expect(removeQueriesSpy).toHaveBeenCalledWith({ queryKey: ['user'] });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });

    it('debe mostrar toast de error si falla la autenticación con Google', async () => {
      vi.mocked(googleAuth).mockRejectedValue(new Error('Token de Google inválido'));
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGoogleAuthMutation(), { wrapper });

      result.current.authenticateWithGoogle('token-malo' as any);

      await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Token de Google inválido'));
      expect(localStorage.getItem('AUTH_TOKEN_JWT')).toBeNull();
    });
  });
});