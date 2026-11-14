/**
 * AI chat endpoint (shared by the Vercel function in /api and the Vite dev server).
 * Streams the assistant's reply back as plain text.
 *
 * With ANTHROPIC_API_KEY set, replies come from Claude. Without it (or if the
 * API fails) replies come from the local answer engine in chat-local.js.
 * Set ANTHROPIC_API_KEY in the environment (Vercel → Project → Settings →
 * Environment Variables; locally in a .env file). The key never reaches the browser.
 */
import Anthropic from '@anthropic-ai/sdk';
import { CHAT_SYSTEM_PROMPT } from '../src/data/chatKnowledge.js';
import { localReply } from './chat-local.js';

const MODEL = 'claude-opus-5-5';
const MAX_TURNS = 16; // history sent per request
const MAX_CHARS = 2000; // per message
const RATE = { windowMs: 10 * 60 * 1000, max: 25 }; // per IP, per server instance

let client;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > RATE.max;
}

/** Accept only a clean user/assistant alternation that ends with the user. */
function sanitize(raw) {
  if (!Array.isArray(raw)) return null;
  const msgs = raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_TURNS);
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return null;
  return msgs;
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body; // Vercel parses JSON for us
  let data = '';
  for await (const chunk of req) {
    data += chunk;
    if (data.length > 100_000) throw new Error('Body too large');
  }
  return JSON.parse(data || '{}');
}

function send(res, status, text) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(text);
}

export async function handleChat(req, res) {
  if (req.method !== 'POST') return send(res, 405, 'Method not allowed');

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return send(res, 429, 'Too many messages — please wait a few minutes.');

  let messages;
  try {
    messages = sanitize((await readJson(req)).messages);
  } catch {
    messages = null;
  }
  if (!messages) return send(res, 400, 'Invalid conversation.');

  // No API key yet → answer from the site's own content so visitors can still chat
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    res.setHeader('X-Chat-Mode', 'local');
    return send(res, 200, localReply(messages));
  }

  client ??= new Anthropic();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Accel-Buffering', 'no');

  let wroteText = false;
  try {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 4000, // short chat replies; caps cost per message
      output_config: { effort: 'low' }, // chat: fast, concise answers
      // Thinking is always on for this model (adaptive); only text is forwarded.
      // A policy decline is retried server-side on a fallback model.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: [{ type: 'text', text: CHAT_SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
    });

    req.on?.('close', () => stream.abort());

    stream.on('text', (delta) => {
      wroteText = true;
      res.write(delta);
    });

    const final = await stream.finalMessage();
    if (!wroteText && final.stop_reason === 'refusal') {
      res.write("Sorry, I can't help with that here. For anything about your project, please reach out via /contact.");
    }
    res.end();
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      console.error('[chat] rate limited by API');
    } else if (err instanceof Anthropic.AuthenticationError) {
      console.error('[chat] invalid ANTHROPIC_API_KEY');
    } else if (err instanceof Anthropic.APIError) {
      console.error(`[chat] API error ${err.status}:`, err.message);
    } else if (err?.name !== 'APIUserAbortError') {
      console.error('[chat] error:', err);
    }
    if (!res.writableEnded) {
      // API failed before any text was sent → fall back to the local answer engine
      if (!wroteText && err?.name !== 'APIUserAbortError') return res.end(localReply(messages));
      res.end();
    }
  }
}
