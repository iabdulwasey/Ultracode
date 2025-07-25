import { supabase } from '../config/supabase.js';
import fetch from 'node-fetch';

export interface DeploymentConfig {
  provider: 'netlify' | 'vercel';
  projectId: string;
  userId: string;
  files: Record<string, string>; // path -> content
  projectName: string;
  env?: Record<string, string>;
}

export class DeploymentService {
  async deployToNetlify(config: DeploymentConfig) {
    const { projectId, files, projectName, env } = config;
    
    const netlifyToken = process.env.NETLIFY_ACCESS_TOKEN;
    if (!netlifyToken) {
      throw new Error('Netlify access token not configured');
    }

    // Prepare files for React deployment
    const deployFiles = { ...files };
    
    // Add netlify.toml for React SPA routing
    deployFiles['/netlify.toml'] = `
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
`;

    // Ensure package.json has build script
    if (deployFiles['/package.json']) {
      try {
        const packageJson = JSON.parse(deployFiles['/package.json']);
        if (!packageJson.scripts) {
          packageJson.scripts = {};
        }
        if (!packageJson.scripts.build) {
          packageJson.scripts.build = 'vite build';
        }
        if (!packageJson.scripts.preview) {
          packageJson.scripts.preview = 'vite preview';
        }
        deployFiles['/package.json'] = JSON.stringify(packageJson, null, 2);
      } catch (e) {
        console.error('Error parsing package.json:', e);
      }
    }

    try {
      // Create a new site
      const response = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${netlifyToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-')}-${Date.now()}`,
          custom_domain: null,
          processing_settings: {
            html: {
              pretty_urls: true,
            },
          },
          build_settings: {
            cmd: 'npm run build',
            dir: 'dist',
            env: env || {},
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Netlify API error: ${response.statusText}`);
      }

      const site = await response.json();
      
      // Deploy the files - Netlify will build the React app
      const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${site.id}/deploys`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${netlifyToken}`,
          'Content-Type': 'application/zip',
        },
        body: await this.createZipFromFiles(deployFiles),
      });

      if (!deployResponse.ok) {
        throw new Error(`Netlify deployment error: ${deployResponse.statusText}`);
      }

      const deployment = await deployResponse.json();

      // Save deployment info to database
      await this.saveDeployment({
        projectId,
        provider: 'netlify',
        url: deployment.deploy_ssl_url || deployment.url,
        status: 'deployed',
        metadata: {
          siteId: site.id,
          deployId: deployment.id,
        },
      });

      return {
        url: deployment.deploy_ssl_url || deployment.url,
        siteId: site.id,
        deployId: deployment.id,
      };
    } catch (error) {
      console.error('Netlify deployment error:', error);
      throw error;
    }
  }

  async deployToVercel(config: DeploymentConfig) {
    const { projectId, files, projectName, env } = config;
    
    const vercelToken = process.env.VERCEL_ACCESS_TOKEN;
    if (!vercelToken) {
      throw new Error('Vercel access token not configured');
    }

    // Prepare files for React deployment
    const deployFiles = { ...files };
    
    // Add vercel.json for SPA routing
    deployFiles['/vercel.json'] = JSON.stringify({
      rewrites: [{ source: '/(.*)', destination: '/index.html' }],
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      framework: 'vite',
    }, null, 2);

    // Ensure package.json has necessary scripts and dependencies
    if (deployFiles['/package.json']) {
      try {
        const packageJson = JSON.parse(deployFiles['/package.json']);
        if (!packageJson.scripts) {
          packageJson.scripts = {};
        }
        if (!packageJson.scripts.build) {
          packageJson.scripts.build = 'vite build';
        }
        if (!packageJson.scripts.dev) {
          packageJson.scripts.dev = 'vite';
        }
        
        // Ensure Vite is in devDependencies
        if (!packageJson.devDependencies) {
          packageJson.devDependencies = {};
        }
        if (!packageJson.devDependencies.vite) {
          packageJson.devDependencies.vite = '^5.0.0';
        }
        
        deployFiles['/package.json'] = JSON.stringify(packageJson, null, 2);
      } catch (e) {
        console.error('Error parsing package.json:', e);
      }
    }

    // Add vite.config.ts if it doesn't exist
    if (!deployFiles['/vite.config.ts'] && !deployFiles['/vite.config.js']) {
      deployFiles['/vite.config.ts'] = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
`;
    }

    try {
      // Create Vercel deployment
      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          files: Object.entries(deployFiles).map(([path, content]) => ({
            file: path.startsWith('/') ? path.slice(1) : path,
            data: Buffer.from(content).toString('base64'),
            encoding: 'base64',
          })),
          projectSettings: {
            framework: 'vite',
            buildCommand: 'npm run build',
            outputDirectory: 'dist',
            installCommand: 'npm install',
            nodeVersion: '18.x',
          },
          env: env || {},
          target: 'production',
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Vercel API error: ${error}`);
      }

      const deployment = await response.json();

      // Save deployment info to database
      await this.saveDeployment({
        projectId,
        provider: 'vercel',
        url: `https://${deployment.url}`,
        status: 'building',
        metadata: {
          deploymentId: deployment.id,
          readyState: deployment.readyState,
        },
      });

      return {
        url: `https://${deployment.url}`,
        deploymentId: deployment.id,
        status: deployment.readyState,
      };
    } catch (error) {
      console.error('Vercel deployment error:', error);
      throw error;
    }
  }

  private async createZipFromFiles(files: Record<string, string>): Promise<Buffer> {
    // For now, return a simple implementation
    // In production, use a proper zip library like archiver
    const JSZip = require('jszip');
    const zip = new JSZip();

    Object.entries(files).forEach(([path, content]) => {
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      zip.file(cleanPath, content);
    });

    return await zip.generateAsync({ type: 'nodebuffer' });
  }

  private async saveDeployment(deployment: {
    projectId: string;
    provider: string;
    url: string;
    status: string;
    metadata: any;
  }) {
    const { data, error } = await supabase
      .from('deployments')
      .insert({
        project_id: deployment.projectId,
        provider: deployment.provider,
        url: deployment.url,
        status: deployment.status,
        metadata: deployment.metadata,
      })
      .select()
      .single();

    if (error) throw error;

    // Update project with deployment URL
    await supabase
      .from('projects')
      .update({ deployment_url: deployment.url })
      .eq('id', deployment.projectId);

    return data;
  }

  async getDeployments(projectId: string) {
    const { data, error } = await supabase
      .from('deployments')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export const deploymentService = new DeploymentService();