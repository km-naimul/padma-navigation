import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
} from '../controllers/policyController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.get('/', getAllPolicies);
router.get('/:id', getPolicyById);

// Admin routes (protected)
router.post(
  '/',
  authenticate,
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ]),
  createPolicy
);
router.put(
  '/:id',
  authenticate,
  validate([
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  ]),
  updatePolicy
);
router.delete('/:id', authenticate, deletePolicy);

export default router;
