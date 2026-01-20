import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllGhats,
  getGhatById,
  createGhat,
  updateGhat,
  deleteGhat,
} from '../controllers/ghatController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.get('/', getAllGhats);
router.get('/:id', getGhatById);

// Admin routes (protected)
router.post(
  '/',
  authenticate,
  validate([
    body('name').notEmpty().withMessage('Ghat name is required'),
    body('location').notEmpty().withMessage('Location is required'),
  ]),
  createGhat
);
router.put(
  '/:id',
  authenticate,
  validate([
    body('name').optional().notEmpty().withMessage('Ghat name cannot be empty'),
    body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  ]),
  updateGhat
);
router.delete('/:id', authenticate, deleteGhat);

export default router;
