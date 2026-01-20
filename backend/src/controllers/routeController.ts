import { Response } from 'express';
import { validationResult } from 'express-validator';
import Route from '../models/Route';
import { AuthRequest } from '../middleware/auth';
import { isValidObjectId } from '../utils/helpers';

export const getAllRoutes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const routes = await Route.find()
      .populate('launchIds', 'name status')
      .populate('schedules.launchId', 'name')
      .populate('schedules.ghatIds', 'name location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: routes.length,
      data: routes,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch routes',
    });
  }
};

export const getRouteById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid route ID',
      });
      return;
    }

    const route = await Route.findById(id)
      .populate('launchIds', 'name status')
      .populate('schedules.launchId', 'name')
      .populate('schedules.ghatIds', 'name location');

    if (!route) {
      res.status(404).json({
        status: 'error',
        message: 'Route not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: route,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch route',
    });
  }
};

export const createRoute = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const route = await Route.create(req.body);

    res.status(201).json({
      status: 'success',
      data: route,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create route',
    });
  }
};

export const updateRoute = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid route ID',
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

    const route = await Route.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!route) {
      res.status(404).json({
        status: 'error',
        message: 'Route not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: route,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update route',
    });
  }
};

export const deleteRoute = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid route ID',
      });
      return;
    }

    const route = await Route.findByIdAndDelete(id);

    if (!route) {
      res.status(404).json({
        status: 'error',
        message: 'Route not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Route deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete route',
    });
  }
};
