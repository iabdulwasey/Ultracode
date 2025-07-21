-- Create deployments table
CREATE TABLE IF NOT EXISTS deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL CHECK (provider IN ('netlify', 'vercel')),
  url TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add deployment_url to projects table if it doesn't exist
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS deployment_url TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_deployments_project_id ON deployments(project_id);
CREATE INDEX IF NOT EXISTS idx_deployments_created_at ON deployments(created_at DESC);

-- Enable RLS
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;

-- RLS policy: Users can only see deployments for their own projects
CREATE POLICY "Users can view own project deployments" ON deployments
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- RLS policy: Users can create deployments for their own projects
CREATE POLICY "Users can create deployments for own projects" ON deployments
  FOR INSERT WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- RLS policy: Users can update deployments for their own projects
CREATE POLICY "Users can update own project deployments" ON deployments
  FOR UPDATE USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_deployments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deployments_updated_at
  BEFORE UPDATE ON deployments
  FOR EACH ROW
  EXECUTE FUNCTION update_deployments_updated_at();