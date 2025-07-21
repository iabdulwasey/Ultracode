import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';
import { validateRequest } from '../utils/validation.js';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character'
    ),
    fullName: z.string().min(2).max(100),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

// Helper functions
const generateTokens = (userId: string, email: string, role: string, plan: string) => {
  const payload = {
    sub: userId,
    email,
    role,
    plan,
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { token, refreshToken };
};

// Register endpoint
router.post('/register', authRateLimiter, validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const result = await query(
      `INSERT INTO users (email, password_hash, full_name, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, full_name, role, created_at`,
      [email, passwordHash, fullName, 'user']
    );

    const user = result.rows[0];

    // Create billing record
    await query(
      `INSERT INTO billing (user_id, plan_type, credits_remaining) 
       VALUES ($1, $2, $3)`,
      [user.id, 'free', 5]
    );

    // Generate tokens
    const { token, refreshToken } = generateTokens(user.id, user.email, user.role, 'free');

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        emailVerified: false,
        createdAt: user.created_at,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

// Login endpoint
router.post('/login', authRateLimiter, validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Get user
    const result = await query(
      `SELECT u.*, b.plan_type as plan 
       FROM users u 
       LEFT JOIN billing b ON u.id = b.user_id 
       WHERE u.email = $1 AND u.deleted_at IS NULL`,
      [email]
    );

    if (result.rows.length === 0) {
      throw new AppError('Invalid email or password', 401);
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate tokens
    const { token, refreshToken } = generateTokens(
      user.id,
      user.email,
      user.role,
      user.plan || 'free'
    );

    logger.info(`User logged in: ${email}`);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        plan: user.plan || 'free',
      },
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

// Refresh token endpoint
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token required', 400);
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as any;

    // Get updated user data
    const result = await query(
      `SELECT u.*, b.plan_type as plan 
       FROM users u 
       LEFT JOIN billing b ON u.id = b.user_id 
       WHERE u.id = $1 AND u.deleted_at IS NULL`,
      [decoded.sub]
    );

    if (result.rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    const user = result.rows[0];

    // Generate new tokens
    const tokens = generateTokens(
      user.id,
      user.email,
      user.role,
      user.plan || 'free'
    );

    res.json(tokens);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Refresh token expired', 401));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid refresh token', 401));
    } else {
      next(error);
    }
  }
});

// Get current user
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT u.*, b.plan_type as plan, b.credits_remaining 
       FROM users u 
       LEFT JOIN billing b ON u.id = b.user_id 
       WHERE u.id = $1`,
      [req.user!.sub]
    );

    if (result.rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    const user = result.rows[0];

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      plan: user.plan || 'free',
      creditsRemaining: user.credits_remaining || 0,
      emailVerified: user.email_verified,
      createdAt: user.created_at,
    });
  } catch (error) {
    next(error);
  }
});

// Demo login endpoint
router.post('/demo', async (req, res, next) => {
  try {
    // Create or get demo user
    const demoEmail = 'demo@ultracode.dev';
    const demoPassword = 'DemoUser123!';
    
    // Check if demo user exists
    const existingUser = await query(
      'SELECT * FROM users WHERE email = $1',
      [demoEmail]
    );

    let userId;
    let user;
    if (existingUser.rows.length === 0) {
      // Create demo user
      const hashedPassword = await bcrypt.hash(demoPassword, 10);
      const result = await query(
        `INSERT INTO users (email, password_hash, full_name, role, email_verified)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, full_name, role`,
        [demoEmail, hashedPassword, 'Demo User', 'user', true]
      );
      user = result.rows[0];
      userId = user.id;

      // Create billing record with some credits
      await query(
        `INSERT INTO billing (user_id, plan_type, credits_remaining)
         VALUES ($1, $2, $3)`,
        [userId, 'free', 50]
      );
    } else {
      user = existingUser.rows[0];
      userId = user.id;
    }

    // Generate tokens
    const tokens = generateTokens(userId, demoEmail, 'user', 'free');

    res.json({
      user: {
        id: userId,
        email: demoEmail,
        fullName: user.full_name || 'Demo User',
        role: 'user',
        plan: 'free',
      },
      ...tokens,
    });

    logger.info(`Demo login successful`);
  } catch (error) {
    next(error);
  }
});

export default router;