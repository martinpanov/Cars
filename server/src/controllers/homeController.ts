import { Request, Response, Router } from 'express';

import { readOnlyMiddleware } from '../middlewares/middlewareGroups';
import { getHomeCars } from '../services/carService';
import { asyncHandler } from '../utils/controllerHelpers';

const homeController = Router();

// Get home page data (latest cars)
homeController.get('/',
  ...readOnlyMiddleware,
  asyncHandler(async (_req: Request, res: Response) => {
    const cars = await getHomeCars();
    res.status(200).json(cars);
  })
);


export default homeController;