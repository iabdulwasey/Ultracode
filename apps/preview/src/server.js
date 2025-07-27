// Preview server for Ultracode
// This handles the preview iframe functionality for generated applications

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PREVIEW_PORT || 3003;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.static('public'));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'preview-server',
    timestamp: new Date().toISOString() 
  });
});

// Serve preview content
app.get('/preview/:projectId', (req, res) => {
  const { projectId } = req.params;
  
  // For now, this is a placeholder that will be enhanced
  // when we integrate with the actual preview system
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Preview - ${projectId}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root">
          <h1>Preview Server</h1>
          <p>Project ID: ${projectId}</p>
          <p>This preview server is ready for integration with Daytona containers.</p>
        </div>
      </body>
    </html>
  `);
});

// Start server
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Preview server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export { app };
