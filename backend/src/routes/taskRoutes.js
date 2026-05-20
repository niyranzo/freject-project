// routes/task.routes.js
import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByProject
} from '../controllers/taskController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTask);
router.get('/project/:projectId', authMiddleware, getTasksByProject);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;