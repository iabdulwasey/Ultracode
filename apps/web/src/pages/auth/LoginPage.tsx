import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { Loader2, Github, Mail, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const signIn = useAuthStore((state) => state.signIn);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    try {
      await signIn(data.email, data.password);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/workspace');
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoadingGithub(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/workspace`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'GitHub login failed',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
      setIsLoadingGithub(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Welcome back
        </h1>
        <p className="text-lg text-muted-foreground">
          Sign in to continue building amazing applications
        </p>
      </div>

      {/* GitHub Login */}
      <div className="animate-slide-up delay-100">
        <Button
          variant="outline"
          className="w-full h-12 border-border bg-secondary/50 hover:bg-secondary transition-all duration-300 group"
          onClick={handleGithubLogin}
          disabled={isLoadingGithub}
        >
          {isLoadingGithub ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              <span className="text-base">Connecting...</span>
            </>
          ) : (
            <>
              <Github className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium">Continue with GitHub</span>
              <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative animate-slide-up delay-200">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground">
            Or sign in with email
          </span>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-up delay-300">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <Shield className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-base font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Password  
            </Label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="h-12 bg-input border-border text-foreground pr-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <Shield className="h-3 w-3" />
              {errors.password.message}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-primary hover:bg-primary/90 glow-primary text-base font-medium transition-all duration-300 group" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center animate-slide-up delay-400">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}