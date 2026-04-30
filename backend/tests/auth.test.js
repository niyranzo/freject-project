import request from 'supertest';
import app from '../src/app.js';

describe('Auth API', () => {

  const userData = {
    name: 'Nicole',
    email: 'nicole@test.com',
    password: '123456'
  };

  // -------------------------
  // REGISTER
  // -------------------------

  it('debería registrar un usuario correctamente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBeDefined();
  });

  it('no debería permitir email duplicado', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(res.statusCode).toBe(400);
  });

  // -------------------------
  // LOGIN
  // -------------------------

  it('debería loguear usuario correctamente', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    console.log('LOGIN RESPONSE:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('no debería loguear con contraseña incorrecta', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
  });

  it('no debería loguear usuario inexistente', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'fake@test.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(404);
  });

});