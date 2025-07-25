import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  plan: 'free' | 'lite' | 'pro' | 'enterprise';
  creditsRemaining?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Get user profile data
        const { data: profile } = await supabase
          .from('users')
          .select('*, billing(plan_type, credits_remaining)')
          .eq('id', data.user.id)
          .single();

        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            fullName: profile?.full_name || 'User',
            role: profile?.role || 'user',
            plan: profile?.billing?.plan_type || 'free',
            creditsRemaining: profile?.billing?.credits_remaining || 0,
          },
          isAuthenticated: true,
        });
      },

      signUp: async (email: string, password: string, fullName: string) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        // Create user profile
        if (data.user) {
          await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            role: 'user',
          });

          // Create billing record with initial credits
          await supabase.from('billing').insert({
            user_id: data.user.id,
            plan_type: 'free',
            credits_remaining: 5,
            credits_used: 0,
          });

          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              fullName,
              role: 'user',
              plan: 'free',
              creditsRemaining: 5,
            },
            isAuthenticated: true,
          });
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const currentState = get();
        // Don't set loading if we already have a user (avoid unnecessary re-renders)
        if (!currentState.user) {
          set({ isLoading: true });
        }
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user profile data
          let { data: profile } = await supabase
            .from('users')
            .select('*, billing(plan_type, credits_remaining)')
            .eq('id', session.user.id)
            .single();

          // If profile doesn't exist (OAuth user), create it
          if (!profile) {
            const { data: newProfile } = await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email!,
                full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
                role: 'user',
                email_verified: true,
              })
              .select()
              .single();

            // Create billing record
            if (newProfile) {
              await supabase.from('billing').insert({
                user_id: session.user.id,
                plan_type: 'free',
                credits_remaining: 5,
                credits_used: 0,
              });
              profile = newProfile;
            }
          }

          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
              fullName: profile?.full_name || 'User',
              role: profile?.role || 'user',
              plan: profile?.billing?.plan_type || 'free',
              creditsRemaining: profile?.billing?.credits_remaining || 0,
            },
            isAuthenticated: true,
          });
        }
        
        set({ isLoading: false });
      },

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Don't persist auth state - let Supabase handle it
      }),
    }
  )
);

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  const currentState = useAuthStore.getState();
  
  if (event === 'SIGNED_IN' && session) {
    // Only call checkAuth if we don't already have user data
    if (!currentState.user || currentState.user.id !== session.user.id) {
      useAuthStore.getState().checkAuth();
    }
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  } else if (event === 'TOKEN_REFRESHED' && session) {
    // Don't call checkAuth on token refresh, just update the auth state silently
    if (currentState.user && currentState.user.id === session.user.id) {
      // Keep existing user data, just mark as authenticated
      useAuthStore.setState({ isAuthenticated: true });
    }
  }
});