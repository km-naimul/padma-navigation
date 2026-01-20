import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { validationResult } from 'express-validator';

// Generate JWT Token
const generateToken = (id: string): string => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign(
    { id },
    config.jwtSecret,
    { expiresIn: config.jwtExpire } as jwt.SignOptions
  );
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { email, password } = req.body;

    // Normalize email (trim and lowercase)
    const normalizedEmail = email?.trim().toLowerCase();

    console.log('Login attempt:', { email: normalizedEmail, passwordLength: password?.length });

    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    
    if (!user) {
      console.log('User not found:', normalizedEmail);
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    console.log('User found:', { id: user._id, email: user.email, username: user.username });

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      console.log('Password mismatch for user:', normalizedEmail);
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    console.log('Login successful for user:', normalizedEmail);

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Login failed',
    });
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Since we're using JWT, logout is handled client-side by removing the token
    // But we can add token blacklisting here if needed
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Logout failed',
    });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to get user info',
    });
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    // Get user with password
    const userWithPassword = await User.findById(user._id).select('+password');
    
    if (!userWithPassword) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    // Verify current password
    const isMatch = await userWithPassword.comparePassword(currentPassword);
    
    if (!isMatch) {
      res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect',
      });
      return;
    }

    // Update password
    userWithPassword.password = newPassword;
    userWithPassword.markModified('password'); // Ensure password is hashed
    await userWithPassword.save();

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to change password',
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { username } = req.body;
    const user = req.user;

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    // Get user
    const userToUpdate = await User.findById(user._id);
    
    if (!userToUpdate) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    // Update username if provided
    if (username && username.trim() !== '') {
      // Check if username already exists
      const existingUser = await User.findOne({ username: username.trim() });
      if (existingUser && existingUser._id.toString() !== userToUpdate._id.toString()) {
        res.status(400).json({
          status: 'error',
          message: 'Username is already taken',
        });
        return;
      }
      
      userToUpdate.username = username.trim();
      await userToUpdate.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      user: {
        id: userToUpdate._id,
        username: userToUpdate.username,
        email: userToUpdate.email,
        role: userToUpdate.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update profile',
    });
  }
};
