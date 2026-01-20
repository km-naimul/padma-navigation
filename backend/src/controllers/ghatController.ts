import { Response } from 'express';
import { validationResult } from 'express-validator';
import Ghat from '../models/Ghat';
import { AuthRequest } from '../middleware/auth';
import { isValidObjectId } from '../utils/helpers';

export const getAllGhats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { location } = req.query;
    const filter: any = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const ghats = await Ghat.find(filter).sort({ name: 1 });

    res.status(200).json({
      status: 'success',
      count: ghats.length,
      data: ghats,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch ghats',
    });
  }
};

export const getGhatById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid ghat ID',
      });
      return;
    }

    const ghat = await Ghat.findById(id);

    if (!ghat) {
      res.status(404).json({
        status: 'error',
        message: 'Ghat not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: ghat,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch ghat',
    });
  }
};

export const createGhat = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const ghat = await Ghat.create(req.body);

    res.status(201).json({
      status: 'success',
      data: ghat,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create ghat',
    });
  }
};

export const updateGhat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid ghat ID',
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

    const ghat = await Ghat.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!ghat) {
      res.status(404).json({
        status: 'error',
        message: 'Ghat not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: ghat,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update ghat',
    });
  }
};

export const deleteGhat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid ghat ID',
      });
      return;
    }

    const ghat = await Ghat.findByIdAndDelete(id);

    if (!ghat) {
      res.status(404).json({
        status: 'error',
        message: 'Ghat not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Ghat deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete ghat',
    });
  }
};
