# Velotech — Agency Website

React 19 + Vite. Plain CSS with design tokens, `lucide-react` for icons. No other runtime dependencies.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the build
```

## Structure

```
src/
  styles/tokens.css      colors, type scale, spacing, radius, motion (edit brand here)
  styles/base.css        reset, layout primitives, reveal + marquee utilities
  data/content.js        ALL copy: services, industries, cases, stats, FAQ, nav…
  data/images.js         ALL image paths (single place to swap assets)
  hooks/                 useInView, useCountUp, useScrolled / useParallax
  components/ui/         Button, Reveal, SectionHeading, Logo, SocialIcon, SmartImage
  components/layout/     Header (+ MegaMenu, MobileNav), Footer
  sections/              one component + CSS file per homepage section
scripts/generate-placeholders.mjs   regenerates the SVG placeholders
```

## Pages & routes

| Route | Page | Data source |
|---|---|---|
| `/` | Home | all sections |
| `/services`, `/services/:slug` | Services list + detail | `src/data/services.js` |
| `/industries`, `/industries/:slug` | Industries list + detail | `src/data/industries.js` |
| `/hire-developers`, `/hire-developers/:slug` | Hire list + role detail | `src/data/hire.js` |
| `/case-studies`, `/case-studies/:slug` | Portfolio (filter `?industry=`) + detail | `src/data/caseStudies.js` |
| `/blog`, `/blog/:slug` | Blog (filter `?category=`) + article | `src/data/blog.js` |
| `/careers`, `/careers/:slug` | Careers + job detail | `src/data/careers.js` |
| `/about`, `/contact`, `/privacy-policy`, `/terms` | Static pages | `src/data/content.js` |

**Dynamic pages:** add an object (with a unique `slug`) to the matching data file and its page, its menu link and its footer link appear automatically. Unknown slugs show the 404 page.

**Deploying:** this is a single-page app, so the host must serve `index.html` for every path. `public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.

## Replacing placeholder assets

1. Put your files in `public/images/…` (jpg/png/webp/svg).
2. Update the path in `src/data/images.js`.

| Asset | Where |
|---|---|
| Logo | `brand.logo` / `brand.logoLight` in `images.js` (null = built-in placeholder mark) |
| Favicon | `public/images/brand/favicon.svg` |
| Team photos | `team` (8) |
| Testimonial photos | `testimonialPhotos` (5) |
| Project images (1200×750) | `projects` (6) |
| Office / culture | `culture` (5) |
| Industry images (900×600) | `industries` |
| Client & partner logos | `logos` (12) |

Testimonials, case studies, stats and contact details in `content.js` are **sample placeholders** — replace with real, approved content before launch.

## Hooking up forms

The contact form (`sections/FinalCTA.jsx`) and the newsletter form (`components/layout/Footer.jsx`) validate input on the client but don't send anything yet. Look for the `TODO` comments to connect your backend or form service.
