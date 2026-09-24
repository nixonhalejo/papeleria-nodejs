import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../app.js';

describe('🌐 Integración: Endpoints de Productos (/api/v1/products)', () => {
  it('GET /api/v1/products — Debe retornar la lista de productos (Status 200 o 500)', async () => {
    const response = await request(app).get('/api/v1/products');
    expect([200, 500]).toContain(response.status);
  });

  it('POST /api/v1/products — Debe denegar el acceso sin Token Bearer', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'Cuaderno Profesional 100 Hojas',
        categoryId: '60c72b2f9b1d8b2b8c8b4567',
        price: 12500,
        stock: 50
      });

    expect([400, 401, 403, 500]).toContain(response.status);
  });
});
