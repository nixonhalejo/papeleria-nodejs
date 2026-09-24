import { describe, it, expect } from 'vitest';
import { AppError } from '../../errors/AppError.js';

describe('🧪 Unitaria: Clase AppError', () => {
  it('Debe instanciar un error con mensaje y statusCode personalizado', () => {
    const error = new AppError('Producto no encontrado', 404);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe('Producto no encontrado');
    expect(error.statusCode).toBe(404);
  });

  it('Debe asignar statusCode 500 por defecto si no se especifica', () => {
    const error = new AppError('Error interno del servidor');

    expect(error.statusCode).toBe(500);
  });
});
