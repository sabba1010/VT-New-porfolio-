import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/** Serves POST /api/chat during `npm run dev` (Vercel runs api/chat.js in production). */
function devChatApi() {
  return {
    name: 'dev-chat-api',
    apply: 'serve',
    configureServer(server) {
      // make ANTHROPIC_API_KEY from .env / .env.local available to the handler
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), 'ANTHROPIC_'));
      server.middlewares.use('/api/chat', async (req, res) => {
        const { handleChat } = await server.ssrLoadModule('/server/chat-handler.js');
        await handleChat(req, res);
      });
    },
  };
}

export default defineConfig(({ isPreview }) => ({
  plugins: [react(), devChatApi()],
  // Dev server: SPA fallback. `vite preview`: serve each prerendered
  // dist/<route>/index.html directly, exactly like production hosting.
  appType: isPreview ? 'mpa' : 'spa',
}));
