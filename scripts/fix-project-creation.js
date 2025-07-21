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

async function fixProjectCreation() {
  console.log('🔧 Fixing project creation issue...');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Read fix migration file
    const migrationPath = path.join(__dirname, '..', 'packages', 'database', 'migrations', '003_fix_triggers.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Execute migration
    console.log('📝 Applying fixes...');
    await pool.query(migrationSQL);
    
    console.log('✅ Project creation fix complete!');
  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

fixProjectCreation();