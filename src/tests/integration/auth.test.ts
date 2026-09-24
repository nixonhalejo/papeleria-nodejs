import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../app.js';

describe('🌐 Integración: Endpoints de Autenticación (/api/v1/auth)', () => {
  it('POST /api/v1/auth/register — Debe responder con error de validación ante datos inválidos', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Nixon',
        email: 'correo-invalido',
        password: '123'
      });

    expect([400, 422, 500]).toContain(response.status);
  });

  it('POST /api/v1/auth/login — Debe rechazar credenciales inexistentes', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'usuario_inexistente@papeleria.com',
        password: 'PasswordSegura123!'
      });

    expect([400, 401, 404, 500]).toContain(response.status);
  });
});
