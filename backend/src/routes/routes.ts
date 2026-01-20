import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.get('/', getAllRoutes);
router.get('/:id', getRouteById);

// Admin routes (protected)
router.post(
  '/',
  authenticate,
  validate([
    body('name').notEmpty().withMessage('Route name is required'),
  ]),
  createRoute
);
router.put(
  '/:id',
  authenticate,
  validate([
    body('name').optional().notEmpty().withMessage('Route name cannot be empty'),
  ]),
  updateRoute
);
router.delete('/:id', authenticate, deleteRoute);

export default router;
