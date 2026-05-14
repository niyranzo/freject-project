import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";


//importar rutas
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import costRoutes from './routes/costRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

const app = express();
// MIDDLEWARES
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/costs', costRoutes);
app.use('/api/requests', requestRoutes);



// IMPORTAR RUTAS
app.use('/api/auth', authRoutes);

// RUTA TEST
app.get('/', (req, res) => {
  res.json({
    message: '🚀 FREJECT API funcionando correctamente'
  });
});

export default app;