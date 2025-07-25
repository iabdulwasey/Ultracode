import { Outlet, Link } from 'react-router-dom';
import { Code2, Sparkles } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-3 font-bold text-xl w-fit">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 gradient-circle rounded-full animate-gradient-pulse"></div>
            </div>
            <span className="gradient-text">Ultracode</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-md animate-scale-in">
          {/* Auth Card */}
          <div className="glass rounded-2xl p-8 shadow-modern-lg border border-border/50">
            {/* AI Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 animate-fade-in">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Powered by Claude Sonnet 4</span>
              </div>
            </div>
            
            <Outlet />
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground animate-fade-in delay-200">
            <p>
              © 2024 Ultracode. Built with AI, deployed with love.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}