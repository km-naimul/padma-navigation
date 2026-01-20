import { Response } from 'express';
import { validationResult } from 'express-validator';
import Launch from '../models/Launch';
import { AuthRequest } from '../middleware/auth';
import { isValidObjectId } from '../utils/helpers';
import path from 'path';

export const getAllLaunches = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, facility } = req.query;
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    const launches = await Launch.find(filter)
      .populate('routeIds', 'name')
      .sort({ createdAt: -1 });

    // Filter by facility if provided
    let filteredLaunches = launches;
    if (facility) {
      filteredLaunches = launches.filter((launch) =>
        launch.facilities.includes(facility as string)
      );
    }

    res.status(200).json({
      status: 'success',
      count: filteredLaunches.length,
      data: filteredLaunches,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch launches',
    });
  }
};

export const getLaunchById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid launch ID',
      });
      return;
    }

    const launch = await Launch.findById(id).populate('routeIds', 'name');

    if (!launch) {
      res.status(404).json({
        status: 'error',
        message: 'Launch not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: launch,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch launch',
    });
  }
};

export const createLaunch = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const launch = await Launch.create(req.body);

    res.status(201).json({
      status: 'success',
      data: launch,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create launch',
    });
  }
};

export const updateLaunch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid launch ID',
      });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const launch = await Launch.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!launch) {
      res.status(404).json({
        status: 'error',
        message: 'Launch not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: launch,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update launch',
    });
  }
};

export const deleteLaunch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid launch ID',
      });
      return;
    }

    const launch = await Launch.findByIdAndDelete(id);

    if (!launch) {
      res.status(404).json({
        status: 'error',
        message: 'Launch not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Launch deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete launch',
    });
  }
};

export const uploadLaunchImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid launch ID',
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        status: 'error',
        message: 'No image file provided',
      });
      return;
    }

    const imageUrl = `/uploads/images/${req.file.filename}`;

    const launch = await Launch.findByIdAndUpdate(
      id,
      { imageUrl },
      { new: true, runValidators: true }
    );

    if (!launch) {
      res.status(404).json({
        status: 'error',
        message: 'Launch not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: launch,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to upload image',
    });
  }
};
