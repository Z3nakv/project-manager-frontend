import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HiSparkles } from 'react-icons/hi2';
import Button from '../Button';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el ícono y el contenido (children)', () => {
    render(
      <Button query="?viewTaskProps=true" icon={HiSparkles}>
        Sugerir tareas con IA
      </Button>
    );

    expect(screen.getByText('Sugerir tareas con IA')).toBeInTheDocument();
    // El ícono se renderiza como SVG; verificamos que el botón contiene un elemento svg
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('debe navegar a pathname + query al hacer click', async () => {
    const user = userEvent.setup();

    render(
      <Button query="?newTask=true" icon={HiSparkles}>
        Agregar Tarea
      </Button>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining('?newTask=true')
    );
  });
});