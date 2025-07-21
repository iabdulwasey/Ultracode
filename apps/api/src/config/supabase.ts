import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger.js';

let supabase: SupabaseClient | null = null;

export const initializeSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    logger.warn('Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
    logger.debug('Environment variables:', {
      SUPABASE_URL: process.env.SUPABASE_URL ? 'set' : 'not set',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'set' : 'not set',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'not set',
    });
    return null;
  }

  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  logger.info('Supabase client initialized successfully');
  return supabase;
};

export const getSupabase = () => {
  if (!supabase) {
    // Try to initialize if not already done
    initializeSupabase();
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please configure your Supabase credentials.');
  }
  return supabase;
};

// Export supabase getter for backward compatibility
export { supabase };