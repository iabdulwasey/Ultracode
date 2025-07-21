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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-2">
          What would you like to build today?
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-secondary' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-secondary' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Link to="/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'No projects found matching your search.' : 'No projects yet.'}
          </p>
          <Link to="/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Project
            </Button>
          </Link>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer ${
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
                      className="h-8 max-w-[200px]"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}`);
                      }}>
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Open Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}?tab=code`);
                      }}>
                        <FileCode className="mr-2 h-4 w-4" />
                        View Files
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        setEditingProjectId(project.id);
                        setEditingProjectName(project.name);
                      }}>
                        <Edit3 className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
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
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description || 'No description'}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {project.updatedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    {project.visibility === 'public' ? (
                      <Globe className="h-3 w-3" />
                    ) : (
                      <Lock className="h-3 w-3" />
                    )}
                    {project.visibility}
                  </div>
                </div>
              </div>
              <div className={`flex gap-2 ${viewMode === 'grid' ? 'mt-4' : ''}`}>
                <Link to={`/project/${project.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Open
                  </Button>
                </Link>
                {project.deploymentUrl && (
                  <Button
                    variant="outline"
                    size="icon"
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