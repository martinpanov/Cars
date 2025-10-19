import { NextFunction, Request, Response } from 'express';

const ALLOWED_ORIGINS = [
  'http://localhost:5173', // Vite dev server
  'http://localhost:3000', // Alternative dev port
  process.env.DEV_CLIENT_URL, // Dev client URL
  process.env.PROD_CLIENT_URL // Prod client URL
].filter(Boolean); // Remove undefined values

const ALLOWED_USER_AGENTS = [
  // Common browsers - you can make this more specific
  /Mozilla\/5\.0.*Chrome/,
  /Mozilla\/5\.0.*Firefox/,
  /Mozilla\/5\.0.*Safari/,
  /Mozilla\/5\.0.*Edge/
];

export function validateOrigin() {
  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.get('Origin') || req.get('Referer');
    const userAgent = req.get('User-Agent') || '';

    // Allow healthcheck requests from localhost (Docker internal checks)
    const isHealthCheck = req.hostname === 'localhost' && /wget/i.test(userAgent);
    if (isHealthCheck) {
      return next();
    }

    // Check origin (for CORS requests)
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return res.status(403).json({
        error: 'Request from unauthorized origin',
        code: 'FORBIDDEN_ORIGIN'
      });
    }

    // Check User-Agent to block common programmatic requests
    const isValidUserAgent = ALLOWED_USER_AGENTS.some(pattern =>
      pattern.test(userAgent)
    );

    if (!isValidUserAgent) {
      return res.status(403).json({
        error: 'Invalid user agent',
        code: 'INVALID_USER_AGENT'
      });
    }

    // Check for common bot/automation indicators
    const suspiciousPatterns = [
      /curl/i,
      /wget/i,
      /postman/i,
      /insomnia/i,
      /python-requests/i,
      /axios/i,
      /node-fetch/i
    ];

    const isSuspicious = suspiciousPatterns.some(pattern =>
      pattern.test(userAgent)
    );

    if (isSuspicious) {
      return res.status(403).json({
        error: 'Automated requests not allowed',
        code: 'AUTOMATED_REQUEST_BLOCKED'
      });
    }

    return next();
  };
}