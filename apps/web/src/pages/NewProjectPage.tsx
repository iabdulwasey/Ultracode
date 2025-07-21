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
  Code2,
  Sparkles,
  Loader2,
  Globe,
  Lock,
  ShoppingCart,
  LayoutDashboard,
  FileText,
  Briefcase,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tech: {
    framework: 'react' | 'vue' | 'angular';
    styling: 'tailwind' | 'css' | 'styled-components';
    typescript: boolean;
  };
}

const projectTemplates: ProjectTemplate[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Beautiful marketing website with sections for features, pricing, and testimonials',
    icon: <Globe className="h-5 w-5" />,
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'saas',
    name: 'SaaS Application',
    description: 'Full-featured app with authentication, dashboard, and subscription billing',
    icon: <LayoutDashboard className="h-5 w-5" />,
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Online store with product catalog, cart, and checkout functionality',
    icon: <ShoppingCart className="h-5 w-5" />,
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'blog',
    name: 'Blog Platform',
    description: 'Content management system with posts, categories, and comments',
    icon: <FileText className="h-5 w-5" />,
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'portfolio',
    name: 'Portfolio Site',
    description: 'Showcase your work with a beautiful personal website',
    icon: <Briefcase className="h-5 w-5" />,
    tech: { framework: 'react', styling: 'tailwind', typescript: true },
  },
  {
    id: 'blank',
    name: 'Blank Project',
    description: 'Start from scratch with your preferred tech stack',
    icon: <Code2 className="h-5 w-5" />,
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
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate('/dashboard')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
          <p className="text-muted-foreground">
            Choose a template and let AI help you build your application
          </p>
        </div>

        {/* Template Selection */}
        <div>
          <Label className="text-base mb-4 block">Choose a template</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                  selectedTemplate.id === template.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">{template.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="My Awesome Project"
              value={projectData.name}
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your project..."
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label>Visibility</Label>
            <RadioGroup
              value={projectData.visibility}
              onValueChange={(value) => setProjectData({ ...projectData, visibility: value as 'public' | 'private' })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="flex items-center gap-2 font-normal">
                  <Lock className="h-4 w-4" />
                  Private - Only you can access this project
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="flex items-center gap-2 font-normal">
                  <Globe className="h-4 w-4" />
                  Public - Anyone with the link can view this project
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="prompt">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Initial AI Prompt (optional)
              </span>
            </Label>
            <Textarea
              id="prompt"
              placeholder="Describe what you want to build... e.g., 'Create a modern landing page for a fitness app with a hero section, features grid, pricing table, and contact form'"
              value={projectData.prompt}
              onChange={(e) => setProjectData({ ...projectData, prompt: e.target.value })}
              className="mt-1"
              rows={4}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Describe your vision and our AI will help bring it to life
            </p>
          </div>
        </div>

        {/* Tech Stack Info */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Tech Stack</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Framework: {selectedTemplate.tech.framework}</p>
            <p>• Styling: {selectedTemplate.tech.styling}</p>
            <p>• TypeScript: {selectedTemplate.tech.typescript ? 'Yes' : 'No'}</p>
            <p>• Database: Supabase (PostgreSQL)</p>
            <p>• Deployment: Netlify/Vercel ready</p>
          </div>
        </div>

        {/* Create Button */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateProject}
            disabled={isCreating || !projectData.name.trim()}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}