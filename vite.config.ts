import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional — ensures stable port
    open: true, // auto-open browser when running `npm run dev`
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // local API server (Express or similar)
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
