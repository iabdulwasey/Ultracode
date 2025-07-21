export interface Deployment {
  id: string;
  projectId: string;
  provider: DeploymentProvider;
  status: DeploymentStatus;
  url?: string;
  configuration: DeploymentConfig;
  logs: string[];
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  deployedAt?: Date;
  createdAt: Date;
}

export type DeploymentProvider = 'netlify' | 'vercel' | 'cloudflare';

export type DeploymentStatus = 'pending' | 'building' | 'success' | 'failed';

export interface DeploymentConfig {
  buildCommand: string;
  outputDirectory: string;
  environmentVariables: Record<string, string>;
  nodeVersion?: string;
}

export interface DeployRequest {
  provider: DeploymentProvider;
  configuration: DeploymentConfig;
}

export interface DeploymentLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error';
  message: string;
}