import { LocalPreview } from './LocalPreview';

interface EnhancedPreviewPaneProps {
  projectId: string;
  className?: string;
}

export function EnhancedPreviewPane({ projectId, className }: EnhancedPreviewPaneProps) {
  // For now, use LocalPreview as the default (much more reliable)
  // We can add a toggle between LocalPreview and DaytonaPreview later
  return <LocalPreview projectId={projectId} className={className} />;
}