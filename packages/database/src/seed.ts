import pg from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../../../.env') });

const { Client } = pg;

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create demo user
    const demoUserId = uuidv4();
    const passwordHash = await bcrypt.hash('demo123!', 10);

    await client.query(
      `INSERT INTO users (id, email, password_hash, full_name, role, email_verified) 
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING`,
      [demoUserId, 'demo@ultracode.dev', passwordHash, 'Demo User', 'user', true]
    );

    // Get the user ID (in case it already existed)
    const userResult = await client.query(
      'SELECT id FROM users WHERE email = $1',
      ['demo@ultracode.dev']
    );
    const userId = userResult.rows[0].id;

    // Create billing record
    await client.query(
      `INSERT INTO billing (user_id, plan_type, credits_remaining) 
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId, 'pro', 100]
    );

    // Create demo projects
    const projects = [
      {
        name: 'E-commerce Platform',
        description: 'A modern online shopping experience with cart and checkout',
        visibility: 'public',
        techStack: { frontend: 'react', styling: 'tailwind', backend: 'supabase' }
      },
      {
        name: 'Task Management App',
        description: 'Collaborate with your team using Kanban boards',
        visibility: 'private',
        techStack: { frontend: 'react', styling: 'tailwind', backend: 'supabase' }
      },
      {
        name: 'Portfolio Website',
        description: 'Showcase your work with a beautiful portfolio',
        visibility: 'public',
        techStack: { frontend: 'react', styling: 'tailwind' }
      }
    ];

    for (const project of projects) {
      const projectId = uuidv4();
      
      await client.query(
        `INSERT INTO projects (id, user_id, name, description, visibility, tech_stack) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [projectId, userId, project.name, project.description, project.visibility, project.techStack]
      );

      // Add sample files
      await client.query(
        `INSERT INTO project_files (project_id, path, content, type) VALUES
         ($1, 'src/App.tsx', '// Main application component', 'typescript'),
         ($1, 'src/index.css', '/* Global styles */', 'css'),
         ($1, 'package.json', '{"name": "demo-app", "version": "1.0.0"}', 'json')`,
        [projectId]
      );

      // Add chat session
      await client.query(
        `INSERT INTO chat_sessions (project_id, user_id, messages) 
         VALUES ($1, $2, $3)`,
        [projectId, userId, JSON.stringify([
          { role: 'user', content: 'Create a basic app structure', timestamp: new Date() },
          { role: 'assistant', content: 'I\'ve created the basic app structure for you!', timestamp: new Date() }
        ])]
      );
    }

    console.log('Seed data created successfully');
    console.log('Demo credentials:');
    console.log('Email: demo@ultracode.dev');
    console.log('Password: demo123!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed();
}

export { seed };