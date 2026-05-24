import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署路徑：https://gmcycle7.github.io/ai-software-investment-map/
  base: '/ai-software-investment-map/',
  server: {
    port: 5173,
    open: false,
  },
});
