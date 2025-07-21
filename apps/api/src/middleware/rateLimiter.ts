import rateLimit from 'express-rate-limit';
import { Request } from 'express';

// Different rate limits for different plan types
const getRateLimitByPlan = (plan: string) => {
  switch (plan) {
    case 'enterprise':
      return { windowMs: 60000, max: 1000 };
    case 'pro':
      return { windowMs: 60000, max: 200 };
    case 'lite':
      return { windowMs: 60000, max: 60 };
    default: // free
      return { windowMs: 60000, max: 20 };
  }
};

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: (req: Request) => {
    // Get user plan from JWT token (to be implemented)
    const userPlan = req.headers['x-user-plan'] as string || 'free';
    return getRateLimitByPlan(userPlan).max;
  },
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMIT',
        message: 'Too many requests. Please upgrade your plan for higher limits.',
        retryAfter: req.rateLimit?.resetTime,
      },
    });
  },
});

// Specific rate limiter for auth endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true,
});

// Specific rate limiter for code generation
export const generateRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: (req: Request) => {
    const userPlan = req.headers['x-user-plan'] as string || 'free';
    switch (userPlan) {
      case 'enterprise':
        return 10000;
      case 'pro':
        return 300;
      case 'lite':
        return 30;
      default:
        return 5;
    }
  },
  message: 'Daily generation limit reached. Please upgrade your plan.',
});