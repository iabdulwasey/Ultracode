import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  Globe,
  Lock,
  ShoppingCart,
  LayoutDashboard,
  FileText,
  Briefcase,
  Rocket,
  Palette,
  Zap,
  Star,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
  tech: {
    framework: 'react' | 'vue' | 'angular';
    styling: 'tailwind' | 'css' | 'styled-components';
    typescript: boolean;
  };
}

const projectTemplates: ProjectTemplate[] = [
  {
    id: 'saas',
    name: 'SaaS Application',
    description: 'Complete software-as-a-service platform with modern features',
    icon: <LayoutDashboard className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Modern online store with shopping cart and payment processing',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'from-emerald-500 to-teal-500',
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'High-converting marketing website with modern design',
    icon: <Rocket className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-500',
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'blog',
    name: 'Blog Platform',
    description: 'Professional content management system for publishing',
    icon: <FileText className="h-6 w-6" />,
    color: 'from-orange-500 to-red-500',
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'portfolio',
    name: 'Portfolio Site',
    description: 'Stunning personal website to showcase your work and skills',
    icon: <Briefcase className="h-6 w-6" />,
    color: 'from-indigo-500 to-blue-500',
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'blank',
    name: 'Custom Project',
    description: 'Start from scratch with AI assistance for your unique vision',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'from-gray-500 to-slate-500',
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
];

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate>(projectTemplates[0]);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    visibility: 'private' as 'public' | 'private',
    prompt: '',
  });

  const handleCreateProject = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to create a project',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (!projectData.name.trim()) {
      toast({
        title: 'Project name required',
        description: 'Please enter a name for your project',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);
    try {
      const project = await api.createProject({
        name: projectData.name,
        description: projectData.description || `A ${selectedTemplate.name.toLowerCase()} built with Ultracode`,
        visibility: projectData.visibility,
        template: selectedTemplate.id,
        techStack: selectedTemplate.tech,
        initialPrompt: projectData.prompt,
      });

      toast({
        title: 'Project created!',
        description: 'Redirecting to your new project...',
      });

      // Navigate to the project page
      navigate(`/project/${project.id}`);
    } catch (error) {
      toast({
        title: 'Failed to create project',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container max-w-6xl mx-auto py-8 px-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-8 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              Create New Project
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose a template and let our AI assistant help you build amazing applications in minutes
            </p>
          </div>

          {/* Template Selection */}
          <div className="animate-slide-up delay-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Choose Your Template</h2>
              <div className="text-sm text-muted-foreground">
                {projectTemplates.length} templates available
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projectTemplates.map((template, index) => (
                <div
                  key={template.id}
                  className={`group relative glass rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-modern-lg animate-scale-in ${
                    selectedTemplate.id === template.id
                      ? 'ring-2 ring-primary shadow-modern-lg'
                      : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedTemplate(template)}
                >
                  {template.popular && (
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Popular
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${template.color} p-3 text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {template.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>
                  
                  {selectedTemplate.id === template.id && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project Configuration */}
          <div className="grid lg:grid-cols-3 gap-8 animate-slide-up delay-400">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Palette className="h-4 w-4 text-primary" />
                  </div>
                  Project Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium">Project Name *</Label>
                    <Input
                      id="name"
                      placeholder="My Awesome Project"
                      value={projectData.name}
                      onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                      className="mt-2 h-12 bg-input border-border text-foreground focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your project..."
                      value={projectData.description}
                      onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                      className="mt-2 bg-input border-border text-foreground focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-4 block">Project Visibility</Label>
                    <RadioGroup
                      value={projectData.visibility}
                      onValueChange={(value) => setProjectData({ ...projectData, visibility: value as 'public' | 'private' })}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private" className="flex items-center gap-3 font-normal flex-1 cursor-pointer">
                          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <Lock className="h-4 w-4 text-orange-500" />
                          </div>
                          <div>
                            <div className="font-medium">Private Project</div>
                            <div className="text-sm text-muted-foreground">Only you can access this project</div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="flex items-center gap-3 font-normal flex-1 cursor-pointer">
                          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                            <Globe className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <div className="font-medium">Public Project</div>
                            <div className="text-sm text-muted-foreground">Anyone with the link can view this project</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="prompt" className="text-base font-medium flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI Prompt (Optional)
                    </Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe what you want to build... e.g., 'Create a modern landing page for a fitness app with a hero section, features grid, pricing table, and contact form'"
                      value={projectData.prompt}
                      onChange={(e) => setProjectData({ ...projectData, prompt: e.target.value })}
                      className="bg-input border-border text-foreground focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Describe your vision and our AI will help bring it to life
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tech Stack & Summary */}
            <div className="space-y-6">
              {/* Selected Template */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Selected Template
                </h3>
                
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedTemplate.color} p-3 text-white mb-3`}>
                  {selectedTemplate.icon}
                </div>
                
                <h4 className="font-semibold mb-2">{selectedTemplate.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{selectedTemplate.description}</p>
                
                <div className="text-sm text-muted-foreground">
                  Perfect for building modern {selectedTemplate.name.toLowerCase()}s with AI assistance
                </div>
              </div>


              {/* Create Button */}
              <div className="space-y-3">
                <Button
                  onClick={handleCreateProject}
                  disabled={isCreating || !projectData.name.trim()}
                  className="w-full h-12 bg-primary hover:bg-primary/90 glow-primary text-lg font-medium"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Project...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-5 w-5" />
                      Create Project
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  disabled={isCreating}
                  className="w-full h-12 border-border"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}