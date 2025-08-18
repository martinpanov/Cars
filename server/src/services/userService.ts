import bcrypt from 'bcrypt';

import User, { IUser } from '../models/User';
import { 
  generateTokenPair, 
  verifyAccessToken, 
  verifyRefreshToken, 
  refreshTokens, 
  blacklistAccessToken, 
  isAccessTokenBlacklisted,
  TokenPair 
} from '../utils/jwtHelpers';

export async function getUser(username: string): Promise<IUser> {
  const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

type UserResponse = {
  _id: string;
  username: string;
  tokens: TokenPair;
};

export async function register(username: string, password: string, repass: string): Promise<UserResponse> {
  const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
  if (existing) {
    throw new Error('Username is taken');
  }

  if (password !== repass) {
    throw new Error('Passwords do not match');
  }

  const user = await User.create({
    username,
    password: await bcrypt.hash(password, 10)
  });

  return {
    _id: (user._id as any).toString(),
    username: user.username,
    tokens: generateTokenPair(user)
  };
}

export async function login(username: string, password: string): Promise<UserResponse> {
  const user = await getUser(username);

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect username or password');
  }

  return {
    _id: (user._id as any).toString(),
    username: user.username,
    tokens: generateTokenPair(user)
  };
}

export async function logout(token: string): Promise<void> {
  blacklistAccessToken(token);
}


export async function refreshUserTokens(refreshToken: string): Promise<TokenPair> {
  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload._id);
    
    if (!user) {
      throw new Error('User not found');
    }

    return refreshTokens(refreshToken, user);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

export function parseToken(token: string) {
  if (isAccessTokenBlacklisted(token)) {
    throw new Error('Token has been revoked');
  }
  
  return verifyAccessToken(token);
}