import { Router } from 'express';
import launchRoutes from './launches';
import routeRoutes from './routes';
import ghatRoutes from './ghats';
import bookingRoutes from './bookings';
import managementRoutes from './management';
import policyRoutes from './policies';
import authRoutes from './auth';
import { authenticate } from '../middleware/auth';
import {
  getAllLaunches,
  getLaunchById,
  createLaunch,
  updateLaunch,
  deleteLaunch,
  uploadLaunchImage,
} from '../controllers/launchController';
import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController';
import {
  getAllGhats,
  getGhatById,
  createGhat,
  updateGhat,
  deleteGhat,
} from '../controllers/ghatController';
import { upload } from '../middleware/upload';
import { body } from 'express-validator';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.use('/launches', launchRoutes);
router.use('/routes', routeRoutes);
router.use('/ghats', ghatRoutes);
router.use('/bookings', bookingRoutes);
router.use('/management', managementRoutes);
router.use('/policies', policyRoutes);
router.use('/auth', authRoutes);

// Admin routes (protected)
const adminRouter = Router();

// Admin launches
adminRouter.post(
  '/launches',
  authenticate,
  validate([
    body('name').notEmpty().withMessage('Launch name is required'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('contactNumber').notEmpty().withMessage('Contact number is required'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  ]),
  createLaunch
);
adminRouter.put(
  '/launches/:id',
  authenticate,
  validate([
    body('name').optional().notEmpty().withMessage('Launch name cannot be empty'),
    body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  ]),
  updateLaunch
);
adminRouter.delete('/launches/:id', authenticate, deleteLaunch);
adminRouter.post('/launches/:id/upload', authenticate, upload.single('image'), uploadLaunchImage);

// Admin routes
adminRouter.post(
  '/routes',
  authenticate,
  validate([body('name').notEmpty().withMessage('Route name is required')]),
  createRoute
);
adminRouter.put(
  '/routes/:id',
  authenticate,
  validate([body('name').optional().notEmpty().withMessage('Route name cannot be empty')]),
  updateRoute
);
adminRouter.delete('/routes/:id', authenticate, deleteRoute);

// Admin ghats
adminRouter.post(
  '/ghats',
  authenticate,
  validate([
    body('name').notEmpty().withMessage('Ghat name is required'),
    body('location').notEmpty().withMessage('Location is required'),
  ]),
  createGhat
);
adminRouter.put(
  '/ghats/:id',
  authenticate,
  validate([
    body('name').optional().notEmpty().withMessage('Ghat name cannot be empty'),
    body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  ]),
  updateGhat
);
adminRouter.delete('/ghats/:id', authenticate, deleteGhat);

// Admin bookings, management, and policies are handled in their respective route files
// They use authenticate middleware in their route definitions

router.use('/admin', adminRouter);

export default router;

export default router;
