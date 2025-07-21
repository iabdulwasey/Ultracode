// User types
export * from './types/user';

// Project types
export * from './types/project';

// Chat types
export * from './types/chat';

// Billing types
export * from './types/billing';

// Deployment types
export * from './types/deployment';

// API types
export * from './types/api';

// Constants
export const PLAN_LIMITS = {
  free: {
    credits: 5,
    projects: 3,
    collaborators: 0,
    storage: 100 * 1024 * 1024, // 100MB
    bandwidth: 1024 * 1024 * 1024, // 1GB
    customDomains: false,
    privateProjects: false,
    prioritySupport: false,
  },
  lite: {
    credits: 30,
    projects: 10,
    collaborators: 2,
    storage: 1024 * 1024 * 1024, // 1GB
    bandwidth: 10 * 1024 * 1024 * 1024, // 10GB
    customDomains: true,
    privateProjects: true,
    prioritySupport: false,
  },
  pro: {
    credits: 300,
    projects: 50,
    collaborators: 10,
    storage: 10 * 1024 * 1024 * 1024, // 10GB
    bandwidth: 100 * 1024 * 1024 * 1024, // 100GB
    customDomains: true,
    privateProjects: true,
    prioritySupport: true,
  },
  enterprise: {
    credits: 10000,
    projects: -1, // unlimited
    collaborators: -1, // unlimited
    storage: -1, // unlimited
    bandwidth: -1, // unlimited
    customDomains: true,
    privateProjects: true,
    prioritySupport: true,
  },
};

export const ERROR_CODES = {
  // Auth errors
  AUTH001: 'Invalid credentials',
  AUTH002: 'Token expired',
  AUTH003: 'Insufficient permissions',
  AUTH004: 'Account locked',
  
  // Project errors
  PROJ001: 'Project not found',
  PROJ002: 'Project limit exceeded',
  PROJ003: 'Invalid project configuration',
  PROJ004: 'Collaborator limit exceeded',
  
  // Generation errors
  GEN001: 'Generation failed',
  GEN002: 'Model unavailable',
  GEN003: 'Prompt too long',
  GEN004: 'Rate limit exceeded',
  
  // Billing errors
  BILL001: 'Payment failed',
  BILL002: 'Subscription expired',
  BILL003: 'Credit limit exceeded',
  BILL004: 'Invalid payment method',
  
  // System errors
  SYS001: 'Internal server error',
  SYS002: 'Service unavailable',
  SYS003: 'Database error',
  SYS004: 'Third-party service error',
};