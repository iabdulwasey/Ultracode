import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, FileCode, Folder, Package, Settings, Palette, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  icon: React.ComponentType<{ className?: string }>;
  type: 'setup' | 'component' | 'config' | 'styling';
}

interface GenerationTimelineProps {
  content: string;
  isStreaming?: boolean;
}

export function GenerationTimeline({ content, isStreaming }: GenerationTimelineProps) {
  const [steps, setSteps] = useState<GenerationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Parse the AI content and extract file creation activities
  useEffect(() => {
    const extractedSteps = parseContentForSteps(content);
    setSteps(extractedSteps);
    
    // Update progress based on content - this is where we move down the timeline as files are created
    if (!isStreaming) {
      // Mark all steps as completed when streaming ends
      setCurrentStep(extractedSteps.length);
    } else {
      // Gradually show progress during streaming based on code blocks found
      const completedSteps = countCompletedSteps(content);
      setCurrentStep(Math.min(completedSteps, extractedSteps.length - 1));
    }
  }, [content, isStreaming]);

  if (steps.length === 0) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4 animate-spin" />
        <span>Analyzing your request...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
          <FileCode className="h-4 w-4 text-blue-500" />
        </div>
        <div>
          <h3 className="font-medium">Building your application</h3>
          <p className="text-sm text-muted-foreground">
            {isStreaming ? 'Creating files and components...' : 'Application created successfully!'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep && isStreaming;
          const isPending = index > currentStep;

          return (
            <div key={step.id} className="flex items-start gap-3">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500',
                    isCompleted
                      ? 'bg-green-500/10 text-green-500'
                      : isActive
                      ? 'bg-blue-500/10 text-blue-500 animate-pulse'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-0.5 h-6 mt-1 transition-colors duration-500',
                      isCompleted ? 'bg-green-500/20' : 'bg-border'
                    )}
                  />
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0 pb-3">
                <div className="flex items-center gap-2">
                  <h4
                    className={cn(
                      'font-medium text-sm transition-colors duration-500',
                      isCompleted
                        ? 'text-green-700 dark:text-green-400'
                        : isActive
                        ? 'text-blue-700 dark:text-blue-400'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </h4>
                  {isActive && (
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  )}
                </div>
                <p
                  className={cn(
                    'text-xs mt-1 transition-colors duration-500',
                    isCompleted
                      ? 'text-green-600 dark:text-green-500'
                      : isActive
                      ? 'text-blue-600 dark:text-blue-500'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {!isStreaming && (
        <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            Application ready! Check the file explorer and preview.
          </span>
        </div>
      )}
    </div>
  );
}

// Parse AI content to extract file generation steps based on actual code blocks
function parseContentForSteps(content: string): GenerationStep[] {
  const steps: GenerationStep[] = [];
  
  // Always start with setup steps
  steps.push({
    id: 'setup',
    title: 'Setting up project structure',
    description: 'Creating package.json and configuration files',
    status: 'pending',
    icon: Package,
    type: 'setup',
  });

  // Look for specific file patterns in the content to create relevant steps
  const filePatterns = [
    { pattern: /```(?:json|javascript)?\s*package\.json/i, step: 'dependencies' },
    { pattern: /```(?:typescript|ts)?\s*vite\.config/i, step: 'vite-config' },
    { pattern: /```(?:javascript|js)?\s*tailwind\.config/i, step: 'tailwind-config' },
    { pattern: /```(?:typescript|tsx)?\s*src\/App\.tsx/i, step: 'main-app' },
    { pattern: /```(?:typescript|tsx)?\s*src\/components\/(\w+)\.tsx/gi, step: 'components' },
    { pattern: /```(?:typescript|tsx)?\s*src\/pages\/(\w+)\.tsx/gi, step: 'pages' },
  ];

  // Check for configuration files
  if (content.match(/```(?:json|javascript)?\s*package\.json/i)) {
    steps.push({
      id: 'dependencies',
      title: 'Installing dependencies',
      description: 'Setting up React, TypeScript, and Tailwind CSS',
      status: 'pending',
      icon: Settings,
      type: 'config',
    });
  }

  // Check for main app
  if (content.match(/```(?:typescript|tsx)?\s*src\/App\.tsx/i)) {
    steps.push({
      id: 'main-app',
      title: 'Creating main application',
      description: 'Building the core App component with routing',
      status: 'pending',
      icon: Globe,
      type: 'component',
    });
  }

  // Extract unique components
  const componentMatches = [...content.matchAll(/```(?:typescript|tsx)?\s*src\/components\/(\w+)\.tsx/gi)];
  const uniqueComponents = [...new Set(componentMatches.map(match => match[1]))];
  
  uniqueComponents.forEach((componentName) => {
    steps.push({
      id: `component-${componentName.toLowerCase()}`,
      title: `Creating ${componentName} component`,
      description: `Building the ${componentName} component with styling`,
      status: 'pending',
      icon: FileCode,
      type: 'component',
    });
  });

  // Extract unique pages
  const pageMatches = [...content.matchAll(/```(?:typescript|tsx)?\s*src\/pages\/(\w+)\.tsx/gi)];
  const uniquePages = [...new Set(pageMatches.map(match => match[1]))];
  
  uniquePages.forEach((pageName) => {
    steps.push({
      id: `page-${pageName.toLowerCase()}`,
      title: `Creating ${pageName} page`,
      description: `Building the ${pageName} page layout`,
      status: 'pending',
      icon: Folder,
      type: 'component',
    });
  });

  // Add styling step if Tailwind config is found
  if (content.includes('tailwind.config')) {
    steps.push({
      id: 'styling',
      title: 'Applying styles and theme',
      description: 'Setting up Tailwind CSS and responsive design',
      status: 'pending',
      icon: Palette,
      type: 'styling',
    });
  }

  return steps;
}

// Count how many steps should be marked as completed based on actual code blocks in content
function countCompletedSteps(content: string): number {
  // Count actual file creation patterns to determine progress
  const patterns = [
    /```(?:json|javascript)?\s*package\.json/i,
    /```(?:typescript|ts)?\s*vite\.config/i,
    /```(?:typescript|tsx)?\s*src\/App\.tsx/i,
    /```(?:typescript|tsx)?\s*src\/components\/\w+\.tsx/gi,
    /```(?:javascript|js)?\s*tailwind\.config/i,
  ];

  let completedCount = 0;
  
  // Always count setup as first step if any code is present
  if (content.includes('```')) {
    completedCount = 1;
  }

  // Count each pattern type as one step
  patterns.forEach(pattern => {
    if (content.match(pattern)) {
      completedCount++;
    }
  });

  // Count individual components (each component is a separate step)
  const componentMatches = content.match(/```(?:typescript|tsx)?\s*src\/components\/\w+\.tsx/gi);
  if (componentMatches) {
    completedCount += componentMatches.length - 1; // -1 because we already counted the pattern above
  }

  return completedCount;
}