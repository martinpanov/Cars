import { NextFunction, Request, Response } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export function createRateLimit(options: {
  windowMs: number;
  max: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}) {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later.',
    keyGenerator = (req: Request) => req.ip || 'unknown'
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();

    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      };
      return next();
    }

    store[key].count++;

    if (store[key].count > max) {
      return res.status(429).json({
        error: message,
        retryAfter: Math.ceil((store[key].resetTime - now) / 1000)
      });
    }

    next();
  };
}

// Specific rate limiter for upload endpoints
export const uploadRateLimit = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // limit each IP to 100 upload requests per windowMs
  message: 'Too many upload attempts. Please try again later.',
  keyGenerator: (req: Request) => {
    // Rate limit by IP and user ID if authenticated
    const userKey = (req as any).user?._id || 'anonymous';
    return `${req.ip || 'unknown'}_${userKey}`;
  }
});


// Authentication rate limiting - stricter to prevent brute force attacks
export const authRateLimit = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // limit each IP to 30 login/register attempts per windowMs
  message: 'Too many authentication attempts. Please try again later.',
  keyGenerator: (req: Request) => {
    return `auth_${req.ip || 'unknown'}`;
  }
});

// General API rate limiting
export const apiRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests. Please try again later.',
  keyGenerator: (req: Request) => {
    return `api_${req.ip || 'unknown'}`;
  }
});

// Read-only endpoints (GET requests) - more lenient
export const readOnlyRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 GET requests per minute
  message: 'Too many requests. Please slow down.',
  keyGenerator: (req: Request) => {
    return `readonly_${req.ip || 'unknown'}`;
  }
});

// Write operations (POST, PUT) - more restrictive
export const writeRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 write requests per minute
  message: 'Too many write operations. Please slow down.',
  keyGenerator: (req: Request) => {
    const userKey = (req as any).user?._id || 'anonymous';
    return `write_${req.ip || 'unknown'}_${userKey}`;
  }
});

// Sensitive operations (DELETE)
export const sensitiveRateLimit = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each user to 5 sensitive operations per 5 minutes
  message: 'Too many sensitive operations. Please wait before trying again.',
  keyGenerator: (req: Request) => {
    const userKey = (req as any).user?._id || req.ip || 'unknown';
    return `sensitive_${userKey}`;
  }
});

