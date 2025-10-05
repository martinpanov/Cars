import { RequestHandler } from 'express';

import { imageUpload, singleImageUpload } from '../utils/uploadConfig';
import { hasUser, isGuest } from './guards';
import { validateOrigin } from './originValidator';
import {
  loginValidationRules,
  registerValidationRules,
  refreshTokenValidationRules,
  carValidationRules
} from './validation';
import { handleValidationErrors, catchMulterErrors } from './validationHandler';
import {
  apiRateLimit,
  authRateLimit,
  readOnlyRateLimit,
  sensitiveRateLimit,
  uploadRateLimit,
  writeRateLimit
} from './rateLimiter';

/**
 * Middleware groups for different types of endpoints
 * This reduces code repetition and makes endpoint configuration cleaner
 */

// Authentication endpoints (login, register, logout, refresh)
export const authMiddleware: RequestHandler[] = [
  apiRateLimit,
  authRateLimit
];

// Login endpoint with validation
export const loginMiddleware: RequestHandler[] = [
  ...authMiddleware,
  isGuest(),
  ...loginValidationRules,
  handleValidationErrors
];

// Register endpoint with validation
export const registerMiddleware: RequestHandler[] = [
  ...authMiddleware,
  isGuest(),
  ...registerValidationRules,
  handleValidationErrors
];

// Refresh token endpoint with validation
export const refreshTokenMiddleware: RequestHandler[] = [
  ...authMiddleware,
  ...refreshTokenValidationRules,
  handleValidationErrors
];

// Guest-only endpoints (registration, login)
export const guestOnlyMiddleware: RequestHandler[] = [
  ...authMiddleware,
  isGuest()
];

// Read-only endpoints (GET requests)
export const readOnlyMiddleware: RequestHandler[] = [
  apiRateLimit,
  readOnlyRateLimit
];

// Authenticated read-only endpoints
export const authenticatedReadOnlyMiddleware: RequestHandler[] = [
  hasUser(),
  ...readOnlyMiddleware
];

// Write operations (POST, PUT, PATCH)
export const writeMiddleware: RequestHandler[] = [
  apiRateLimit,
  writeRateLimit,
  validateOrigin(),
  hasUser()
];

// Sensitive operations (DELETE)
export const sensitiveMiddleware: RequestHandler[] = [
  apiRateLimit,
  sensitiveRateLimit,
  validateOrigin(),
  hasUser()
];

// File upload operations (single image)
export const singleUploadMiddleware: RequestHandler[] = [
  apiRateLimit,
  uploadRateLimit,
  validateOrigin(),
  hasUser(),
  singleImageUpload.single('image')
];

// File upload operations (multiple images) for cars (create/update)
export const multiUploadMiddleware: RequestHandler[] = [
  apiRateLimit,
  writeRateLimit,
  uploadRateLimit,
  validateOrigin(),
  hasUser(),
  catchMulterErrors(imageUpload.array('images', 12)),
  ...carValidationRules,
  handleValidationErrors
];