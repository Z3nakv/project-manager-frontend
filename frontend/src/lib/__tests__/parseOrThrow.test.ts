import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { parseOrThrow } from '../parseOrThrow';

const testSchema = z.object({
  name: z.string(),
  age: z.number(),
});

describe('parseOrThrow', () => {
  it('debe devolver los datos parseados si son válidos', () => {
    const validData = { name: 'Adrian', age: 25 };

    const result = parseOrThrow(testSchema, validData, 'testContext');

    expect(result).toEqual(validData);
  });

  it('debe lanzar un error descriptivo con el contexto si los datos son inválidos', () => {
    const invalidData = { name: 'Adrian' }; // falta "age"

    expect(() => parseOrThrow(testSchema, invalidData, 'userProfile')).toThrow(
      'Los datos de "userProfile" no tienen el formato esperado.'
    );
  });

  it('debe loguear los issues de Zod en consola al fallar (para debug)', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidData = { name: 123, age: 'no es un número' };

    expect(() => parseOrThrow(testSchema, invalidData, 'testContext')).toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Zod validation error en testContext:',
      expect.any(Array)
    );

    consoleSpy.mockRestore();
  });

  it('debe rechazar datos completamente ajenos a la forma esperada (null, string, etc.)', () => {
    expect(() => parseOrThrow(testSchema, null, 'ctx')).toThrow();
    expect(() => parseOrThrow(testSchema, 'un string', 'ctx')).toThrow();
    expect(() => parseOrThrow(testSchema, 42, 'ctx')).toThrow();
  });
});