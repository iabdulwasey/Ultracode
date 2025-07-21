import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tdaizlcgzgbwgfabjvhm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYWl6bGNnemdid2dmYWJqdmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMTE3OTEsImV4cCI6MjA2ODY4Nzc5MX0.SA99Gbaq4f2MQ_1hh-MgX28ye4mCB63RkHmUnbKjHjY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Type definitions for our database
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          visibility: 'public' | 'private' | 'workspace';
          tech_stack: any;
          template: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string;
          name: string;
          description?: string;
          visibility?: 'public' | 'private' | 'workspace';
          tech_stack?: any;
          template?: string;
        };
      };
      project_files: {
        Row: {
          id: string;
          project_id: string;
          path: string;
          content: string | null;
          type: string | null;
          size: number | null;
          created_at: string;
          updated_at: string;
        };
      };
      billing: {
        Row: {
          id: string;
          user_id: string;
          plan_type: string;
          credits_remaining: number;
          credits_used: number;
        };
      };
    };
  };
};