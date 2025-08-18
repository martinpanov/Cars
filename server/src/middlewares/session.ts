import { NextFunction, Request, Response } from 'express';

import { parseToken } from '../services/userService';

type AuthenticatedRequest = Request & {
  user?: {
    _id: string;
    username: string;
  };
  token?: string;
};

export default () => (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const token = req.headers['authorization'] as string;

  if (token) {
    try {
      const payload = parseToken(token);
      req.user = {
        _id: payload._id,
        username: payload.username
      };
      req.token = token;
    } catch (error) {
      // Don't return 401 here - let route-specific middleware handle authentication requirements
      // This allows public endpoints to work even with invalid tokens
      delete req.user;
      delete req.token;
    }
  }

  return next();
};