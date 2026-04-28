import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//importar rutas
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import costRoutes from './routes/costRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/costs', costRoutes);
app.use('/api/requests', requestRoutes);

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// IMPORTAR RUTAS
app.use('/api/auth', authRoutes);

// RUTA TEST
app.get('/', (req, res) => {
  res.json({
    message: '🚀 FREJECT API funcionando correctamente'
  });
});

export default app;