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
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  // Dynamically build timeline based on what AI is actually generating
  useEffect(() => {
    const detectedSteps = detectStepsFromContent(content);
    setSteps(detectedSteps);
    
    if (!isStreaming) {
      // Mark all steps as completed when streaming ends
      setCurrentStepIndex(-1); // No active step when done
    } else {
      // Find the current active step based on most recent activity
      const activeIndex = findCurrentActiveStep(content, detectedSteps);
      setCurrentStepIndex(activeIndex);
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
          const isCompleted = !isStreaming || index < currentStepIndex;
          const isActive = isStreaming && index === currentStepIndex;
          const isPending = isStreaming && index > currentStepIndex;

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

// Dynamically detect steps as AI generates files in real-time
function detectStepsFromContent(content: string): GenerationStep[] {
  const steps: GenerationStep[] = [];
  const addedSteps = new Set<string>();

  // Helper function to add step if not already added
  const addStep = (step: GenerationStep) => {
    if (!addedSteps.has(step.id)) {
      steps.push(step);
      addedSteps.add(step.id);
    }
  };

  // Always start with setup if we have any code
  if (content.includes('```')) {
    addStep({
      id: 'setup',
      title: 'Setting up project structure',
      description: 'Initializing React application with TypeScript',
      status: 'pending',
      icon: Package,
      type: 'setup',
    });
  }

  // Detect package.json
  if (content.match(/```(?:json|javascript)?\s*package\.json/i)) {
    addStep({
      id: 'dependencies',
      title: 'Installing dependencies',
      description: 'Setting up React, TypeScript, and Tailwind CSS',
      status: 'pending',
      icon: Settings,
      type: 'config',
    });
  }

  // Detect main App.tsx
  if (content.match(/```(?:typescript|tsx)?\s*src\/App\.tsx/i)) {
    addStep({
      id: 'main-app',
      title: 'Creating main application',
      description: 'Building the core App component with routing',
      status: 'pending',
      icon: Globe,
      type: 'component',
    });
  }

  // Dynamically detect components as they appear
  const componentMatches = [...content.matchAll(/```(?:typescript|tsx)?\s*src\/components\/(\w+)\.tsx/gi)];
  const uniqueComponents = [...new Set(componentMatches.map(match => match[1]))];
  
  uniqueComponents.forEach((componentName) => {
    addStep({
      id: `component-${componentName.toLowerCase()}`,
      title: `Creating ${componentName} component`,
      description: `Building the ${componentName} component with styling`,
      status: 'pending',
      icon: FileCode,
      type: 'component',
    });
  });

  // Dynamically detect pages as they appear
  const pageMatches = [...content.matchAll(/```(?:typescript|tsx)?\s*src\/pages\/(\w+)\.tsx/gi)];
  const uniquePages = [...new Set(pageMatches.map(match => match[1]))];
  
  uniquePages.forEach((pageName) => {
    addStep({
      id: `page-${pageName.toLowerCase()}`,
      title: `Creating ${pageName} page`,
      description: `Building the ${pageName} page layout`,
      status: 'pending',
      icon: Folder,
      type: 'component',
    });
  });

  // Remove hardcoded styling step - let it appear naturally with other files

  return steps;
}

// Find which step is currently being worked on based on the most recent file generation
function findCurrentActiveStep(content: string, steps: GenerationStep[]): number {
  if (!content.includes('```') || steps.length === 0) {
    return -1;
  }

  // Find the last (most recent) file being generated by looking at code blocks in reverse order
  const codeBlocks = [...content.matchAll(/```(?:\w+)?\s*([^\n]+)/g)];
  if (codeBlocks.length === 0) {
    return 0; // Setup step
  }

  // Get the most recent file path
  const lastBlock = codeBlocks[codeBlocks.length - 1];
  const filePath = lastBlock[1].trim();

  // Map file paths to step indices
  for (let i = steps.length - 1; i >= 0; i--) {
    const step = steps[i];
    
    // Check if this step matches the current file being generated
    if (step.id === 'setup' && i === 0) continue; // Skip setup check
    if (step.id === 'dependencies' && filePath.includes('package.json')) return i;
    if (step.id === 'main-app' && filePath.includes('src/App.tsx')) return i;
    if (step.id.startsWith('component-') && filePath.includes('src/components/')) {
      const componentName = step.id.replace('component-', '');
      if (filePath.toLowerCase().includes(componentName)) return i;
    }
    if (step.id.startsWith('page-') && filePath.includes('src/pages/')) {
      const pageName = step.id.replace('page-', '');
      if (filePath.toLowerCase().includes(pageName)) return i;
    }
  }

  // If we can't match a specific file, return the last step that should be completed
  const completedStepCount = Math.min(codeBlocks.length, steps.length);
  return Math.max(0, completedStepCount - 1);
}