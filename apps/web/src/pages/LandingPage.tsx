import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code2, Zap, Shield, Globe, ArrowRight, Sparkles, Terminal, Rocket, Github, MessageSquare, Play } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 font-bold text-xl">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 gradient-circle rounded-full animate-gradient-pulse"></div>
            </div>
            <span className="gradient-text">Ultracode</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary/90 glow-primary">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-scale-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Powered by Claude Sonnet 4</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up">
            <span className="gradient-text text-balance">
              Build Apps with
              <br />
              AI in Minutes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
            Create production-ready applications through natural language conversations. 
            From idea to deployment in minutes, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-400">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 glow-primary">
                <Terminal className="mr-2 h-5 w-5" />
                Start Building Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-border">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>5 free projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Deploy anywhere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how easy it is to build a complete React application with just conversation.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-8 shadow-modern-lg">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground ml-4">Ultracode AI Assistant</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-secondary rounded-lg p-3">
                        <p className="text-sm">What would you like to build today?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-md">
                      <div className="bg-primary rounded-lg p-3">
                        <p className="text-sm text-primary-foreground">Create a modern todo app with React and TypeScript</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-accent-foreground">U</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-secondary rounded-lg p-3">
                        <p className="text-sm">Perfect! I'll create a modern todo app with React, TypeScript, and Tailwind CSS. Here's what I'm building...</p>
                        <div className="mt-2 p-2 bg-card rounded border text-xs font-mono">
                          <div className="text-primary">✓ React + TypeScript setup</div>
                          <div className="text-accent">✓ Modern UI components</div>
                          <div className="text-orange-500">✓ Local storage persistence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Developers Love Ultracode
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build, deploy, and scale modern applications with AI assistance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group glass rounded-xl p-8 hover:shadow-modern-lg transition-all duration-300 animate-scale-in">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Lightning Fast Development</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate complete applications in minutes with our AI-powered code generation. No more boilerplate code.
              </p>
            </div>
            
            <div className="group glass rounded-xl p-8 hover:shadow-modern-lg transition-all duration-300 animate-scale-in delay-100">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Production Ready</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get clean, maintainable code following industry best practices. TypeScript, testing, and documentation included.
              </p>
            </div>
            
            <div className="group glass rounded-xl p-8 hover:shadow-modern-lg transition-all duration-300 animate-scale-in delay-200">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">One-Click Deploy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deploy to Netlify, Vercel, or your preferred platform with a single click. CI/CD pipelines included.
              </p>
            </div>
            
            <div className="group glass rounded-xl p-8 hover:shadow-modern-lg transition-all duration-300 animate-scale-in delay-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Natural Language Interface</h3>
              <p className="text-muted-foreground leading-relaxed">
                Describe what you want in plain English. Our AI understands context and builds exactly what you need.
              </p>
            </div>
            
            <div className="group glass rounded-xl p-8 hover:shadow-modern-lg transition-all duration-300 animate-scale-in delay-400">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Github className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Git Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatic version control with GitHub integration. Branch management and collaboration built-in.
              </p>
            </div>
            
            <div className="group glass rounded-xl p-8 hover:shadow-modern-lg transition-all duration-300 animate-scale-in delay-500">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Global CDN</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your apps are served from a global CDN for maximum performance. Sub-second load times worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 animate-slide-up">
              <span className="gradient-text text-balance">
                Ready to Ship Your Next Big Idea?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed animate-slide-up delay-200">
              Join 50,000+ developers who are building the future with AI. 
              No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-400">
              <Link to="/register">
                <Button size="lg" className="text-lg px-12 py-4 bg-primary hover:bg-primary/90 glow-primary">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Building Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-12 py-4 border-border">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold gradient-text">Ultracode</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Ultracode. Built with AI, deployed with love.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}