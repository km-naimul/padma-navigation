import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import User from '../models/User';

dotenv.config();

const seedAdmin = async (): Promise<void> => {
  try {
    await connectDatabase();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@padmanavigation.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@padmanavigation.com',
      password: 'admin123', // Change this in production
      role: 'superadmin',
    });

    console.log('Admin user created successfully:');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: admin123`);
    console.log('Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
