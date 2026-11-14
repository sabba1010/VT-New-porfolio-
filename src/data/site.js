/**
 * ───────────────────────────────────────────────────────────────
 *  SITE CONFIG — set these before launch.
 * ───────────────────────────────────────────────────────────────
 */
export const site = {
  // Your production domain, no trailing slash. Used for canonical URLs,
  // Open Graph tags and sitemap.xml.
  url: 'https://www.velotech.example',
  name: 'Velotech',
  defaultTitle: 'Velotech — Top Software Development & AI Company',
  description:
    'Velotech builds AI automation, adds AI to the tools you already use and develops web, mobile and custom software for businesses worldwide.',
  ogImage: '/og-image.png', // 1200×630, shown when links are shared
  locale: 'en_US',
  twitter: '', // e.g. '@velotech'

  // ── PROOF SWITCHES ───────────────────────────────────────────
  // Claims that clients may check. Each one stays hidden until you
  // switch it on — only do that once it's true and you can back it up.
  proof: {
    stats: true, // "250+ projects · 180+ clients · 60+ experts · 8+ years" (content.js → stats)
    offices: true, // office list + world map (content.js → locations)
    hiring: true, // open roles + perks on /careers (careers.js)
    // true = the case studies in caseStudies.js are example/concept projects:
    // their client names and result numbers are hidden and they're labelled
    // "example projects". Set to false once they're real client work.
    sampleWork: false,
  },

  // Form endpoints — where form submissions are POSTed as JSON.
  // Works with Formspree (https://formspree.io/f/xxxx), Web3Forms, Getform, or your own API.
  // contact:    empty → the contact form opens the visitor's email app with the message pre-filled,
  //             so no enquiry is ever silently lost.
  // newsletter: empty → the newsletter box is hidden.
  forms: {
    contact: '',
    newsletter: '',
  },

  // AI chat assistant (bottom-right). Needs ANTHROPIC_API_KEY set on the server
  // (Vercel env var / local .env). If the API isn't reachable the widget
  // still opens and points visitors to the contact options instead.
  chat: {
    enabled: true,
    endpoint: '/api/chat',
    name: 'Sara', // the assistant's name — shown in the chat header and used in its replies
    greeting:
      "Hi! 👋 I'm Sara, Velotech's AI assistant. Ask me how AI could automate or grow your business — or about any software project you have in mind.",
    suggestions: [
      'What can AI automate in my business?',
      'Can you add AI to our existing software?',
      'How can AI help us get more customers?',
      'How much does a project cost?',
    ],
  },

  // Optional analytics. Leave `enabled: false` until you add a provider;
  // when enabled, a GDPR cookie-consent banner is shown before loading it.
  analytics: {
    enabled: false,
    // Called only after the visitor accepts. Inject your provider script here.
    load: () => {},
  },
};

/** Builds an absolute URL from a site-relative path. */
export const absUrl = (path = '/') => site.url + (path.startsWith('/') ? path : `/${path}`);
