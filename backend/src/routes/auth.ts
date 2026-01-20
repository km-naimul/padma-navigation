import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, getMe } from '../controllers/authController';
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

export default router;
