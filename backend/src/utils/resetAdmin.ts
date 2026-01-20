import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import User from '../models/User';

dotenv.config();

const resetAdmin = async (): Promise<void> => {
  try {
    await connectDatabase();

    // Find existing admin
    const admin = await User.findOne({ email: 'admin@padmanavigation.com' });
    
    if (admin) {
      // Reset password - mark as modified to trigger pre-save hook
      admin.password = 'admin123';
      admin.markModified('password');
      await admin.save();
      console.log('Admin password reset successfully');
      console.log('Email: admin@padmanavigation.com');
      console.log('Password: admin123');
    } else {
      // Create new admin
      const newAdmin = await User.create({
        username: 'admin',
        email: 'admin@padmanavigation.com',
        password: 'admin123',
        role: 'superadmin',
      });
      console.log('Admin user created successfully');
      console.log('Email: admin@padmanavigation.com');
      console.log('Password: admin123');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin();
