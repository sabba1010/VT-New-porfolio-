/**
 * ───────────────────────────────────────────────────────────────
 *  CENTRAL IMAGE MAP — replace placeholder assets here.
 * ───────────────────────────────────────────────────────────────
 *  All files live in /public/images. To use your own images:
 *   1. Drop the file into /public/images (jpg, png, webp or svg).
 *   2. Update the matching path below.
 *  Nothing else in the codebase needs to change.
 */
import { pickImage } from './aiImages.js';

export const brand = {
  // Set to e.g. '/images/brand/logo.svg' to replace the built-in logo mark.
  logo: null,
  logoLight: null, // version used on dark backgrounds
};

// real photos dropped in public/images/ai/team/<n>.jpg replace the illustrated avatars.
// TEST ONLY: on `npm run dev` the stock portraits in public/images/team-test/ (gitignored)
// are shown instead. Production builds never use them — stock faces must not pose as the team.
// `?.` keeps this safe outside Vite (the /api/chat function loads these data files in plain Node)
const TEST_TEAM = Boolean(import.meta.env?.DEV) && import.meta.env?.VITE_TEAM_TEST !== 'off';
export const team = Array.from({ length: 8 }, (_, i) =>
  TEST_TEAM ? `/images/team-test/${i + 1}.jpg` : pickImage(`team/${i + 1}`, `/images/team/member-${i + 1}.svg`),
);

export const testimonialPhotos = Array.from(
  { length: 5 },
  (_, i) => `/images/testimonials/client-${i + 1}.svg`,
);

export const projects = Array.from({ length: 6 }, (_, i) => `/images/projects/project-${i + 1}.svg`);

export const culture = Array.from({ length: 5 }, (_, i) => pickImage(`culture/${i + 1}`, `/images/about/culture-${i + 1}.svg`));

export const industries = {
  healthcare: '/images/industries/healthcare.svg',
  fintech: '/images/industries/fintech.svg',
  education: '/images/industries/education.svg',
  'real-estate': '/images/industries/real-estate.svg',
  ecommerce: '/images/industries/ecommerce.svg',
  logistics: '/images/industries/logistics.svg',
  travel: '/images/industries/travel.svg',
  media: '/images/industries/media.svg',
  finance: '/images/industries/finance.svg',
  retail: '/images/industries/retail.svg',
};

// Client & partner logo placeholders
export const logos = Array.from({ length: 12 }, (_, i) => `/images/logos/logo-${i + 1}.svg`);

// CMS platform badges (monogram placeholders — swap for official logos if you have permission)
const devicon = (n) => `https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/${n}/${n}-original.svg`;
export const platforms = {
  wordpress: devicon('wordpress'),
  woocommerce: devicon('woocommerce'),
  webflow: devicon('webflow'),
  shopify: '/images/platforms/shopify.svg',
  wix: '/images/platforms/wix.svg',
  squarespace: '/images/platforms/squarespace.svg',
  square: '/images/platforms/square.svg',
};
