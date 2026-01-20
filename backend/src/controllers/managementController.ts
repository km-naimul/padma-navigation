import { Response } from 'express';
import Management from '../models/Management';
import { AuthRequest } from '../middleware/auth';

export const getAllManagement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const management = await Management.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({
      status: 'success',
      count: management.length,
      data: management,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch management members',
    });
  }
};

export const getManagementById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const member = await Management.findById(req.params.id);
    if (!member) {
      res.status(404).json({
        status: 'error',
        message: 'Management member not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: member,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch management member',
    });
  }
};

export const createManagement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const member = await Management.create(req.body);
    res.status(201).json({
      status: 'success',
      data: member,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create management member',
    });
  }
};

export const updateManagement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const member = await Management.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      res.status(404).json({
        status: 'error',
        message: 'Management member not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: member,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to update management member',
    });
  }
};

export const deleteManagement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const member = await Management.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404).json({
        status: 'error',
        message: 'Management member not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Management member deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete management member',
    });
  }
};
