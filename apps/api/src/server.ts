import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import generateRoutes from './routes/generate.routes.js';
import billingRoutes from './routes/billing.routes.js';
import chatRoutes from './routes/chat.routes.js';
import deploymentRoutes from './routes/deployment.routes.js';
import localPreviewRoutes from './routes/localPreview.routes.js';
import { logger } from './utils/logger.js';
import { connectDatabase } from './config/database.js';
import { initializeRedis } from './config/redis.js';
import { initializeSupabase } from './config/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

// Log to verify env vars are loaded
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  SUPABASE_URL: process.env.SUPABASE_URL ? 'loaded' : 'missing',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'loaded' : 'missing',
  API_URL: process.env.API_URL,
  PORT: process.env.PORT
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Rate limiting
app.use('/api/', rateLimiter);

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/local-preview', localPreviewRoutes);
app.use('/api', deploymentRoutes);

// WebSocket handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('join-project', (projectId) => {
    socket.join(`project:${projectId}`);
    logger.info(`Socket ${socket.id} joined project ${projectId}`);
  });

  socket.on('leave-project', (projectId) => {
    socket.leave(`project:${projectId}`);
    logger.info(`Socket ${socket.id} left project ${projectId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Initialize Supabase client
    initializeSupabase();
    
    // Connect to database (disabled - using Supabase instead)
    // await connectDatabase();
    
    // Initialize Redis
    await initializeRedis();
    
    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info(`File sync service initialized and listening for changes`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  httpServer.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export { app, io };