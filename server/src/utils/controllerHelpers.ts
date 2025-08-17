import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import parseError from './parser';

export type AuthenticatedRequest = Request & {
  user?: {
    _id: string;
    username: string;
  };
};

// Async error handler wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Create error with status code
export const createError = (message: string, status: number = 400) => {
  const error = new Error(message);
  (error as any).status = status;
  return error;
};

// Standard error response handler
export const handleError = (res: Response, error: any, statusCode = 400) => {
  if (error.name === 'CastError') {
    error.message = 'Resource not found';
  }

  const message = parseError(error);
  const status = error.status || statusCode;
  res.status(status).json({ message });
};


// Check resource ownership
export const checkOwnership = (userId: string, resourceOwnerId: Types.ObjectId | string = '') => {
  if (userId !== resourceOwnerId.toString()) {
    throw createError('You are not authorized to perform this action', 403);
  }
};

// Validate resource exists
export const validateResource = (resource: any, name = 'Resource') => {
  if (!resource) {
    throw createError(`${name} not found`, 404);
  }
  return resource;
};