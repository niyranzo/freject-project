import request from 'supertest';
import app from '../src/app.js';

describe('Projects API', () => {
  let token;

  const userData = {
    name: 'Nicole',
    email: 'nicoleprojects@test.com',
    password: '123456'
  };

  beforeAll(async () => {
    // registrar usuario
    await request(app)
      .post('/api/auth/register')
      .send(userData);

    // login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    token = loginRes.body.token;
  });

  it('no debería dejar entrar sin token', async () => {
    const res = await request(app)
      .get('/api/projects');

    expect(res.statusCode).toBe(401);
  });

  it('debería crear un proyecto', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_client: 1,
        name: 'Proyecto Test',
        price: 500
      });

    console.log(res.statusCode, res.body);

    expect(res.statusCode).toBe(201);
  });
  it('debería listar proyectos del usuario', async () => {
    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});