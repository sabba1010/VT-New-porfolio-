import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, ArrowUp, Sparkles, RotateCcw } from 'lucide-react';
import { site } from '../../data/site';
import { company, whatsappHref } from '../../data/content';
import './ChatWidget.css';

const STORE_KEY = 'velotech-chat';
const cfg = site.chat ?? {};
const botName = cfg.name || 'Assistant';

const load = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY)) ?? [];
  } catch {
    return [];
  }
};
const save = (msgs) => {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs.slice(-30)));
  } catch {
    /* storage unavailable — keep in memory only */
  }
};

/** Turns /paths, URLs and emails in plain-text replies into links. */
function RichText({ text }) {
  const parts = text.split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+|(?<![\w/])\/[a-z][\w\-/#]*)/gi);
  return parts.map((p, i) => {
    if (!p) return null;
    const clean = p.replace(/[.,!?;:]+$/, '');
    const tail = p.slice(clean.length);
    if (/^https?:\/\//i.test(clean))
      return (
        <Fragment key={i}>
          <a href={clean} target="_blank" rel="noopener noreferrer">{clean}</a>
          {tail}
        </Fragment>
      );
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(clean))
      return (
        <Fragment key={i}>
          <a href={`mailto:${clean}`}>{clean}</a>
          {tail}
        </Fragment>
      );
    if (/^\/[a-z]/i.test(clean))
      return (
        <Fragment key={i}>
          <Link to={clean}>{clean}</Link>
          {tail}
        </Fragment>
      );
    return <Fragment key={i}>{p}</Fragment>;
  });
}

const OFFLINE_REPLY = `I can't connect right now, but the team would love to hear from you — use the contact form at /contact or email ${company.email} and you'll get a reply within one business day.`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => setMessages(load()), []);
  useEffect(() => save(messages), [messages]);

  // keep the newest message in view
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  // Other parts of the site can open the chat (optionally with a question):
  // window.dispatchEvent(new CustomEvent('velotech:chat', { detail: 'question…' }))
  const sendRef = useRef(null);
  useEffect(() => {
    const onOpen = (e) => {
      setOpen(true);
      if (typeof e.detail === 'string' && e.detail) setTimeout(() => sendRef.current?.(e.detail), 250);
    };
    window.addEventListener('velotech:chat', onOpen);
    return () => window.removeEventListener('velotech:chat', onOpen);
  }, []);

  if (!cfg.enabled) return null;

  const send = async (text) => {
    const content = text.trim();
    if (!content || busy) return;
    const history = [...messages, { role: 'user', content }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    let reply = '';
    const update = (t) =>
      setMessages((m) => {
        const next = m.slice();
        next[next.length - 1] = { role: 'assistant', content: t };
        return next;
      });

    try {
      const res = await fetch(cfg.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.filter((m) => m.content) }),
        signal: ctrl.signal,
      });
      if (res.status === 429) {
        update(await res.text());
        return;
      }
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        update(reply);
      }
      if (!reply.trim()) update(OFFLINE_REPLY);
    } catch (err) {
      if (err.name !== 'AbortError') update(reply || OFFLINE_REPLY);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  sendRef.current = send;

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setBusy(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const wa = whatsappHref();

  return (
    <div className={`chatw ${open ? 'is-open' : ''}`}>
      <section
        className="chatw__panel"
        role="dialog"
        aria-modal="false"
        aria-label={`Chat with ${botName}, Velotech's AI assistant`}
        hidden={!open}
      >
        <header className="chatw__head">
          <span className="chatw__avatar" aria-hidden="true">
            <Sparkles size={18} />
          </span>
          <div className="chatw__title">
            <strong>{botName}</strong>
            <span>
              <i aria-hidden="true" /> AI · replies instantly
            </span>
          </div>
          {messages.length > 0 && (
            <button type="button" className="chatw__icon-btn" onClick={reset} aria-label="Start a new conversation">
              <RotateCcw size={17} />
            </button>
          )}
          <button type="button" className="chatw__icon-btn" onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={19} />
          </button>
        </header>

        <div className="chatw__list" ref={listRef} data-lenis-prevent aria-live="polite">
          <div className="chatw__msg chatw__msg--bot">
            <p>{cfg.greeting}</p>
          </div>
          {messages.map((m, i) => (
            <div key={i} className={`chatw__msg chatw__msg--${m.role === 'user' ? 'user' : 'bot'}`}>
              {m.content ? (
                <p>
                  <RichText text={m.content} />
                </p>
              ) : (
                <span className="chatw__typing" aria-label="Assistant is typing">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>
          ))}
          {messages.length === 0 && (
            <ul className="chatw__suggest" aria-label="Suggested questions">
              {cfg.suggestions?.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form
          className="chatw__form"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="chatw-input" className="sr-only">
            Type your message
          </label>
          <textarea
            id="chatw-input"
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={2000}
            placeholder="Ask about your project…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button type="submit" className="chatw__send" disabled={busy || !input.trim()} aria-label="Send message">
            <ArrowUp size={18} />
          </button>
        </form>
        <p className="chatw__foot">
          AI can make mistakes. Prefer a human?{' '}
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact the team
          </Link>
          {wa && (
            <>
              {' · '}
              <a href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </>
          )}
        </p>
      </section>

      <button
        type="button"
        className="chatw__launcher"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with us'}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && <span className="chatw__launcher-label">Ask AI</span>}
      </button>
    </div>
  );
}
