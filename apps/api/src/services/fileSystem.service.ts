import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Projects will be stored in a 'projects' directory at the root
const PROJECTS_DIR = path.join(__dirname, '../../../../projects');

export class FileSystemService {
  static async ensureProjectsDirectory(): Promise<void> {
    try {
      await fs.mkdir(PROJECTS_DIR, { recursive: true });
    } catch (error) {
      logger.error('Failed to create projects directory:', error);
      throw error;
    }
  }

  static async createProjectDirectory(projectId: string): Promise<string> {
    const projectPath = path.join(PROJECTS_DIR, projectId);
    
    try {
      await fs.mkdir(projectPath, { recursive: true });
      
      // Create basic project structure
      await fs.mkdir(path.join(projectPath, 'src'), { recursive: true });
      await fs.mkdir(path.join(projectPath, 'public'), { recursive: true });
      
      // Create package.json
      const packageJson = {
        name: `project-${projectId}`,
        version: '0.1.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'tsc && vite build',
          preview: 'vite preview'
        },
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0'
        },
        devDependencies: {
          '@types/react': '^18.2.45',
          '@types/react-dom': '^18.2.18',
          '@vitejs/plugin-react': '^4.2.1',
          'typescript': '^5.3.3',
          'vite': '^5.0.10'
        }
      };
      
      await fs.writeFile(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );
      
      // Create vite.config.ts
      const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000 + Math.floor(Math.random() * 1000), // Random port to avoid conflicts
  }
})
`;
      
      await fs.writeFile(
        path.join(projectPath, 'vite.config.ts'),
        viteConfig
      );
      
      // Create tsconfig.json
      const tsConfig = {
        compilerOptions: {
          target: 'ES2022',
          useDefineForClassFields: true,
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true
        },
        include: ['src'],
        references: [{ path: './tsconfig.node.json' }]
      };
      
      await fs.writeFile(
        path.join(projectPath, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
      );
      
      // Create tsconfig.node.json
      const tsConfigNode = {
        compilerOptions: {
          composite: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'bundler',
          allowSyntheticDefaultImports: true
        },
        include: ['vite.config.ts']
      };
      
      await fs.writeFile(
        path.join(projectPath, 'tsconfig.node.json'),
        JSON.stringify(tsConfigNode, null, 2)
      );
      
      // Create index.html
      const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ultracode Project</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
      
      await fs.writeFile(
        path.join(projectPath, 'index.html'),
        indexHtml
      );
      
      // Create main.tsx
      const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
      
      await fs.writeFile(
        path.join(projectPath, 'src', 'main.tsx'),
        mainTsx
      );
      
      // Create App.tsx
      const appTsx = `import React from 'react'

function App() {
  return (
    <div>
      <h1>Welcome to your Ultracode project!</h1>
      <p>Start editing to see changes.</p>
    </div>
  )
}

export default App
`;
      
      await fs.writeFile(
        path.join(projectPath, 'src', 'App.tsx'),
        appTsx
      );
      
      // Create index.css
      const indexCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;
      
      await fs.writeFile(
        path.join(projectPath, 'src', 'index.css'),
        indexCss
      );
      
      logger.info(`Created project directory: ${projectPath}`);
      return projectPath;
    } catch (error) {
      logger.error('Failed to create project directory:', error);
      throw error;
    }
  }

  static async writeProjectFile(
    projectId: string, 
    filePath: string, 
    content: string
  ): Promise<void> {
    const projectPath = path.join(PROJECTS_DIR, projectId);
    const fullPath = path.join(projectPath, filePath);
    
    try {
      // Ensure directory exists
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      
      // Write file
      await fs.writeFile(fullPath, content, 'utf8');
      
      logger.debug(`Wrote file: ${fullPath}`);
    } catch (error) {
      logger.error(`Failed to write file ${fullPath}:`, error);
      throw error;
    }
  }

  static async deleteProjectFile(
    projectId: string, 
    filePath: string
  ): Promise<void> {
    const projectPath = path.join(PROJECTS_DIR, projectId);
    const fullPath = path.join(projectPath, filePath);
    
    try {
      await fs.unlink(fullPath);
      logger.debug(`Deleted file: ${fullPath}`);
    } catch (error) {
      logger.error(`Failed to delete file ${fullPath}:`, error);
      throw error;
    }
  }

  static async getProjectPath(projectId: string): Promise<string> {
    return path.join(PROJECTS_DIR, projectId);
  }

  static async projectExists(projectId: string): Promise<boolean> {
    const projectPath = path.join(PROJECTS_DIR, projectId);
    try {
      await fs.access(projectPath);
      return true;
    } catch {
      return false;
    }
  }
}