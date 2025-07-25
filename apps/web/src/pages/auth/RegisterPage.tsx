import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { Loader2, Github, User, Mail, Shield, ArrowRight, Eye, EyeOff, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const signUp = useAuthStore((state) => state.signUp);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch('password');
  
  // Password strength validation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score < 2) return { score, label: 'Weak', color: 'text-red-500' };
    if (score < 4) return { score, label: 'Fair', color: 'text-yellow-500' };
    return { score, label: 'Strong', color: 'text-green-500' };
  };
  
  const passwordStrength = getPasswordStrength(password || '');

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    
    try {
      await signUp(data.email, data.password, data.fullName);
      toast({
        title: 'Account created!',
        description: 'Welcome to Ultracode. Check your email to verify your account.',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
    setIsLoadingGithub(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'GitHub sign up failed',
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
          Create your account
        </h1>
        <p className="text-lg text-muted-foreground">
          Start building amazing applications with AI assistance
        </p>
      </div>

      {/* GitHub Signup */}
      <div className="animate-slide-up delay-100">
        <Button
          variant="outline"
          className="w-full h-12 border-border bg-secondary/50 hover:bg-secondary transition-all duration-300 group"
          onClick={handleGithubSignUp}
          disabled={isLoadingGithub}
        >
          {isLoadingGithub ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              <span className="text-base">Creating account...</span>
            </>
          ) : (
            <>
              <Github className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium">Sign up with GitHub</span>
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
            Or create account with email
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-up delay-300">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base font-medium flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            {...register('fullName', {
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Full name must be at least 2 characters',
              },
            })}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <X className="h-3 w-3" />
              {errors.fullName.message}
            </p>
          )}
        </div>

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
              <X className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-base font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="h-12 bg-input border-border text-foreground pr-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)/,
                  message: 'Password must contain at least one letter and one number',
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
          {password && (
            <div className="flex items-center gap-2 text-sm animate-fade-in">
              <div className="flex-1">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-full rounded-full transition-colors ${
                        i < passwordStrength.score
                          ? passwordStrength.score < 2
                            ? 'bg-red-500'
                            : passwordStrength.score < 4
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          : 'bg-secondary'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className={`font-medium ${passwordStrength.color}`}>
                {passwordStrength.label}
              </span>
            </div>
          )}
          {errors.password && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <X className="h-3 w-3" />
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-base font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className="h-12 bg-input border-border text-foreground pr-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <X className="h-3 w-3" />
              {errors.confirmPassword.message}
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
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </>
          )}
        </Button>
      </form>

      {/* Terms */}
      <div className="text-center text-sm text-muted-foreground animate-slide-up delay-400">
        <p>
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="text-center animate-slide-up delay-500">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}