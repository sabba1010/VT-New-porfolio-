import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isPreview }) => ({
  plugins: [react()],
  // Dev server: SPA fallback. `vite preview`: serve each prerendered
  // dist/<route>/index.html directly, exactly like production hosting.
  appType: isPreview ? 'mpa' : 'spa',
}));
