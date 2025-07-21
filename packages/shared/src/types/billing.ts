import { PlanType } from './user.js';

export interface Billing {
  id: string;
  userId: string;
  plan: PlanType;
  creditsRemaining: number;
  creditsUsed: number;
  creditsPurchased: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  usage: UsageMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'unpaid';

export interface UsageMetrics {
  projects: number;
  deployments: number;
  storageBytes: number;
  bandwidthBytes: number;
  apiCalls: number;
}

export interface BillingUsageResponse {
  billing: {
    plan: PlanType;
    creditsRemaining: number;
    creditsUsed: number;
    currentPeriodEnd?: Date;
    usage: UsageMetrics;
  };
}

export interface UpgradeRequest {
  plan: Exclude<PlanType, 'free'>;
  paymentMethodId?: string;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  createdAt: Date;
}

export interface PlanLimits {
  credits: number;
  projects: number;
  collaborators: number;
  storage: number; // in bytes
  bandwidth: number; // in bytes
  customDomains: boolean;
  privateProjects: boolean;
  prioritySupport: boolean;
}