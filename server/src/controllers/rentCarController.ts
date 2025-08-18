import { Request, Response, Router } from 'express';

import { readOnlyMiddleware, writeMiddleware } from '../middlewares/middlewareGroups';
import { getFilteredRentCars, getRentCars, rentCar } from '../services/carService';
import { asyncHandler, AuthenticatedRequest } from '../utils/controllerHelpers';

const rentCarController = Router();

// Get rental cars with optional filtering
rentCarController.get('/',
  ...readOnlyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    // Return all rental cars if no query parameters
    if (Object.keys(req.query).length === 0) {
      const cars = await getRentCars();
      return res.status(200).json(cars);
    }

    // Filter rental cars based on query parameters
    const { seats, doors, gearbox, fuelType, city } = req.query;

    // Type cast query parameters to appropriate types
    const seatsNum = seats ? Number(seats) : undefined;
    const doorsStr = doors as string;
    const gearboxStr = gearbox as string;
    const fuelTypeStr = fuelType as string;
    const cityStr = city as string;

    const cars = await getFilteredRentCars(
      seatsNum,
      doorsStr,
      gearboxStr,
      fuelTypeStr,
      cityStr
    );
    return res.status(200).json(cars);
  })
);

// Rent or return a car
rentCarController.post('/',
  ...writeMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { carId } = req.body;
    const car = await rentCar(carId, req.user!._id);
    res.status(200).json(car);
  })
);


export default rentCarController;