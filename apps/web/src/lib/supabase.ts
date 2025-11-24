import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://khdvylttwoqjgkbpdcqf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZHZ5bHR0d29xamdrYnBkY3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjIwMjcsImV4cCI6MjA3OTQ5ODAyN30.ffaZu7QQKGoDnPm6QHLoSe79mj65AXcD0kBhfb6Utu4';

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