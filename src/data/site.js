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
  defaultTitle: 'Velotech — Digital Engineering & Software Development Agency',
  description:
    'Velotech is a digital engineering agency helping businesses worldwide turn ideas into scalable products — web, mobile, AI, CMS and custom software.',
  ogImage: '/og-image.png', // 1200×630, shown when links are shared
  locale: 'en_US',
  twitter: '', // e.g. '@velotech'

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
