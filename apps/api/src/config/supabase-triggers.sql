-- File change detection trigger for real-time updates
-- This trigger will notify the WebSocket service when project files are updated

-- Create function to notify file changes
CREATE OR REPLACE FUNCTION notify_file_changes()
RETURNS trigger AS $$
BEGIN
  -- Notify about file changes for real-time updates
  PERFORM pg_notify(
    'file_change',
    json_build_object(
      'project_id', COALESCE(NEW.project_id, OLD.project_id),
      'file_path', COALESCE(NEW.path, OLD.path),
      'action', TG_OP,
      'user_id', COALESCE(NEW.user_id, OLD.user_id),
      'timestamp', NOW()
    )::text
  );
  
  -- Return appropriate record based on operation
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on project_files table for INSERT, UPDATE, DELETE
DROP TRIGGER IF EXISTS file_change_trigger ON project_files;
CREATE TRIGGER file_change_trigger
  AFTER INSERT OR UPDATE OR DELETE ON project_files
  FOR EACH ROW
  EXECUTE FUNCTION notify_file_changes();

-- Create function to notify project updates (for when multiple files change at once)
CREATE OR REPLACE FUNCTION notify_project_updates()
RETURNS trigger AS $$
BEGIN
  -- Notify about project updates that might affect multiple files
  PERFORM pg_notify(
    'project_update',
    json_build_object(
      'project_id', NEW.id,
      'action', 'files_bulk_update',
      'user_id', NEW.user_id,
      'timestamp', NOW()
    )::text
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on projects table for major updates
DROP TRIGGER IF EXISTS project_update_trigger ON projects;
CREATE TRIGGER project_update_trigger
  AFTER UPDATE OF updated_at ON projects
  FOR EACH ROW
  WHEN (OLD.updated_at IS DISTINCT FROM NEW.updated_at)
  EXECUTE FUNCTION notify_project_updates();

-- Grant necessary permissions for triggers to work
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres, service_role;

-- Enable Row Level Security policies for real-time access
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;

-- Create policy for real-time subscriptions (users can only see their own project files)
CREATE POLICY "Users can see own project files for real-time" ON project_files
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE user_id = auth.uid() 
      OR visibility = 'public'
    )
  );

-- Create policy for real-time updates (users can only update their own project files)
CREATE POLICY "Users can update own project files for real-time" ON project_files
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE user_id = auth.uid()
    )
  );

-- Instructions for setting up real-time listening in the application:
/*
To use these triggers in the WebSocket service, add a PostgreSQL listener:

1. Install pg package: npm install pg @types/pg
2. In your WebSocket service, add:

import { Client } from 'pg';

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL
});

pgClient.connect();

pgClient.on('notification', (msg) => {
  if (msg.channel === 'file_change') {
    const data = JSON.parse(msg.payload);
    // Broadcast to WebSocket clients
    webSocketService.broadcastFileUpdate(
      data.project_id,
      [], // Will need to fetch updated files
      data.user_id
    );
  }
});

pgClient.query('LISTEN file_change');
pgClient.query('LISTEN project_update');
*/