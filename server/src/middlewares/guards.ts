import { NextFunction, Request, Response } from 'express';

type AuthenticatedRequest = Request & {
  user?: {
    _id: string;
    username: string;
  };
};

export function hasUser() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Please log in' });
    }
    return next();
  };
}

export function isGuest() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      return res.status(400).json({ message: 'You are already logged in' });
    }
    return next();
  };
}