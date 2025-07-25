import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';
import { supabase } from '../config/supabase.js';

interface SupabaseJwtPayload {
  sub: string;
  email: string;
  role: string;
  aud: string;
  iat: number;
  exp: number;
  user_metadata?: any;
  app_metadata?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: SupabaseJwtPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    // Verify the Supabase JWT token
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        console.error('Token verification failed:', error);
        throw new AppError('Invalid token', 401);
      }

      // Create user object compatible with our routes
      req.user = {
        sub: user.id,
        email: user.email!,
        role: user.role || 'authenticated',
        aud: user.aud,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        user_metadata: user.user_metadata,
        app_metadata: user.app_metadata,
      };

    } catch (authError: any) {
      console.error('Supabase connection error:', authError);
      
      // If it's a network error, provide more specific message
      if (authError.code === 'ECONNRESET' || authError.message?.includes('fetch failed')) {
        throw new AppError('Authentication service temporarily unavailable', 503);
      }
      
      throw new AppError('Invalid token', 401);
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Authentication failed', 401));
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
};