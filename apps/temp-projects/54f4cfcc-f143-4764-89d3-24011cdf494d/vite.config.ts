import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4016,
    strictPort: false,
    hmr: false
  },
  build: {
    target: 'es2020',
    sourcemap: false
  }
})