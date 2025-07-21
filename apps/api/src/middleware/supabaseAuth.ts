import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';
import { getSupabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';

interface SupabaseJwtPayload {
  sub: string; // user id
  email?: string;
  role?: string;
  aud: string;
  exp: number;
  iat: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticateSupabase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      logger.warn('No authentication token provided');
      throw new AppError('Authentication required', 401);
    }

    logger.debug('Verifying token with Supabase');
    
    // Get Supabase client and verify the token
    const supabase = getSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      logger.error('Supabase auth error:', error);
      throw new AppError('Invalid token', 401);
    }
    
    if (!user) {
      logger.warn('No user found for token');
      throw new AppError('Invalid token', 401);
    }

    // Set user info on request
    req.user = {
      id: user.id,
      email: user.email ?? '',
      role: 'user', // Supabase doesn't provide role in the user object by default
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Authentication failed', 401));
    }
  }
};