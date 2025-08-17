import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { MulterError } from 'multer';

/**
 * Unified validation error handler that combines multer and express-validator errors
 * Handles both file upload errors and form validation errors in one response
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const allErrors: Record<string, string> = {};

  // Handle express-validator errors using mapped() for cleaner access
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    Object.keys(mappedErrors).forEach(field => {
      allErrors[field] = mappedErrors[field].msg;
    });
  }

  // Handle multer file validation errors (if any were stored in req)
  if ((req as any).fileValidationError) {
    allErrors.images = (req as any).fileValidationError;
  }

  // If we have any errors, return them all together
  if (Object.keys(allErrors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: allErrors
    });
  }

  return next();
};

/**
 * Wrapper around multer middleware that catches errors and stores them
 * instead of immediately returning error responses
 */
export const catchMulterErrors = (multerMiddleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    multerMiddleware(req, res, (err: any) => {
      if (err instanceof MulterError) {
        let errorMessage: string;

        switch (err.code) {
          case 'LIMIT_FILE_COUNT':
            errorMessage = 'You can upload 12 images at most';
            break;
          case 'LIMIT_FILE_SIZE':
            errorMessage = 'Each image must be less than 10MB';
            break;
          case 'LIMIT_UNEXPECTED_FILE':
            errorMessage = 'Only JPG, PNG, or WebP images are allowed';
            break;
          default:
            errorMessage = 'File upload error occurred';
        }

        // Store the error instead of throwing it
        (req as any).fileValidationError = errorMessage;
        return next(); // Continue to form validation
      }

      // If no error or non-multer error, continue normally
      next(err);
    });
  };
};

