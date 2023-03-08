import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'localhost:3000/',
      '/refesh-token': 'localhost:3000/',
      '/private': 'localhost:3000/',
    },
  },
});
