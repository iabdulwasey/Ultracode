-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Projects table policies
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public projects are viewable by all" ON projects
  FOR SELECT USING (visibility = 'public');

-- Project files policies
CREATE POLICY "Users can view files of own projects" ON project_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert files to own projects" ON project_files
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update files in own projects" ON project_files
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete files from own projects" ON project_files
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Chat sessions policies
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON chat_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions" ON chat_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Billing policies
CREATE POLICY "Users can view own billing" ON billing
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage billing" ON billing
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Audit logs policies
CREATE POLICY "Users can view own audit logs" ON audit_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Function to automatically set user_id on insert
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to projects table
CREATE TRIGGER set_project_user_id
  BEFORE INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

-- Apply the trigger to chat_sessions table
CREATE TRIGGER set_chat_session_user_id
  BEFORE INSERT ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();