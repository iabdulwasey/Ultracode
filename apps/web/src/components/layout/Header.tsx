import { Link, useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useDevModeStore } from '@/stores/devModeStore';
import { FolderOpen, Share2, Bell, Github, LogOut, Settings, CreditCard, HelpCircle, GitBranch, Download, Globe, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RadioToggle } from '@/components/ui/radio-toggle';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const { user, signOut } = useAuthStore();
  const { isDevMode, setDevMode } = useDevModeStore();
  const { id: projectId } = useParams();
  const location = useLocation();
  const [currentProject, setCurrentProject] = useState<{ name: string; deploymentUrl?: string } | null>(null);
  
  const isProjectPage = location.pathname.includes('/project/');
  
  useEffect(() => {
    if (projectId && isProjectPage) {
      loadCurrentProject();
    } else {
      setCurrentProject(null);
    }
  }, [projectId, isProjectPage]);
  
  const loadCurrentProject = async () => {
    try {
      const { data } = await supabase
        .from('projects')
        .select('name, deployment_url')
        .eq('id', projectId)
        .single();
        
      if (data) {
        setCurrentProject({
          name: data.name,
          deploymentUrl: data.deployment_url
        });
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    }
  };

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.fullName) return '?';
    const nameParts = user.fullName.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.fullName[0].toUpperCase();
  };


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-card border-b border-border flex items-center justify-between px-4 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <Link to="/workspace" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-3 h-3 gradient-circle rounded-full animate-gradient-pulse"></div>
          <span className="font-semibold text-foreground gradient-text">Ultracode</span>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
              <FolderOpen className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {currentProject ? currentProject.name : 'Project'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border-border text-popover-foreground">
            <DropdownMenuItem asChild className="hover:bg-secondary focus:bg-secondary">
              <Link to="/workspace">AI Workspace</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-secondary focus:bg-secondary">
              <Link to="/dashboard">All Projects</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-secondary focus:bg-secondary">
              <Link to="/new">Create New Project</Link>
            </DropdownMenuItem>
            {currentProject && (
              <>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                  Project Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                  Remix Project
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="h-5 border-l border-border mx-1"></div>
        
        <RadioToggle
          checked={isDevMode}
          onCheckedChange={setDevMode}
          label="Dev Mode"
        />
      </div>

      <div className="flex items-center space-x-2">
        {/* Project Actions - Only show on project pages */}
        {isProjectPage && currentProject && (
          <>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary h-8 w-8">
              <GitBranch className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            
            <div className="h-5 border-l border-border mx-2"></div>
            
            {currentProject.deploymentUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(currentProject.deploymentUrl, '_blank')}
                className="border-border hover:bg-secondary transition-all duration-200 group h-8 px-3"
              >
                <Globe className="mr-1.5 h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs">Live</span>
              </Button>
            )}
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90 glow-primary transition-all duration-200 group h-8 px-3"
            >
              <Play className="mr-1.5 h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs">Deploy</span>
            </Button>
          </>
        )}
        
        {/* Global Actions - Always show */}
        {!isProjectPage && (
          <>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary h-8 w-8">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </>
        )}
        
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full glow-primary"></span>
        </Button>
        
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border-border text-popover-foreground" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.fullName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem 
                className="hover:bg-secondary focus:bg-secondary"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}