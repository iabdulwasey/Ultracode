# Ultracode Technical Specifications

## API Specifications

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "fullName": "string"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "role": "user",
    "emailVerified": false,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

**Error Responses:**
- 400: Invalid input data
- 409: Email already exists

#### POST /api/auth/login
Authenticate user and receive tokens.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "role": "string",
    "plan": "free|lite|pro|enterprise"
  },
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

#### POST /api/auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token",
  "refreshToken": "new_refresh_token"
}
```

### Project Management Endpoints

#### GET /api/projects
Get all projects for authenticated user.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20, max: 100)
- `visibility`: "all" | "public" | "private" | "workspace"
- `search`: string
- `sortBy`: "created" | "updated" | "name"
- `order`: "asc" | "desc"

**Response (200 OK):**
```json
{
  "projects": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "visibility": "public|private|workspace",
      "techStack": {
        "frontend": "react",
        "styling": "tailwind",
        "backend": "supabase"
      },
      "thumbnailUrl": "string",
      "deploymentUrl": "string",
      "githubRepo": "string",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "lastAccessedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### POST /api/projects
Create a new project.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "visibility": "public|private|workspace",
  "template": "landing|saas|ecommerce|blank",
  "techStack": {
    "frontend": "react",
    "styling": "tailwind",
    "backend": "supabase"
  }
}
```

**Response (201 Created):**
```json
{
  "project": {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "visibility": "string",
    "techStack": {},
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### GET /api/projects/:id
Get project details by ID.

**Response (200 OK):**
```json
{
  "project": {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "visibility": "string",
    "techStack": {},
    "files": {
      "src/App.tsx": {
        "content": "string",
        "type": "typescript",
        "size": 1234
      }
    },
    "deployments": [
      {
        "id": "uuid",
        "provider": "netlify",
        "url": "https://example.netlify.app",
        "status": "success",
        "deployedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "collaborators": [
      {
        "userId": "uuid",
        "email": "string",
        "role": "owner|editor|viewer",
        "addedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### Code Generation Endpoints

#### POST /api/generate
Generate code based on natural language prompt.

**Request Body:**
```json
{
  "projectId": "uuid",
  "prompt": "string",
  "context": {
    "currentFile": "string",
    "selectedCode": "string",
    "fileTree": {}
  },
  "options": {
    "model": "gpt-4o|claude-3.5-sonnet",
    "temperature": 0.7,
    "maxTokens": 4000
  }
}
```

**Response (200 OK) - Streaming:**
```json
{
  "event": "start|chunk|end|error",
  "data": {
    "content": "string",
    "files": {
      "path/to/file.tsx": {
        "action": "create|update|delete",
        "content": "string"
      }
    },
    "usage": {
      "promptTokens": 100,
      "completionTokens": 500,
      "totalTokens": 600
    }
  }
}
```

#### POST /api/generate/explain
Explain code or get help with errors.

**Request Body:**
```json
{
  "code": "string",
  "question": "string",
  "language": "typescript|javascript|python|etc",
  "error": {
    "message": "string",
    "stack": "string"
  }
}
```

### Deployment Endpoints

#### POST /api/projects/:id/deploy
Deploy project to hosting provider.

**Request Body:**
```json
{
  "provider": "netlify|vercel",
  "configuration": {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "environmentVariables": {
      "KEY": "value"
    }
  }
}
```

**Response (202 Accepted):**
```json
{
  "deployment": {
    "id": "uuid",
    "projectId": "uuid",
    "provider": "netlify",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### GET /api/projects/:id/deployments/:deploymentId
Get deployment status.

**Response (200 OK):**
```json
{
  "deployment": {
    "id": "uuid",
    "status": "pending|building|success|failed",
    "url": "https://example.netlify.app",
    "logs": ["string"],
    "error": "string",
    "startedAt": "2024-01-01T00:00:00Z",
    "completedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Billing Endpoints

#### GET /api/billing/usage
Get current usage and credits.

**Response (200 OK):**
```json
{
  "billing": {
    "plan": "free|lite|pro|enterprise",
    "creditsRemaining": 25,
    "creditsUsed": 5,
    "currentPeriodEnd": "2024-02-01T00:00:00Z",
    "usage": {
      "projects": 10,
      "deployments": 5,
      "storageBytes": 1048576,
      "bandwidthBytes": 10485760
    }
  }
}
```

#### POST /api/billing/upgrade
Upgrade subscription plan.

**Request Body:**
```json
{
  "plan": "lite|pro|enterprise",
  "paymentMethodId": "string"
}
```

## WebSocket Events

### Connection
```javascript
// Client connects with auth token
ws.connect('wss://api.ultracode.dev/ws', {
  headers: {
    'Authorization': 'Bearer <token>'
  }
});
```

### Project Events

#### project:join
Join a project room for real-time updates.
```json
{
  "event": "project:join",
  "data": {
    "projectId": "uuid"
  }
}
```

#### project:file:update
File content updated.
```json
{
  "event": "project:file:update",
  "data": {
    "projectId": "uuid",
    "path": "src/App.tsx",
    "content": "string",
    "updatedBy": "uuid",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

#### project:cursor:move
Collaborator cursor position.
```json
{
  "event": "project:cursor:move",
  "data": {
    "userId": "uuid",
    "file": "src/App.tsx",
    "line": 10,
    "column": 15
  }
}
```

### Chat Events

#### chat:message
New chat message in project.
```json
{
  "event": "chat:message",
  "data": {
    "projectId": "uuid",
    "message": {
      "id": "uuid",
      "role": "user|assistant",
      "content": "string",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  }
}
```

#### chat:typing
User typing indicator.
```json
{
  "event": "chat:typing",
  "data": {
    "projectId": "uuid",
    "userId": "uuid",
    "isTyping": true
  }
}
```

## Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  passwordHash?: string;
  fullName: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  githubId?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
```

### Project Model
```typescript
interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  visibility: 'public' | 'private' | 'workspace';
  techStack: {
    frontend: 'react' | 'vue' | 'angular';
    styling: 'tailwind' | 'css' | 'styled-components';
    backend?: 'supabase' | 'firebase' | 'custom';
    database?: 'postgresql' | 'mysql' | 'mongodb';
  };
  thumbnailUrl?: string;
  deploymentUrl?: string;
  githubRepo?: string;
  settings: {
    autoSave: boolean;
    lintOnSave: boolean;
    formatOnSave: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
  deletedAt?: Date;
}
```

### File Model
```typescript
interface ProjectFile {
  id: string;
  projectId: string;
  path: string;
  content: string;
  type: FileType;
  size: number;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type FileType = 
  | 'typescript' 
  | 'javascript' 
  | 'jsx' 
  | 'tsx' 
  | 'css' 
  | 'html' 
  | 'json'
  | 'markdown'
  | 'yaml'
  | 'text';
```

### Chat Session Model
```typescript
interface ChatSession {
  id: string;
  projectId: string;
  userId: string;
  messages: ChatMessage[];
  context: {
    files: string[];
    selectedCode?: string;
    error?: string;
  };
  tokensUsed: number;
  model: 'gpt-4o' | 'claude-3.5-sonnet';
  createdAt: Date;
  updatedAt: Date;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    model?: string;
    tokens?: number;
    duration?: number;
    error?: string;
  };
  timestamp: Date;
}
```

### Deployment Model
```typescript
interface Deployment {
  id: string;
  projectId: string;
  provider: 'netlify' | 'vercel' | 'cloudflare';
  status: 'pending' | 'building' | 'success' | 'failed';
  url?: string;
  configuration: {
    buildCommand: string;
    outputDirectory: string;
    environmentVariables: Record<string, string>;
  };
  logs: string[];
  error?: string;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
}
```

### Billing Model
```typescript
interface Billing {
  id: string;
  userId: string;
  plan: 'free' | 'lite' | 'pro' | 'enterprise';
  creditsRemaining: number;
  creditsUsed: number;
  creditsPurchased: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus: 'active' | 'cancelled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  usage: {
    projects: number;
    deployments: number;
    storageBytes: number;
    bandwidthBytes: number;
    apiCalls: number;
  };
  invoices: Invoice[];
  createdAt: Date;
  updatedAt: Date;
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  createdAt: Date;
}
```

## Security Specifications

### JWT Token Structure
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "email": "user@example.com",
    "role": "user",
    "plan": "pro",
    "iat": 1704067200,
    "exp": 1704070800,
    "iss": "ultracode.dev"
  }
}
```

### API Rate Limiting
```yaml
rate_limits:
  free:
    requests_per_minute: 20
    requests_per_hour: 100
    generation_per_day: 5
  lite:
    requests_per_minute: 60
    requests_per_hour: 500
    generation_per_day: 30
  pro:
    requests_per_minute: 200
    requests_per_hour: 2000
    generation_per_day: 300
  enterprise:
    requests_per_minute: 1000
    requests_per_hour: 10000
    generation_per_day: unlimited
```

### Input Validation Rules
```typescript
const validationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  },
  projectName: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9-_\s]+$/
  },
  prompt: {
    maxLength: 4000,
    minLength: 10
  }
};
```

## Performance Specifications

### Response Time SLAs
```yaml
sla:
  api_endpoints:
    auth: < 200ms
    project_list: < 300ms
    project_details: < 500ms
    code_generation: < 30s
    deployment: < 5m
  
  database_queries:
    simple_select: < 50ms
    complex_join: < 200ms
    write_operation: < 100ms
  
  frontend_metrics:
    first_contentful_paint: < 1.5s
    time_to_interactive: < 3s
    largest_contentful_paint: < 2.5s
```

### Resource Limits
```yaml
limits:
  project:
    max_files: 1000
    max_file_size: 10MB
    max_total_size: 1GB
  
  generation:
    max_prompt_length: 4000
    max_response_tokens: 8000
    timeout: 60s
  
  deployment:
    build_timeout: 15m
    max_build_size: 500MB
    max_bandwidth_monthly: 100GB
```

## Error Codes

### Standard Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Additional context"
    },
    "timestamp": "2024-01-01T00:00:00Z",
    "requestId": "uuid"
  }
}
```

### Error Code Reference
```
AUTH001: Invalid credentials
AUTH002: Token expired
AUTH003: Insufficient permissions
AUTH004: Account locked

PROJ001: Project not found
PROJ002: Project limit exceeded
PROJ003: Invalid project configuration
PROJ004: Collaborator limit exceeded

GEN001: Generation failed
GEN002: Model unavailable
GEN003: Prompt too long
GEN004: Rate limit exceeded

BILL001: Payment failed
BILL002: Subscription expired
BILL003: Credit limit exceeded
BILL004: Invalid payment method

SYS001: Internal server error
SYS002: Service unavailable
SYS003: Database error
SYS004: Third-party service error
```

## Integration Specifications

### Supabase Integration
```typescript
interface SupabaseConfig {
  projectId: string;
  anonKey: string;
  serviceKey: string; // Encrypted
  databaseUrl: string;
  features: {
    auth: boolean;
    database: boolean;
    storage: boolean;
    realtime: boolean;
    edge: boolean;
  };
}
```

### GitHub Integration
```typescript
interface GitHubConfig {
  accessToken: string; // Encrypted
  repository: {
    owner: string;
    name: string;
    branch: string;
  };
  webhooks: {
    push: boolean;
    pullRequest: boolean;
    issues: boolean;
  };
}
```

### Deployment Provider Integration
```typescript
interface DeploymentProvider {
  netlify: {
    accessToken: string;
    siteId?: string;
    teamId?: string;
  };
  vercel: {
    accessToken: string;
    teamId?: string;
    projectId?: string;
  };
}
```

## Monitoring & Logging

### Log Format
```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "level": "info|warn|error",
  "service": "api|worker|websocket",
  "userId": "uuid",
  "requestId": "uuid",
  "message": "string",
  "metadata": {
    "duration": 123,
    "statusCode": 200,
    "path": "/api/projects",
    "method": "GET"
  }
}
```

### Metrics Collection
```yaml
metrics:
  application:
    - name: api_request_duration
      type: histogram
      labels: [method, path, status]
    
    - name: active_websocket_connections
      type: gauge
      labels: [project_id]
    
    - name: code_generation_duration
      type: histogram
      labels: [model, success]
    
    - name: deployment_success_rate
      type: counter
      labels: [provider]
  
  business:
    - name: user_signups
      type: counter
      labels: [plan]
    
    - name: project_creations
      type: counter
      labels: [template]
    
    - name: revenue
      type: gauge
      labels: [plan, currency]
```

This technical specification provides a comprehensive foundation for implementing Ultracode with clear contracts, data models, and operational requirements.