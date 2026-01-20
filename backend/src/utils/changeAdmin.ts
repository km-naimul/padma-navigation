import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import User from '../models/User';

dotenv.config();

/**
 * Script to change admin username and password
 * Usage: npm run change:admin
 * Or: ts-node src/utils/changeAdmin.ts
 * 
 * You can modify the values below or pass them as command line arguments
 */

const changeAdmin = async (): Promise<void> => {
  try {
    await connectDatabase();

    // Get values from command line arguments or use defaults
    const args = process.argv.slice(2);
    const email = args[0] || 'admin@padmanavigation.com';
    const newUsername = args[1] || undefined; // Optional: only change if provided
    const newPassword = args[2] || undefined; // Optional: only change if provided

    // Find existing admin
    const admin = await User.findOne({ email });
    
    if (!admin) {
      console.error(`Admin user with email ${email} not found!`);
      process.exit(1);
    }

    console.log('Current admin details:');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Username: ${admin.username}`);
    console.log(`  Role: ${admin.role}`);
    console.log('');

    let changes = false;

    // Update username if provided
    if (newUsername && newUsername.trim() !== '') {
      if (newUsername.length < 3) {
        console.error('Username must be at least 3 characters long!');
        process.exit(1);
      }
      
      // Check if username already exists
      const existingUser = await User.findOne({ username: newUsername.trim() });
      if (existingUser && existingUser._id.toString() !== admin._id.toString()) {
        console.error(`Username "${newUsername}" is already taken!`);
        process.exit(1);
      }
      
      admin.username = newUsername.trim();
      changes = true;
      console.log(`✓ Username will be changed to: ${newUsername.trim()}`);
    }

    // Update password if provided
    if (newPassword && newPassword.trim() !== '') {
      if (newPassword.length < 6) {
        console.error('Password must be at least 6 characters long!');
        process.exit(1);
      }
      
      admin.password = newPassword.trim();
      admin.markModified('password'); // Ensure password is hashed
      changes = true;
      console.log(`✓ Password will be changed`);
    }

    if (!changes) {
      console.log('No changes specified. Usage:');
      console.log('  npm run change:admin [email] [newUsername] [newPassword]');
      console.log('  Example: npm run change:admin admin@padmanavigation.com newadmin newpassword123');
      console.log('');
      console.log('Or modify the default values in src/utils/changeAdmin.ts');
      process.exit(0);
    }

    // Save changes
    await admin.save();

    console.log('');
    console.log('✓ Admin details updated successfully!');
    console.log('');
    console.log('Updated admin details:');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Username: ${admin.username}`);
    console.log(`  Role: ${admin.role}`);
    if (newPassword) {
      console.log(`  Password: ${newPassword} (hashed)`);
    }

    process.exit(0);
  } catch (error: any) {
    console.error('Error changing admin:', error.message);
    if (error.code === 11000) {
      console.error('Duplicate key error - username or email already exists!');
    }
    process.exit(1);
  }
};

changeAdmin();
