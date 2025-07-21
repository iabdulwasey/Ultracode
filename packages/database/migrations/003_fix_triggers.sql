-- Drop the existing triggers that might be causing conflicts
DROP TRIGGER IF EXISTS set_project_user_id ON projects;
DROP TRIGGER IF EXISTS set_chat_session_user_id ON chat_sessions;
DROP FUNCTION IF EXISTS set_user_id();

-- Add a column to projects table if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS template VARCHAR(50);

-- Make sure the foreign key constraint exists
ALTER TABLE projects 
  DROP CONSTRAINT IF EXISTS projects_user_id_fkey,
  ADD CONSTRAINT projects_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Update RLS policies to use auth.uid() properly
DROP POLICY IF EXISTS "Users can insert own projects" ON projects;
CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Function to handle OAuth user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, email_verified)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'user',
    true
  );
  
  INSERT INTO public.billing (user_id, plan_type, credits_remaining, credits_used)
  VALUES (new.id, 'free', 5, 0);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();