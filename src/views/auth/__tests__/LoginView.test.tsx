// src/views/auth/__tests__/LoginView.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import LoginView from '../LoginView';
import {
  useAuthenticateUserMutation,
  useGoogleAuthMutation,
} from '../../../hooks/mutations/useAuthMutation';

vi.mock('../../../hooks/mutations/useAuthMutation', () => ({
  useAuthenticateUserMutation: vi.fn(),
  useGoogleAuthMutation: vi.fn(),
}));

vi.mock('@react-oauth/google', () => ({
  useGoogleLogin: () => vi.fn(),
}));

function renderLoginView() {
  return render(
    <MemoryRouter>
      <LoginView />
    </MemoryRouter>
  );
}

describe('LoginView', () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthenticateUserMutation).mockReturnValue({
      mutate: mockMutate,
    } as unknown as ReturnType<typeof useAuthenticateUserMutation>);
    vi.mocked(useGoogleAuthMutation).mockReturnValue({
      authenticateWithGoogle: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useGoogleAuthMutation>);
  });

  it('debe renderizar los campos de email y password', () => {
    renderLoginView();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('debe mostrar errores de validación si se envía el formulario vacío', async () => {
    const user = userEvent.setup();
    renderLoginView();

    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText('El email es obligatorio')).toBeInTheDocument();
    expect(await screen.findByText('El password es obligatorio')).toBeInTheDocument();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('debe mostrar error de formato si el email es inválido', async () => {
    const user = userEvent.setup();
    renderLoginView();

    await user.type(screen.getByLabelText(/email/i), 'no-es-un-email');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText('Email no válido')).toBeInTheDocument();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('debe llamar a mutate con los datos correctos si el formulario es válido', async () => {
    const user = userEvent.setup();
    renderLoginView();

    await user.type(screen.getByLabelText(/email/i), 'adrian@test.com');
    await user.type(screen.getByLabelText(/password/i), 'miPassword123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(mockMutate).toHaveBeenCalledWith({
      email: 'adrian@test.com',
      password: 'miPassword123',
    });
  });

  it('debe renderizar el link a "olvidaste tu password" con la ruta correcta', () => {
    renderLoginView();

    const link = screen.getByRole('link', { name: /olvidaste tu password/i });
    expect(link).toHaveAttribute('href', '/auth/forgot-password');
  });

  it('debe renderizar el link a registro con la ruta correcta', () => {
    renderLoginView();

    const link = screen.getByRole('link', { name: /crear una cuenta/i });
    expect(link).toHaveAttribute('href', '/auth/register');
  });
});