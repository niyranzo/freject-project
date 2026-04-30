// routes/project.routes.js
import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, getProjects);
router.get('/:id', authMiddleware, getProject);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;