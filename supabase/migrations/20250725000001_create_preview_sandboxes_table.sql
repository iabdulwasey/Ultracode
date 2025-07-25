-- Create preview_sandboxes table for Daytona integration
CREATE TABLE IF NOT EXISTS preview_sandboxes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sandbox_id TEXT NOT NULL UNIQUE,
  preview_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'creating' CHECK (status IN ('creating', 'syncing', 'building', 'ready', 'error', 'stopped')),
  project_type TEXT DEFAULT 'react-vite' CHECK (project_type IN ('nextjs', 'react-vite', 'vanilla', 'custom')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 minutes')
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_preview_sandboxes_project_id ON preview_sandboxes(project_id);
CREATE INDEX IF NOT EXISTS idx_preview_sandboxes_user_id ON preview_sandboxes(user_id);
CREATE INDEX IF NOT EXISTS idx_preview_sandboxes_sandbox_id ON preview_sandboxes(sandbox_id);
CREATE INDEX IF NOT EXISTS idx_preview_sandboxes_status ON preview_sandboxes(status);
CREATE INDEX IF NOT EXISTS idx_preview_sandboxes_last_accessed ON preview_sandboxes(last_accessed);
CREATE INDEX IF NOT EXISTS idx_preview_sandboxes_expires_at ON preview_sandboxes(expires_at);

-- Enable Row Level Security
ALTER TABLE preview_sandboxes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own project sandboxes"
  ON preview_sandboxes FOR SELECT
  USING (
    user_id = auth.uid() OR
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create sandboxes for their projects"
  ON preview_sandboxes FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their project sandboxes"
  ON preview_sandboxes FOR UPDATE
  USING (
    user_id = auth.uid() OR
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their project sandboxes"
  ON preview_sandboxes FOR DELETE
  USING (
    user_id = auth.uid() OR
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_preview_sandboxes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER trigger_update_preview_sandboxes_updated_at
  BEFORE UPDATE ON preview_sandboxes
  FOR EACH ROW
  EXECUTE FUNCTION update_preview_sandboxes_updated_at();

-- Function to clean up expired sandboxes
CREATE OR REPLACE FUNCTION cleanup_expired_sandboxes()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM preview_sandboxes 
  WHERE expires_at < NOW() AND status != 'ready';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ language plpgsql;

-- Create sandbox usage statistics view
CREATE OR REPLACE VIEW sandbox_usage_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_sandboxes,
  COUNT(*) FILTER (WHERE status = 'ready') as successful_sandboxes,
  COUNT(*) FILTER (WHERE status = 'error') as failed_sandboxes,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_setup_time_seconds,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT project_id) as unique_projects
FROM preview_sandboxes
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Grant permissions for the view
GRANT SELECT ON sandbox_usage_stats TO authenticated;

-- Create sandbox activity view for users
CREATE OR REPLACE VIEW user_sandbox_activity AS
SELECT 
  ps.id,
  ps.project_id,
  p.name as project_name,
  ps.sandbox_id,
  ps.preview_url,
  ps.status,
  ps.project_type,
  ps.created_at,
  ps.last_accessed,
  ps.expires_at,
  CASE 
    WHEN ps.expires_at < NOW() THEN 'expired'
    WHEN ps.status = 'ready' THEN 'active'
    WHEN ps.status IN ('creating', 'syncing', 'building') THEN 'starting'
    ELSE 'inactive'
  END as current_state
FROM preview_sandboxes ps
JOIN projects p ON ps.project_id = p.id
WHERE ps.user_id = auth.uid()
ORDER BY ps.last_accessed DESC;

-- Grant permissions for the user view
GRANT SELECT ON user_sandbox_activity TO authenticated;

-- Comment on table and columns
COMMENT ON TABLE preview_sandboxes IS 'Stores information about Daytona sandbox instances for live previews';
COMMENT ON COLUMN preview_sandboxes.sandbox_id IS 'Unique identifier from Daytona service';
COMMENT ON COLUMN preview_sandboxes.preview_url IS 'Public URL to access the live preview';
COMMENT ON COLUMN preview_sandboxes.status IS 'Current status of the sandbox setup process';
COMMENT ON COLUMN preview_sandboxes.project_type IS 'Type of project (nextjs, react-vite, etc.)';
COMMENT ON COLUMN preview_sandboxes.metadata IS 'Additional metadata about the sandbox';
COMMENT ON COLUMN preview_sandboxes.expires_at IS 'When the sandbox should be automatically cleaned up';