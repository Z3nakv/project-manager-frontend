/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { AxiosError } from 'axios';
import { ApiError, normalizeApiError } from '../http';


describe('normalizeApiError', () => {
  it('debe devolver el mismo ApiError si ya lo es (evita doble-wrapping)', () => {
    const original = new ApiError('Error original', 404);

    const result = normalizeApiError(original);

    expect(result).toBe(original); // misma referencia, no una copia
    expect(result.message).toBe('Error original');
    expect(result.status).toBe(404);
  });

  it('debe extraer el mensaje desde response.data.error si es un AxiosError', () => {
    const axiosError = new AxiosError('Request failed with status code 409');
    axiosError.response = {
      data: { error: 'El usuario ya está registrado' },
      status: 409,
      statusText: 'Conflict',
      headers: {},
      config: {} as any,
    };

    const result = normalizeApiError(axiosError);

    expect(result).toBeInstanceOf(ApiError);
    expect(result.message).toBe('El usuario ya está registrado');
    expect(result.status).toBe(409);
  });

  it('debe usar response.data.message si no existe response.data.error', () => {
    const axiosError = new AxiosError('fail');
    axiosError.response = {
      data: { message: 'Mensaje alternativo del backend' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: {} as any,
    };

    const result = normalizeApiError(axiosError);

    expect(result.message).toBe('Mensaje alternativo del backend');
  });

  it('debe usar el fallback si el AxiosError no tiene response (ej. error de red)', () => {
    const axiosError = new AxiosError('Network Error');
    // sin .response — simula timeout / sin conexión

    const result = normalizeApiError(axiosError, 'Sin conexión al servidor');

    // Como axiosError.message existe ("Network Error"), gana antes que el fallback
    expect(result.message).toBe('Network Error');
  });

  it('debe usar el fallback si el AxiosError no tiene response NI message', () => {
    const axiosError = new AxiosError('');
    axiosError.message = ''; // vacío, para forzar el fallback

    const result = normalizeApiError(axiosError, 'Sin conexión al servidor');

    expect(result.message).toBe('Sin conexión al servidor');
  });

  it('debe envolver un Error genérico (no Axios) preservando su mensaje', () => {
    const genericError = new Error('Algo explotó en el código');

    const result = normalizeApiError(genericError);

    expect(result).toBeInstanceOf(ApiError);
    expect(result.message).toBe('Algo explotó en el código');
    expect(result.status).toBeUndefined();
    expect(result.cause).toBe(genericError);
  });

  it('debe usar el fallback para valores completamente inesperados (string, null, etc.)', () => {
    const result1 = normalizeApiError('un string cualquiera', 'Fallback personalizado');
    const result2 = normalizeApiError(null, 'Fallback personalizado');
    const result3 = normalizeApiError(undefined, 'Fallback personalizado');

    expect(result1.message).toBe('Fallback personalizado');
    expect(result2.message).toBe('Fallback personalizado');
    expect(result3.message).toBe('Fallback personalizado');
  });

  it('debe usar el mensaje de fallback por defecto si no se especifica uno', () => {
    const result = normalizeApiError({ algo: 'raro' });

    expect(result.message).toBe('Ocurrió un error inesperado');
  });
});