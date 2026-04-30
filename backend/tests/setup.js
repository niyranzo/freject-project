process.env.NODE_ENV = 'test';

import { sequelize } from '../src/config/db.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});