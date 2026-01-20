import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, getMe, changePassword, updateProfile } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  login
);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);
router.post(
  '/change-password',
  authenticate,
  validate([
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ]),
  changePassword
);
router.put(
  '/profile',
  authenticate,
  validate([
    body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  ]),
  updateProfile
);

export default router;
