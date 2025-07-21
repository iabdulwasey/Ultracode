export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser extends User {
  plan: PlanType;
}

export type PlanType = 'free' | 'lite' | 'pro' | 'enterprise';

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}