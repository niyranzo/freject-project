// routes/client.routes.js
import { Router } from 'express';
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getClientByProject
} from '../controllers/clientController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, getClients);
router.get('/:id', authMiddleware, getClient);
router.get('/project/:projectId', authMiddleware, getClientByProject);
router.post('/', authMiddleware, createClient);
router.put('/:id', authMiddleware, updateClient);
router.delete('/:id', authMiddleware, deleteClient);

export default router;