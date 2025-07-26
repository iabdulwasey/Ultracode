import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, Terminal, Rocket, Code2, Zap, Globe, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useChatStore } from '@/stores/chatStore';

export default function WorkspacePage() {
  const [prompt, setPrompt] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sendMessage } = useChatStore();

  const handleCreateProject = async () => {
    if (!prompt.trim()) return;

    setIsCreating(true);
    const userPrompt = prompt.trim();
    
    try {
      const project = await api.createProject({
        name: `AI Project - ${new Date().toLocaleDateString()}`,
        description: userPrompt,
        template: 'blank',
        techStack: ['react', 'typescript', 'tailwind'],
        visibility: 'private'
      });

      toast({
        title: 'Project Created!',
        description: 'Starting AI generation...',
      });

      // Navigate to the project page first
      navigate(`/project/${project.id}`);

      // Then send the initial prompt to start AI generation
      // Small delay to ensure the project page has loaded
      setTimeout(async () => {
        try {
          await sendMessage(project.id, userPrompt);
        } catch (error) {
          console.error('Failed to send initial prompt:', error);
        }
      }, 1000);

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create project',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center animate-fade-in">
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up">
            <span className="gradient-text text-balance">
              What Will You
              <br />
              Build Today?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
            Describe your vision in plain English. Watch as AI transforms your ideas 
            into production-ready applications in minutes.
          </p>
          
          {/* Input Section */}
          <div className="relative max-w-4xl mx-auto mb-12 animate-slide-up delay-400">
            <div className="glass rounded-2xl p-8 shadow-modern-lg">
              <div className="relative">
                <Textarea
                  placeholder="Describe your dream application... (e.g., 'Create a social media dashboard with real-time notifications and dark mode')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCreateProject();
                    }
                  }}
                  className="min-h-[140px] max-h-[300px] text-lg bg-card/50 border border-border/50 focus:border-primary/50 resize-none px-6 py-4 pr-20"
                  rows={4}
                />
                
                <Button
                  onClick={handleCreateProject}
                  disabled={!prompt.trim() || isCreating}
                  size="lg"
                  className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 glow-primary shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  {isCreating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Terminal className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Start Building
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">Enter</kbd> to create, 
                <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono ml-1">Shift + Enter</kbd> for new line
              </div>
            </div>
          </div>

          {/* Example prompts */}
          <div className="mb-16 animate-slide-up delay-500">
            <h3 className="text-lg font-semibold mb-6 text-foreground">
              Or try one of these popular ideas:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
              <Button
                variant="outline"
                onClick={() => setPrompt("Create a modern blog website with markdown support and dark mode")}
                className="h-auto p-4 text-left glass hover:shadow-modern-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code2 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Blog Platform</div>
                    <div className="text-xs text-muted-foreground">Markdown, CMS, SEO</div>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setPrompt("Build a portfolio website with project showcase and contact form")}
                className="h-auto p-4 text-left glass hover:shadow-modern-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Rocket className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Portfolio Site</div>
                    <div className="text-xs text-muted-foreground">Showcase, Resume, Contact</div>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setPrompt("Create an e-commerce store with product catalog and shopping cart")}
                className="h-auto p-4 text-left glass hover:shadow-modern-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">E-commerce</div>
                    <div className="text-xs text-muted-foreground">Products, Cart, Payment</div>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setPrompt("Build a dashboard with analytics charts and data visualization")}
                className="h-auto p-4 text-left glass hover:shadow-modern-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Dashboard</div>
                    <div className="text-xs text-muted-foreground">Charts, Analytics, KPIs</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}