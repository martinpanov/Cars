import { Response, Router } from 'express';

import {
  authenticatedReadOnlyMiddleware,
  singleUploadMiddleware
} from '../middlewares/middlewareGroups';
import { getProfilePicture, getUserCars, getUserRentCars, postProfilePicture } from '../services/carService';
import { cloudinaryDelete, cloudinaryUpload } from '../services/cloudinaryService';
import { getUser } from '../services/userService';
import { asyncHandler, AuthenticatedRequest, createError } from '../utils/controllerHelpers';
import { addTimestampToFiles, validateFileContent } from '../utils/uploadConfig';

const profileController = Router();

// Get user's car listings
profileController.get('/cars',
  ...authenticatedReadOnlyMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const cars = await getUserCars(req.user!._id);
    res.status(200).json(cars);
  })
);

// Get user's rented cars
profileController.get('/rentcars',
  ...authenticatedReadOnlyMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const cars = await getUserRentCars(req.user!._id);
    res.status(200).json(cars);
  })
);

// Get user's profile picture
profileController.get('/picture',
  ...authenticatedReadOnlyMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const profilePicture = await getProfilePicture(req.user!.username);
    res.status(200).json(profilePicture);
  })
);

// Upload/update profile picture
profileController.post('/picture',
  ...singleUploadMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const file = req.file;

    if (!file) {
      throw createError('No image file provided', 400);
    }

    // Validate file content
    if (!validateFileContent(file)) {
      throw createError('Invalid file format or corrupted file', 400);
    }

    const user = await getUser(req.user!.username);

    // Delete old profile picture if exists
    if (user.profilePicture) {
      await cloudinaryDelete(user.profilePicture);
    }

    // Upload new picture
    addTimestampToFiles(file);
    const uploadResult = await cloudinaryUpload(file, req.user!._id);
    const cloudinaryResult = Array.isArray(uploadResult) ? uploadResult[0] : uploadResult;
    const publicId = cloudinaryResult.public_id.replace('cars/', '');

    const profilePicture = await postProfilePicture(req.user!.username, publicId);
    res.status(200).json(profilePicture);
  })
);



export default profileController;