// src/components/ui/__tests__/ButtonLink.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ArrowLeftIcon, UsersIcon } from '@heroicons/react/20/solid';
import ButtonLink from '../ButtonLink';

describe('ButtonLink', () => {
  it('debe renderizar como un link con el href correcto', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/dashboard" icon={ArrowLeftIcon}>
          Volver
        </ButtonLink>
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /volver/i });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('debe renderizar el ícono junto al contenido', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/dashboard" icon={ArrowLeftIcon}>
          Volver
        </ButtonLink>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Volver')).toBeInTheDocument();
  });

  it('debe aplicar la clase "w-full" cuando to es exactamente "team" (bug potencial a vigilar)', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="team" icon={UsersIcon}>
          Colaboradores
        </ButtonLink>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link.className).toContain('w-full');
  });

  it('NO debe aplicar "w-full" para otras rutas', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/dashboard" icon={ArrowLeftIcon}>
          Volver
        </ButtonLink>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link.className).not.toContain('w-full');
  });
});