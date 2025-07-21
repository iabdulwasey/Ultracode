#!/usr/bin/env node

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Pool } = pg;

async function setupRLS() {
  console.log('🔒 Setting up Row Level Security...');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Read RLS migration file
    const migrationPath = path.join(__dirname, '..', 'packages', 'database', 'migrations', '002_enable_rls.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Execute migration
    console.log('📝 Applying RLS policies...');
    await pool.query(migrationSQL);
    
    console.log('✅ Row Level Security setup complete!');
    console.log('🎉 Your database is now properly secured with RLS policies.');
  } catch (error) {
    console.error('❌ RLS setup failed:', error);
    console.log('\n💡 You can also run this manually in the Supabase SQL editor.');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupRLS();