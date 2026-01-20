import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Admin routes (all protected)
router.get('/', authenticate, getAllBookings);
router.get('/:id', authenticate, getBookingById);
router.post(
  '/',
  authenticate,
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ]),
  createBooking
);
router.put(
  '/:id',
  authenticate,
  validate([
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  ]),
  updateBooking
);
router.delete('/:id', authenticate, deleteBooking);

export default router;
