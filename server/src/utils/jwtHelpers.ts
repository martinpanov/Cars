import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

if (!JWT_SECRET || !REFRESH_SECRET) {
  throw new Error("Missing required environment variables: JWT_SECRET, RESFRESH_SECRET");
}

// Token expiration times
const ACCESS_TOKEN_EXPIRY = '1m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '3d'; // 3 days

// In-memory storage for refresh tokens (use Redis in production)
const refreshTokenStore = new Map<string, {
  userId: string;
  tokenFamily: string;
  isValid: boolean;
  expiresAt: Date;
}>();

// Cleanup expired tokens every hour
setInterval(() => {
  const now = new Date();
  for (const [tokenId, data] of refreshTokenStore.entries()) {
    if (data.expiresAt < now) {
      refreshTokenStore.delete(tokenId);
    }
  }
}, 60 * 60 * 1000);

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds until access token expires
};

export type AccessTokenPayload = {
  _id: string;
  username: string;
  type: 'access';
};

export type RefreshTokenPayload = {
  _id: string;
  username: string;
  tokenId: string;
  tokenFamily: string;
  type: 'refresh';
};

export function generateTokenPair(user: IUser): TokenPair {
  const userId = (user._id as any).toString();
  const tokenFamily = crypto.randomBytes(32).toString('hex');
  const tokenId = crypto.randomBytes(16).toString('hex');

  // Create access token
  const accessPayload: AccessTokenPayload = {
    _id: userId,
    username: user.username,
    type: 'access'
  };

  const accessToken = jwt.sign(accessPayload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
    issuer: 'cars-app',
    audience: 'cars-app-users'
  });

  // Create refresh token
  const refreshPayload: RefreshTokenPayload = {
    _id: userId,
    username: user.username,
    tokenId,
    tokenFamily,
    type: 'refresh'
  };

  const refreshToken = jwt.sign(refreshPayload, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    issuer: 'cars-app',
    audience: 'cars-app-users'
  });

  // Store refresh token metadata
  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from now

  refreshTokenStore.set(tokenId, {
    userId,
    tokenFamily,
    isValid: true,
    expiresAt
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: 15 * 60 // 15 minutes in seconds
  };
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      issuer: 'cars-app',
      audience: 'cars-app-users'
    }) as AccessTokenPayload;

    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return payload;
  } catch {
    throw new Error('Invalid access token');
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  try {
    const payload = jwt.verify(token, REFRESH_SECRET, {
      issuer: 'cars-app',
      audience: 'cars-app-users'
    }) as RefreshTokenPayload;

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    // Check if token exists in store and is valid
    const tokenData = refreshTokenStore.get(payload.tokenId);
    if (!tokenData || !tokenData.isValid || tokenData.userId !== payload._id) {
      throw new Error('Refresh token revoked or invalid');
    }

    return payload;
  } catch {
    throw new Error('Invalid refresh token');
  }
}

export function refreshTokens(refreshToken: string, user: IUser): TokenPair {
  const payload = verifyRefreshToken(refreshToken);

  // Invalidate the old refresh token
  const tokenData = refreshTokenStore.get(payload.tokenId);
  if (tokenData) {
    tokenData.isValid = false;
  }

  // Generate new token pair with same family
  const userId = (user._id as any).toString();
  const newTokenId = crypto.randomBytes(16).toString('hex');

  // Create new access token
  const accessPayload: AccessTokenPayload = {
    _id: userId,
    username: user.username,
    type: 'access'
  };

  const accessToken = jwt.sign(accessPayload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
    issuer: 'cars-app',
    audience: 'cars-app-users'
  });

  // Create new refresh token
  const refreshPayload: RefreshTokenPayload = {
    _id: userId,
    username: user.username,
    tokenId: newTokenId,
    tokenFamily: payload.tokenFamily, // Keep same family
    type: 'refresh'
  };

  const newRefreshToken = jwt.sign(refreshPayload, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    issuer: 'cars-app',
    audience: 'cars-app-users'
  });

  // Store new refresh token metadata
  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from now

  refreshTokenStore.set(newTokenId, {
    userId,
    tokenFamily: payload.tokenFamily,
    isValid: true,
    expiresAt
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn: 15 * 60
  };
}

// Blacklist for compromised access tokens (keep until expiry)
const accessTokenBlacklist = new Set<string>();

export function blacklistAccessToken(token: string): void {
  accessTokenBlacklist.add(token);

  // Auto-remove after 15 minutes (access token expiry)
  setTimeout(() => {
    accessTokenBlacklist.delete(token);
  }, 15 * 60 * 1000);
}

export function isAccessTokenBlacklisted(token: string): boolean {
  return accessTokenBlacklist.has(token);
}