import { Sequelize } from 'sequelize';

export default async function () {
  const adminDb = new Sequelize(
    'postgres',
    'admin',
    'admin',
    {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      logging: false
    }
  );

  try {
    await adminDb.authenticate();

    await adminDb.query(`
      SELECT 'CREATE DATABASE freject_test_db'
      WHERE NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'freject_test_db'
      )
    `);

    console.log('✅ Base de datos de test lista');

  } catch (error) {
    console.error('❌ Error creando test DB:', error);
  } finally {
    await adminDb.close();
  }
}