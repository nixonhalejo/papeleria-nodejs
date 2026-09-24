import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, generateAccessToken } from '../../utils/jwt.js';

describe('🧪 Unitaria: Utilidades de Seguridad (JWT & Bcrypt)', () => {
  it('Debe encriptar una contraseña y verificarla exitosamente', async () => {
    const passwordPlana = 'Papeleria2026!';
    const hash = await hashPassword(passwordPlana);

    expect(hash).toBeDefined();
    expect(hash).not.toBe(passwordPlana);

    const coincide = await comparePassword(passwordPlana, hash);
    expect(coincide).toBe(true);
  });

  it('Debe rechazar una contraseña incorrecta en la comparación', async () => {
    const hash = await hashPassword('Papeleria2026!');
    const coincide = await comparePassword('PasswordIncorrecta', hash);

    expect(coincide).toBe(false);
  });

  it('Debe generar un Access Token JWT válido con 3 secciones', () => {
    const payload = { userId: 'mongo_id_123', role: 'ADMIN' as const };
    const token = generateAccessToken(payload);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });
});
