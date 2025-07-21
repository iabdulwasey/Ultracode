import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  logger.warn('Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export const getSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please configure your Supabase credentials.');
  }
  return supabase;
};