import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';
import {
  Plus,
  Search,
  Grid,
  List,
  Clock,
  Globe,
  Lock,
  MoreVertical,
  FileCode,
  FolderOpen,
  Trash2,
  Edit3,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { SkeletonProjectCard } from '@/components/ui/skeleton';

interface Project {
  id: string;
  name: string;
  description?: string;
  visibility: 'public' | 'private' | 'workspace';
  updatedAt: string;
  createdAt: string;
  deploymentUrl?: string;
  template?: string;
  filesCount?: number;
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectName, setEditingProjectName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects();
      
      // Transform the data to match our interface
      const transformedProjects = data.map((project: any) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        visibility: project.visibility,
        updatedAt: formatDistanceToNow(new Date(project.updated_at), { addSuffix: true }),
        createdAt: project.created_at,
        template: project.template,
        filesCount: project.files_count || 0,
      }));
      
      setProjects(transformedProjects);
    } catch (err) {
      console.error('Failed to load projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await api.deleteProject(projectId);
      await loadProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleRenameProject = async (projectId: string, newName: string) => {
    if (!newName.trim() || newName === projects.find(p => p.id === projectId)?.name) {
      setEditingProjectId(null);
      return;
    }
    
    try {
      await api.updateProject(projectId, { name: newName.trim() });
      await loadProjects();
      setEditingProjectId(null);
    } catch (err) {
      console.error('Failed to rename project:', err);
      alert('Failed to rename project. Please try again.');
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          Welcome back, {user?.fullName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-xl text-muted-foreground">
          What would you like to build today?
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:shadow-modern"
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={`h-12 w-12 border-border hover:bg-secondary transition-all duration-300 group ${viewMode === 'grid' ? 'bg-primary text-primary-foreground glow-primary' : 'text-muted-foreground hover:scale-105'}`}
          >
            <Grid className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
            className={`h-12 w-12 border-border hover:bg-secondary transition-all duration-300 group ${viewMode === 'list' ? 'bg-primary text-primary-foreground glow-primary' : 'text-muted-foreground hover:scale-105'}`}
          >
            <List className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
          <Link to="/new">
            <Button className="h-12 px-6 bg-primary hover:bg-primary/90 glow-primary transition-all duration-300 group hover:scale-105">
              <Plus className="mr-2 h-4 w-4 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
              : 'space-y-4'
          }
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonProjectCard key={i} style={{ animationDelay: `${Math.min(i * 30, 240)}ms` }} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 animate-scale-in">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCode className="h-10 w-10 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Failed to load projects</h3>
            <p className="text-muted-foreground mb-8 text-lg">{error}</p>
            <Button onClick={loadProjects} className="bg-primary hover:bg-primary/90 glow-primary px-8 py-3 text-lg">
              Try Again
            </Button>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 animate-scale-in">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 gradient-circle rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCode className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              {searchQuery ? 'No matching projects' : 'Start your first project'}
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              {searchQuery 
                ? 'Try adjusting your search terms or create a new project.' 
                : 'Create your first project and bring your ideas to life with AI assistance.'
              }
            </p>
            <Link to="/new">
              <Button className="bg-primary hover:bg-primary/90 glow-primary px-8 py-3 text-lg transition-all duration-300 group hover:scale-105 animate-bounce-subtle">
                <Plus className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" />
                Create Your First Project
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={`animate-fade-in ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
              : 'space-y-4'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group glass rounded-xl p-4 hover:shadow-modern-lg transition-all duration-200 cursor-pointer hover:scale-[1.01] ${
                viewMode === 'list' ? 'flex items-center justify-between' : ''
              }`}
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                <div className="flex items-start justify-between mb-2">
                  {editingProjectId === project.id ? (
                    <Input
                      value={editingProjectName}
                      onChange={(e) => setEditingProjectName(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          handleRenameProject(project.id, editingProjectName);
                        } else if (e.key === 'Escape') {
                          setEditingProjectId(null);
                        }
                      }}
                      onBlur={() => handleRenameProject(project.id, editingProjectName)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-10 max-w-[200px] bg-input border-border text-foreground"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 gradient-circle rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <FileCode className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{project.name}</h3>
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border">
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}`);
                        }}
                        className="text-popover-foreground hover:bg-secondary focus:bg-secondary"
                      >
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Open Project
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}?tab=code`);
                        }}
                        className="text-popover-foreground hover:bg-secondary focus:bg-secondary"
                      >
                        <FileCode className="mr-2 h-4 w-4" />
                        View Files
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProjectId(project.id);
                          setEditingProjectName(project.name);
                        }}
                        className="text-popover-foreground hover:bg-secondary focus:bg-secondary"
                      >
                        <Edit3 className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive hover:bg-secondary focus:bg-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {project.description || 'No description provided'}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{project.updatedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.visibility === 'public' ? (
                      <Globe className="h-4 w-4 text-accent" />
                    ) : (
                      <Lock className="h-4 w-4 text-orange-500" />
                    )}
                    <span className="capitalize">{project.visibility}</span>
                  </div>
                  {project.filesCount && (
                    <div className="flex items-center gap-2">
                      <FileCode className="h-4 w-4" />
                      <span>{project.filesCount} files</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={`flex gap-2 ${viewMode === 'grid' ? 'mt-4' : ''}`}>
                <Link to={`/project/${project.id}`} className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Open Project
                  </Button>
                </Link>
                {project.deploymentUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    onClick={() => window.open(project.deploymentUrl, '_blank')}
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}