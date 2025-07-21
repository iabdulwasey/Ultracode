import { logger } from '../utils/logger.js';

// Simple in-memory cache for development
class InMemoryCache {
  private store: Map<string, { value: string; expiry?: number }> = new Map();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    
    if (item.expiry && item.expiry < Date.now()) {
      this.store.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set(key: string, value: string): Promise<void> {
    this.store.set(key, { value });
  }

  async setex(key: string, seconds: number, value: string): Promise<void> {
    const expiry = Date.now() + (seconds * 1000);
    this.store.set(key, { value, expiry });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    return this.store.has(key);
  }

  async quit(): Promise<void> {
    this.store.clear();
  }
}

let cache: InMemoryCache | null = null;

export const initializeRedis = async () => {
  try {
    cache = new InMemoryCache();
    logger.info('✅ In-memory cache initialized (Redis not required for development)');
    return cache;
  } catch (error) {
    logger.error('Failed to initialize cache:', error);
    throw error;
  }
};

export const getRedis = () => {
  if (!cache) {
    throw new Error('Cache not initialized. Call initializeRedis() first.');
  }
  return cache;
};

export const disconnectRedis = async () => {
  if (cache) {
    await cache.quit();
    cache = null;
    logger.info('Cache cleared');
  }
};