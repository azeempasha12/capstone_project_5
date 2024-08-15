import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure this matches your publish directory
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
