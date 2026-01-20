import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllManagement,
  getManagementById,
  createManagement,
  updateManagement,
  deleteManagement,
} from '../controllers/managementController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Admin routes (all protected)
router.get('/', authenticate, getAllManagement);
router.get('/:id', authenticate, getManagementById);
router.post(
  '/',
  authenticate,
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ]),
  createManagement
);
router.put(
  '/:id',
  authenticate,
  validate([
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('position').optional().notEmpty().withMessage('Position cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  ]),
  updateManagement
);
router.delete('/:id', authenticate, deleteManagement);

export default router;
