import request from 'supertest';
import app from '../src/app.js';

describe('Clients API', () => {
  let token;
  let clientId;

  const userData = {
    name: 'Nicole',
    email: 'clients@test.com',
    company: 'Company Test',
  };

  it('debería crear cliente', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Test',
        email: 'cliente@test.com',
        phone: '123456789'
      });

    clientId = res.body.id;

    expect(res.statusCode).toBe(201);
  });

  it('debería listar clientes', async () => {
    const res = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería editar cliente', async () => {
    const res = await request(app)
      .put(`/api/clients/${clientId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Editado'
      });

    expect(res.statusCode).toBe(200);
  });

  it('debería borrar cliente', async () => {
    const res = await request(app)
      .delete(`/api/clients/${clientId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});