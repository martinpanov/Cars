import { body, ValidationChain } from 'express-validator';

/**
 * Car validation rules that match frontend schemas
 */

// Common car field validations
export const carValidationRules: ValidationChain[] = [
  body('manufacturer')
    .trim()
    .notEmpty()
    .withMessage('Manufacturer is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Manufacturer must be between 2 and 50 characters long'),

  body('model')
    .trim()
    .notEmpty()
    .withMessage('Model is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Model must be between 1 and 50 characters long'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
    .toFloat(),

  body('year')
    .notEmpty()
    .withMessage('Year is required')
    .isInt({ min: 1886, max: new Date().getFullYear() })
    .withMessage(`Year must be between 1886 and ${new Date().getFullYear()}`)
    .toInt(),

  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[0-9\s\-()]{7,15}$/)
    .withMessage('Phone number must be between 7 and 15 characters long and can include digits, spaces, dashes, and parentheses'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('gearbox')
    .trim()
    .notEmpty()
    .withMessage('Gearbox is required')
    .isIn(['Manual', 'Automatic'])
    .withMessage('Gearbox must be either Manual or Automatic'),

  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters long'),

  body('fuelType')
    .trim()
    .notEmpty()
    .withMessage('Fuel type is required')
    .isIn(['Petrol', 'Diesel'])
    .withMessage('Fuel type must be either Petrol or Diesel'),

  body('horsePower')
    .notEmpty()
    .withMessage('Horse power is required')
    .isFloat({ min: 0 })
    .withMessage('Horsepower must be a positive number')
    .toFloat(),

  body('kilometers')
    .notEmpty()
    .withMessage('Kilometers is required')
    .isFloat({ min: 0 })
    .withMessage('Kilometers must be a positive number')
    .toFloat()
];

// Auth validation rules
export const loginValidationRules: ValidationChain[] = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 2 and 30 characters long'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const registerValidationRules: ValidationChain[] = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 2 and 30 characters long')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be between 6 and 100 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  body('repass')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

export const refreshTokenValidationRules: ValidationChain[] = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
];