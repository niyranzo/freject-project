// routes/request.routes.js
import { Router } from 'express';
import {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest
} from '../controllers/request.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getRequests);
router.get('/:id', authMiddleware, getRequest);
router.post('/', authMiddleware, createRequest);
router.put('/:id', authMiddleware, updateRequest);
router.delete('/:id', authMiddleware, deleteRequest);

export default router;