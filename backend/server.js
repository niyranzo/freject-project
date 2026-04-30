import dotenv from 'dotenv';
import app from './src/app.js';

import { testConnection, initDatabase } from './src/config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Conectar base de datos
    await testConnection();

    // Crear tablas / sincronizar modelos
    await initDatabase();

    // Levantar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();