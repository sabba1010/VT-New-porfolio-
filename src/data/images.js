/**
 * ───────────────────────────────────────────────────────────────
 *  CENTRAL IMAGE MAP — replace placeholder assets here.
 * ───────────────────────────────────────────────────────────────
 *  All files live in /public/images. To use your own images:
 *   1. Drop the file into /public/images (jpg, png, webp or svg).
 *   2. Update the matching path below.
 *  Nothing else in the codebase needs to change.
 */

export const brand = {
  // Set to e.g. '/images/brand/logo.svg' to replace the built-in logo mark.
  logo: null,
  logoLight: null, // version used on dark backgrounds
};

export const team = Array.from({ length: 8 }, (_, i) => `/images/team/member-${i + 1}.svg`);

export const testimonialPhotos = Array.from(
  { length: 5 },
  (_, i) => `/images/testimonials/client-${i + 1}.svg`,
);

export const projects = Array.from({ length: 6 }, (_, i) => `/images/projects/project-${i + 1}.svg`);

export const culture = Array.from({ length: 5 }, (_, i) => `/images/about/culture-${i + 1}.svg`);

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
