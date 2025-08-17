import { Request, Response, Router } from 'express';

import { authMiddleware, loginMiddleware, registerMiddleware, refreshTokenMiddleware } from '../middlewares/middlewareGroups';
import { login, logout, refreshUserTokens, register } from '../services/userService';
import { asyncHandler, createError } from '../utils/controllerHelpers';

const authController = Router();

authController.post('/register',
  ...registerMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password, repass } = req.body;
    const user = await register(username, password, repass);
    res.status(200).json(user);
  })
);

authController.post('/login',
  ...loginMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await login(username, password);
    res.status(200).json(user);
  })
);

authController.post('/logout',
  ...authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers['authorization'] as string;
    if (token) {
      await logout(token);
      return res.status(200).json({ message: 'Logged out successfully' });
    }

    throw createError('No authorization token was provided', 401);
  })
);

authController.post('/refresh',
  ...refreshTokenMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = await refreshUserTokens(refreshToken);
    res.status(200).json(tokens);
  })
);


export default authController;