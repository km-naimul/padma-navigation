import { Response } from 'express';
import Policy from '../models/Policy';
import { AuthRequest } from '../middleware/auth';

export const getAllPolicies = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const policies = await Policy.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({
      status: 'success',
      count: policies.length,
      data: policies,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch policies',
    });
  }
};

export const getPolicyById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      res.status(404).json({
        status: 'error',
        message: 'Policy not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: policy,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch policy',
    });
  }
};

export const createPolicy = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const policy = await Policy.create(req.body);
    res.status(201).json({
      status: 'success',
      data: policy,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create policy',
    });
  }
};

export const updatePolicy = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!policy) {
      res.status(404).json({
        status: 'error',
        message: 'Policy not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: policy,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to update policy',
    });
  }
};

export const deletePolicy = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) {
      res.status(404).json({
        status: 'error',
        message: 'Policy not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Policy deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete policy',
    });
  }
};
