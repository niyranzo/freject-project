// routes/cost.routes.js
import { Router } from 'express';
import {
  getCosts,
  getCost,
  createCost,
  updateCost,
  deleteCost
} from '../controllers/costController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, getCosts);
router.get('/:id', authMiddleware, getCost);
router.get('/project/:projectId', authMiddleware, getCosts);
router.post('/', authMiddleware, createCost);
router.put('/:id', authMiddleware, updateCost);
router.delete('/:id', authMiddleware, deleteCost);

export default router;