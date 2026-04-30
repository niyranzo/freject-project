import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Elegir archivo correcto
const envFile =
  process.env.NODE_ENV === 'test'
    ? '.env.test'
    : '.env';

// Cargar SOLO uno
dotenv.config({
  path: envFile,
  override: true
});

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión correcta');
    return true;
  } catch (error) {
    console.error('❌ Error conexión:', error);
    throw error;
  }
};

const initDatabase = async () => {
  try {
    await sequelize.sync({
      force: process.env.NODE_ENV === 'test',
      alter: process.env.NODE_ENV !== 'test'
    });

    console.log('✅ Base de datos inicializada');
    return true;
  } catch (error) {
    console.error('❌ Error DB:', error);
    throw error;
  }
};

export {
  sequelize,
  testConnection,
  initDatabase
};