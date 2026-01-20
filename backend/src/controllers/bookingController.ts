import { Response } from 'express';
import Booking from '../models/Booking';
import { AuthRequest } from '../middleware/auth';

export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      count: bookings.length,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch booking information',
    });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Booking information not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch booking information',
    });
  }
};

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({
      status: 'success',
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create booking information',
    });
  }
};

export const updateBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Booking information not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to update booking information',
    });
  }
};

export const deleteBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Booking information not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Booking information deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete booking information',
    });
  }
};
