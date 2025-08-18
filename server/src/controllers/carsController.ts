import { Request, Response, Router } from 'express';

import {
  multiUploadMiddleware,
  readOnlyMiddleware,
  sensitiveMiddleware
} from '../middlewares/middlewareGroups';
import { create, deleteById, getAll, getById, getFiltered, update } from '../services/carService';
import { cloudinaryDelete, cloudinaryUpload } from '../services/cloudinaryService';
import {
  asyncHandler,
  AuthenticatedRequest,
  checkOwnership,
  createError,
} from '../utils/controllerHelpers';
import { addTimestampToFiles, validateFiles } from '../utils/uploadConfig';

const carsController = Router();

// Get cars with optional filtering and pagination
carsController.get('/',
  ...readOnlyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    // Return all cars if no query parameters
    if (Object.keys(req.query).length === 0) {
      const { count, cars } = await getAll();
      const pagesCount = Math.ceil(count / 5);
      return res.status(200).json({ pagesCount, cars });
    }

    // Filter cars based on query parameters
    const {
      manufacturer, model, gearbox, city, fuelType,
      fromPrice = 1, toPrice = 99999999999,
      year, fromHp = 1, toHp = 5000,
      fromKm = 0, toKm = 99999999999, page = 1
    } = req.query;

    // Type cast query parameters to strings
    const manufacturerStr = manufacturer as string;
    const modelStr = model as string;
    const gearboxStr = gearbox as string;
    const cityStr = city as string;
    const fuelTypeStr = fuelType as string;

    const { count, cars } = await getFiltered(
      manufacturerStr, modelStr, Number(fromPrice), Number(toPrice),
      Number(year) || undefined, gearboxStr, cityStr, fuelTypeStr,
      Number(fromHp), Number(toHp), Number(fromKm), Number(toKm), Number(page)
    );

    const pagesCount = Math.ceil(count / 5);
    return res.status(200).json({ pagesCount, cars });
  })
);

// Get car by ID
carsController.get('/:id',
  ...readOnlyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const car = await getById(req.params.id);

    if (!car) {
      throw createError('Car not found', 404);
    }

    res.status(200).json(car);
  })
);

// Create new car listing
carsController.post('/',
  ...multiUploadMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw createError('At least one image is required', 400);
    }

    // Validate file contents
    const { valid: validFiles, invalid: invalidFiles } = validateFiles(files);

    if (invalidFiles.length > 0) {
      throw createError(`Invalid files detected: ${invalidFiles.join(', ')}`, 400);
    }

    if (validFiles.length === 0) {
      throw createError('No valid files provided', 400);
    }

    addTimestampToFiles(validFiles);

    const uploadResults = await cloudinaryUpload(validFiles, req.user!._id);
    const cloudinaryResults = Array.isArray(uploadResults) ? uploadResults : [uploadResults];

    const carData = {
      ...req.body,
      price: Number(req.body.price),
      year: Number(req.body.year),
      horsePower: Number(req.body.horsePower),
      kilometers: Number(req.body.kilometers),
      imagesNames: cloudinaryResults.map(result => result.public_id.replace('cars/', '')),
      _ownerId: req.user!._id
    };

    const car = await create(carData);
    res.status(201).json(car);
  })
);

// Update car listing
carsController.put('/:id',
  ...multiUploadMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const car = await getById(req.params.id);

    if (!car) {
      throw createError('Car not found', 404);
    }

    checkOwnership(req.user!._id, car._ownerId);

    const files = req.files as Express.Multer.File[] || [];

    let newImageNames: string[] = [];
    if (files.length > 0) {
      // Validate file contents if new files are uploaded
      const { valid: validFiles, invalid: invalidFiles } = validateFiles(files);

      if (invalidFiles.length > 0) {
        throw createError(`Invalid files detected: ${invalidFiles.join(', ')}`, 400);
      }

      addTimestampToFiles(validFiles);
      const uploadResults = await cloudinaryUpload(validFiles, req.user!._id);
      const cloudinaryResults = Array.isArray(uploadResults) ? uploadResults : [uploadResults];
      newImageNames = cloudinaryResults.map(result => result.public_id.replace('cars/', ''));
    }

    // Handle image deletion
    const imagesToDelete = car!.imagesNames.filter(image =>
      !req.body.imagesNames || !req.body.imagesNames.includes(image)
    );

    if (imagesToDelete.length > 0) {
      await cloudinaryDelete(imagesToDelete);
    }

    const updatedData = {
      ...req.body,
      price: Number(req.body.price),
      year: Number(req.body.year),
      horsePower: Number(req.body.horsePower),
      kilometers: Number(req.body.kilometers),
      imagesNames: [
        ...(Array.isArray(req.body.imagesNames) ? req.body.imagesNames :
          req.body.imagesNames ? [req.body.imagesNames] : []),
        ...newImageNames
      ]
    };

    const updatedCar = await update(req.params.id, updatedData);
    res.status(200).json(updatedCar);
  })
);

// Delete car listing
carsController.delete('/',
  ...sensitiveMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const car = await getById(req.body.id);

    if (!car) {
      throw createError('Car not found', 404);
    }

    checkOwnership(req.user!._id, car._ownerId);

    await cloudinaryDelete(car.imagesNames);
    await deleteById(req.body.id);

    res.status(200).json({ message: 'Car deleted successfully' });
  })
);



export default carsController;