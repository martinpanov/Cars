import express, { Application, Request, Response } from 'express';

import authController from '../controllers/authController';
import carsController from '../controllers/carsController';
import homeController from '../controllers/homeController';
import profileController from '../controllers/profileController';
import rentCarController from '../controllers/rentCarController';
import cors from '../middlewares/cors';
import session from '../middlewares/session';
import trimBody from '../middlewares/trimBody';
import { handleError } from '../utils/controllerHelpers';

export default (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(trimBody());
  app.use(session());

  app.use('/api', authController);
  app.use('/api', homeController);
  app.use('/api/cars', carsController);
  app.use('/api/rentcar', rentCarController);
  app.use('/api/myprofile', profileController);

  // Global error handler - must be last
  app.use((error: any, _req: Request, res: Response, _next: any) => {
    handleError(res, error, error.status || 500);
  });
};