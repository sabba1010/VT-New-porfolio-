// Vercel serverless function: POST /api/chat
import { handleChat } from '../server/chat-handler.js';

export const config = { maxDuration: 60 };

export default function handler(req, res) {
  return handleChat(req, res);
}
