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
  defaultTitle: 'Velotech — Software Development & Design Agency',
  description:
    'Velotech is a software development agency for businesses worldwide — web, mobile, AI, e-commerce and custom software, with an in-house design team for UI/UX, branding and more.',
  ogImage: '/og-image.png', // 1200×630, shown when links are shared
  locale: 'en_US',
  twitter: '', // e.g. '@velotech'

  // Form endpoints — where form submissions are POSTed as JSON.
  // Works with Formspree (https://formspree.io/f/xxxx), Web3Forms, Getform, or your own API.
  // contact:    empty → the contact form opens the visitor's email app with the message pre-filled,
  //             so no enquiry is ever silently lost.
  // newsletter: empty → the newsletter box is hidden.
  forms: {
    contact: '',
    newsletter: '',
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
