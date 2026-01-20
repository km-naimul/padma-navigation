import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllLaunches,
  getLaunchById,
  createLaunch,
  updateLaunch,
  deleteLaunch,
  uploadLaunchImage,
} from '../controllers/launchController';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.get('/', getAllLaunches);
router.get('/:id', getLaunchById);

// Admin routes (protected)
router.post(
  '/',
  authenticate,
  validate([
    body('name').notEmpty().withMessage('Launch name is required'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('contactNumber').notEmpty().withMessage('Contact number is required'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  ]),
  createLaunch
);
router.put(
  '/:id',
  authenticate,
  validate([
    body('name').optional().notEmpty().withMessage('Launch name cannot be empty'),
    body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  ]),
  updateLaunch
);
router.delete('/:id', authenticate, deleteLaunch);
router.post('/:id/upload', authenticate, upload.single('image'), uploadLaunchImage);

export default router;
