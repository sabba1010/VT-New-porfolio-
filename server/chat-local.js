/**
 * Local answer engine for the chat assistant.
 * Used when no ANTHROPIC_API_KEY is configured, or when the Claude API is
 * unreachable — so visitors can always chat. It answers from the site's own
 * data (services, FAQ, ways to work, contact details) with simple keyword
 * matching, and hands anything it can't answer to the team.
 */
import { company, faqs, engagements, auditHref } from '../src/data/content.js';
import { services } from '../src/data/services.js';
import { site } from '../src/data/site.js';

const BOT = site.chat?.name || 'the assistant';

const STOP = new Set(
  'a an the and or but if to of in on for with at by from is are was were be been am do does did can could would should will i you we our your my me us it this that these those what which who how why when where there here about any some have has had get got make want need just like please tell know more much many also into than then them they their its as so not no yes hi'.split(' '),
);

const words = (s) =>
  (s.toLowerCase().normalize('NFKD').match(/[a-z0-9+#]+/g) ?? [])
    // crude stemming so "automate" / "automation" / "automated" all match
    .map((w) => (w.length > 5 ? w.replace(/(ations?|ated|ating|ates?|ions?|ing|ed|es|s)$/, '') : w.replace(/(es|s)$/, '')))
    .filter((w) => w.length > 1 && !STOP.has(w));

const overlap = (qWords, text) => {
  const t = new Set(words(text));
  return qWords.reduce((n, w) => n + (t.has(w) ? 1 : 0), 0);
};

const has = (text, list) => list.some((k) => new RegExp(`\\b${k}`, 'i').test(text));

const contactBlock = () => {
  const lines = [`Email: ${company.email}`];
  if (company.whatsapp) lines.push(`WhatsApp: https://wa.me/${company.whatsapp}`);
  if (company.phone) lines.push(`Phone: ${company.phone}`);
  lines.push(`Or use the form at /contact — the team replies within one business day.`);
  return lines.join('\n');
};

const serviceLine = (s) => `• ${s.title} — /services/${s.slug}`;

/** Returns a plain-text reply for the visitor's latest message. */
export function localReply(messages) {
  const last = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  const text = last.trim();
  const q = words(text);

  // 1 ── small talk
  if (/^(hi|hello|hey|hola|salam|assalamu|asalamu|good (morning|afternoon|evening))\b/i.test(text) && q.length <= 3) {
    return `Hi! I'm ${BOT}, Velotech's assistant. I can tell you about our AI automation, AI integration and software development services, how projects work, or help you get a quote. What are you working on?`;
  }
  if (has(text, ['thank', 'thanks', 'thx', 'dhonnobad', 'shukria'])) {
    return `You're welcome! If you'd like to talk it through with the team, book a free AI audit at ${auditHref} or write to ${company.email}.`;
  }
  if (has(text, ['bot', 'robot', 'human', 'real person', 'are you ai', 'manush'])) {
    return `I'm ${BOT}, Velotech's virtual assistant — not a person. For anything specific, the team is happy to help:\n${contactBlock()}`;
  }

  // 2 ── intents
  if (has(text, ['price', 'pricing', 'cost', 'budget', 'quote', 'estimate', 'how much', 'rate', 'dam', 'koto', 'khoroch', 'taka'])) {
    const faq = faqs.find((f) => /cost/i.test(f.q));
    const ways = engagements.map((e) => `• ${e.name}: ${e.price || e.fallback} — ${e.term}`).join('\n');
    return `${faq ? faq.a + '\n\n' : ''}Ways to work with us:\n${ways}\n\nThe easiest start is a free 30-minute AI audit: ${auditHref}`;
  }
  // specific phrases only — "automate our emails" is a service question, not a contact request
  if (has(text, ['contact', 'your email', 'email address', 'phone number', 'call you', 'a call', 'meeting', 'talk to', 'speak to', 'speak with', 'book a', 'book an', 'audit', 'consult', 'reach you', 'get in touch', 'whatsapp', 'jogajog'])) {
    return `Happy to set that up! You can book a free 30-minute AI audit here: ${auditHref}\n\n${contactBlock()}`;
  }
  if (has(text, ['services', 'what do you do', 'what you do', 'offer', 'help with', 'kaj', 'service'])) {
    const ai = services.filter((s) => s.group === 'ai').map(serviceLine).join('\n');
    const dev = services.filter((s) => s.group !== 'ai').map(serviceLine).join('\n');
    return `Here's what we do:\n\nAI services\n${ai}\n\nSoftware development\n${dev}\n\nTell me a bit about your business and I'll point you to the right one.`;
  }

  // 3 ── best matching service or FAQ
  const svc = services
    .map((s) => ({
      s,
      score:
        overlap(q, `${s.title} ${s.short} ${s.slug.replace(/-/g, ' ')}`) * 3 +
        overlap(q, `${s.desc} ${(s.features ?? []).map((f) => f.title).join(' ')}`),
    }))
    .sort((a, b) => b.score - a.score)[0];
  const faq = faqs
    .map((f) => ({ f, score: overlap(q, f.q) * 3 + overlap(q, f.a) }))
    .sort((a, b) => b.score - a.score)[0];

  if (faq && faq.score >= 4 && faq.score >= (svc?.score ?? 0)) {
    return `${faq.f.a}\n\nAnything else I can help with? You can also reach the team at /contact.`;
  }
  if (svc && svc.score >= 3) {
    const { s } = svc;
    const feats = (s.features ?? []).slice(0, 4).map((f) => `• ${f.title}`).join('\n');
    return `${s.title}: ${s.desc}\n\n${feats ? `What's included:\n${feats}\n\n` : ''}More details: /services/${s.slug}\nWant to see if it fits your business? Book a free AI audit: ${auditHref}`;
  }

  // 4 ── hand over to the team
  return `Good question — I'm not sure I can answer that one properly here, and I'd rather not guess. The team can help:\n${contactBlock()}`;
}
