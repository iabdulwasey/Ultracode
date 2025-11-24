export interface ProcessEvent {
  id: string;
  caseId: string;
  activity: string;
  timestamp: Date;
  resource: string;
  cost?: number;
  duration?: number;
}

export interface ProcessCase {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  activities: ProcessEvent[];
  variant: string;
  throughputTime: number;
}

export interface ProcessMetrics {
  totalCases: number;
  avgThroughputTime: number;
  avgCycleTime: number;
  processCompliance: number;
  automationRate: number;
  costPerCase: number;
}

export interface ProcessNode {
  id: string;
  activity: string;
  frequency: number;
  avgDuration: number;
  performance: 'good' | 'warning' | 'critical';
}

export interface ProcessEdge {
  id: string;
  source: string;
  target: string;
  frequency: number;
  avgDuration: number;
}

export interface ProcessVariant {
  id: string;
  path: string[];
  frequency: number;
  percentage: number;
  avgDuration: number;
  performance: 'good' | 'warning' | 'critical';
}

export interface BottleneckAnalysis {
  activity: string;
  avgWaitTime: number;
  maxWaitTime: number;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
}

export interface ConformanceIssue {
  id: string;
  caseId: string;
  type: 'deviation' | 'violation' | 'missing';
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  lastUpdated: Date;
  widgets: DashboardWidget[];
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'process-map' | 'table';
  title: string;
  data: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface DataSource {
  id: string;
  name: string;
  type: 'csv' | 'database' | 'api';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  recordCount: number;
}