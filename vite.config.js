import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { outDir: 'docs' },
  // Use a custom cache directory to avoid EPERM rmdir issues under OneDrive on Windows
  cacheDir: 'node_modules/.vite-cache',
});
