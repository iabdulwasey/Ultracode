import { SandpackProvider, SandpackPreview, SandpackThemeProvider } from '@codesandbox/sandpack-react';
import { useTheme } from '@/components/theme-provider';
import { useFileStore } from '@/stores/fileStore';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PreviewPaneProps {
  projectId: string;
}

export function PreviewPane({ projectId }: PreviewPaneProps) {
  const { theme } = useTheme();
  const { files } = useFileStore();
  const [sandpackFiles, setSandpackFiles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert our file structure to Sandpack format
    const convertedFiles: Record<string, string> = {};
    
    Object.entries(files).forEach(([path, file]) => {
      // Sandpack expects paths to start with /
      const sandpackPath = path.startsWith('/') ? path : `/${path}`;
      convertedFiles[sandpackPath] = file.content;
    });

    // Add default files if they don't exist
    if (!convertedFiles['/package.json']) {
      convertedFiles['/package.json'] = JSON.stringify({
        name: 'ultracode-project',
        version: '0.1.0',
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          'react-scripts': '5.0.1',
          'clsx': '^2.0.0',
          'tailwind-merge': '^2.0.0'
        },
        devDependencies: {
          '@types/react': '^18.2.0',
          '@types/react-dom': '^18.2.0',
          'typescript': '^5.0.0'
        }
      }, null, 2);
    }

    // Add App.tsx if no main entry exists
    if (!convertedFiles['/src/App.tsx'] && !convertedFiles['/src/App.jsx'] && !convertedFiles['/App.tsx']) {
      // Check if there's a component to use as main
      const hasLandingPage = Object.keys(convertedFiles).find(path => 
        path.includes('LandingPage') || path.includes('landingPage')
      );
      
      if (hasLandingPage) {
        const componentName = hasLandingPage.includes('LandingPage') ? 'LandingPage' : 'landingPage';
        convertedFiles['/src/App.tsx'] = `import React from 'react';
import { ${componentName} } from '.${hasLandingPage.replace('.tsx', '').replace('.jsx', '')}';

export default function App() {
  return <${componentName} />;
}`;
      } else {
        convertedFiles['/src/App.tsx'] = `import React from 'react';

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Your Ultracode Project</h1>
      <p className="text-gray-600 mt-2">Start editing your files to see changes!</p>
    </div>
  );
}`;
      }
    }

    // Add index.tsx if it doesn't exist
    if (!convertedFiles['/src/index.tsx'] && !convertedFiles['/src/index.jsx']) {
      convertedFiles['/src/index.tsx'] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
    }

    // Add basic CSS if none exists
    if (!convertedFiles['/src/index.css'] && !convertedFiles['/index.css']) {
      convertedFiles['/src/index.css'] = `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
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
}`;
    }

    // Add public/index.html if it doesn't exist
    if (!convertedFiles['/public/index.html']) {
      convertedFiles['/public/index.html'] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ultracode Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
    }

    setSandpackFiles(convertedFiles);
    setLoading(false);
  }, [files]);

  if (loading || Object.keys(sandpackFiles).length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <SandpackProvider
      template="react-ts"
      theme={theme === 'dark' ? 'dark' : 'light'}
      files={sandpackFiles}
      options={{
        showNavigator: false,
        showTabs: false,
        showLineNumbers: false,
        showInlineErrors: true,
        wrapContent: true,
        editorHeight: "100%",
        bundlerURL: "https://sandpack-bundler.codesandbox.io",
        skipEval: false,
        autorun: true,
      }}
      customSetup={{
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          'clsx': '^2.0.0',
          'tailwind-merge': '^2.0.0',
        }
      }}
    >
      <div className="h-full">
        <SandpackPreview 
          showOpenInCodeSandbox={false}
          showRefreshButton={true}
          style={{ height: '100%' }}
        />
      </div>
    </SandpackProvider>
  );
}