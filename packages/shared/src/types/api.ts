export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface WebSocketEvent<T = any> {
  event: string;
  data: T;
  timestamp: Date;
}

export interface StreamEvent {
  event: 'start' | 'chunk' | 'end' | 'error';
  data: any;
}