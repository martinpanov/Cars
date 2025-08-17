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


/**
 * Middleware group configurations for documentation and monitoring
 */
export const MIDDLEWARE_GROUPS = {
  auth: {
    name: 'Authentication',
    description: 'Rate limited authentication endpoints',
    middlewares: ['authRateLimit', 'strictAuthRateLimit']
  },
  guestOnly: {
    name: 'Guest Only',
    description: 'Authentication endpoints for non-logged-in users',
    middlewares: ['authRateLimit', 'strictAuthRateLimit', 'isGuest']
  },
  readOnly: {
    name: 'Read Only',
    description: 'Public read-only endpoints',
    middlewares: ['readOnlyRateLimit']
  },
  authenticatedReadOnly: {
    name: 'Authenticated Read Only',
    description: 'User-specific read-only endpoints',
    middlewares: ['hasUser', 'readOnlyRateLimit']
  },
  write: {
    name: 'Write Operations',
    description: 'Authenticated write operations with security validation',
    middlewares: ['validateOrigin', 'validateCSRF', 'hasUser', 'writeRateLimit']
  },
  sensitive: {
    name: 'Sensitive Operations',
    description: 'High-security operations like deletions',
    middlewares: ['validateOrigin', 'validateCSRF', 'hasUser', 'sensitiveRateLimit']
  },
  singleUpload: {
    name: 'Single File Upload',
    description: 'Single file upload with full security stack',
    middlewares: ['validateOrigin', 'validateCSRF', 'hasUser', 'sensitiveRateLimit', 'uploadRateLimit', 'singleImageUpload']
  },
  multiUpload: {
    name: 'Multiple File Upload',
    description: 'Multiple file upload with full security stack',
    middlewares: ['validateOrigin', 'validateCSRF', 'hasUser', 'writeRateLimit', 'uploadRateLimit', 'strictUploadRateLimit', 'imageUpload']
  },
  updateUpload: {
    name: 'Update File Upload',
    description: 'File upload for updates',
    middlewares: ['validateOrigin', 'validateCSRF', 'hasUser', 'writeRateLimit', 'uploadRateLimit', 'imageUpload']
  }
};