import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/authStore';
import {
  Plus,
  Search,
  Grid,
  List,
  Clock,
  Globe,
  Lock,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Project {
  id: string;
  name: string;
  description: string;
  visibility: 'public' | 'private';
  updatedAt: string;
  deploymentUrl?: string;
  thumbnail?: string;
}

// Mock data for demo
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A modern online shopping experience',
    visibility: 'public',
    updatedAt: '2 hours ago',
    deploymentUrl: 'https://demo-shop.netlify.app',
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Collaborate with your team efficiently',
    visibility: 'private',
    updatedAt: '1 day ago',
  },
  {
    id: '3',
    name: 'Portfolio Website',
    description: 'Showcase your work beautifully',
    visibility: 'public',
    updatedAt: '3 days ago',
    deploymentUrl: 'https://my-portfolio.vercel.app',
  },
];

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects] = useState(mockProjects);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
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
              className={`border rounded-lg p-6 hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex items-center justify-between' : ''
              }`}
            >
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
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