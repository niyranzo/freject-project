// routes/cost.routes.js
import { Router } from 'express';
import {
  getCosts,
  getCost,
  createCost,
  updateCost,
  deleteCost
} from '../controllers/cost.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getCosts);
router.get('/:id', authMiddleware, getCost);
router.post('/', authMiddleware, createCost);
router.put('/:id', authMiddleware, updateCost);
router.delete('/:id', authMiddleware, deleteCost);

export default router;