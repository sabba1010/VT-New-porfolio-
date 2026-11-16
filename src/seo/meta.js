/**
 * Central SEO metadata for every route.
 * Used by the browser (on navigation) AND by the build-time prerenderer,
 * so search engines and social networks get correct tags for each page.
 *
 * Search copy (titles/descriptions) lives in src/data/seo.js.
 */
import { site, absUrl } from '../data/site';
import { company, faqs, activeSocials, locations } from '../data/content';
import { services, getService } from '../data/services';
import { caseStudies, getCaseStudy } from '../data/caseStudies';
import { posts, getPost } from '../data/blog';
import { jobs, getJob, jobsPosted } from '../data/careers';
import { pageSeo, serviceSeo, postSeo, expertise } from '../data/seo';

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const LANG = 'en';

/** Per-page social image (1200×630 JPEG) generated into /public/og by `npm run og`. */
export const ogKey = (path) => (path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '--'));

/* ───────────── Structured data (JSON-LD) ───────────── */
const cityCountry = Object.fromEntries((locations ?? []).map((l) => [l.city, l.code]));

const organization = () => {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: site.url,
    logo: { '@type': 'ImageObject', url: absUrl('/apple-touch-icon.png'), width: 180, height: 180 },
    image: absUrl(site.ogImage),
    description: site.description,
    email: company.email,
    areaServed: 'Worldwide',
    knowsAbout: expertise,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: company.email,
        ...(company.phone ? { telephone: company.phone } : {}),
        areaServed: 'Worldwide',
        availableLanguage: ['English'],
      },
    ],
  };
  // only include facts that are actually filled in / switched on
  if (company.phone) org.telephone = company.phone;
  if (company.address) org.address = { '@type': 'PostalAddress', streetAddress: company.address };
  if (activeSocials.length) org.sameAs = activeSocials.map((s) => s.href);
  if (site.proof?.stats && site.foundingYear) org.foundingDate = String(site.foundingYear);
  if (site.proof?.offices && locations?.length) {
    org.location = locations.map((l) => ({
      '@type': 'Place',
      name: `${site.name} ${l.city}`,
      address: { '@type': 'PostalAddress', addressLocality: l.city, addressCountry: l.code },
    }));
  }
  return org;
};

const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: site.name,
  url: site.url,
  inLanguage: LANG,
  publisher: { '@id': ORG_ID },
});

const webPage = ({ type = 'WebPage', path, title, description }) => ({
  '@context': 'https://schema.org',
  '@type': type,
  '@id': `${absUrl(path)}#webpage`,
  url: absUrl(path),
  name: title,
  description,
  inLanguage: LANG,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': ORG_ID },
  primaryImageOfPage: absUrl(`/og/${ogKey(path)}.jpg`),
});

const breadcrumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absUrl(it.path),
  })),
});

const serviceLd = (s, path) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absUrl(path)}#service`,
  name: s.title,
  serviceType: s.title,
  description: s.desc,
  url: absUrl(path),
  provider: { '@id': ORG_ID },
  areaServed: 'Worldwide',
  ...(s.features?.length
    ? {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${s.title} capabilities`,
          itemListElement: s.features.map((f) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: f.title, description: f.desc },
          })),
        },
      }
    : {}),
});

const servicesList = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${site.name} services`,
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: absUrl(`/services/${s.slug}`),
    name: s.title,
  })),
});

const faqLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const isPlaceholderAuthor = (name) => !name || /team member/i.test(name);
const wordCount = (body = []) =>
  body.reduce((n, b) => n + `${b.text ?? ''} ${(b.items ?? []).join(' ')}`.split(/\s+/).filter(Boolean).length, 0);

const blogLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${absUrl('/blog')}#blog`,
  name: `${site.name} Blog`,
  url: absUrl('/blog'),
  publisher: { '@id': ORG_ID },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: absUrl(`/blog/${p.slug}`),
    datePublished: p.date,
  })),
});

const postLd = (p, path) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${absUrl(path)}#article`,
  headline: p.title,
  description: p.excerpt,
  datePublished: p.date,
  dateModified: p.updated ?? p.date,
  image: absUrl(`/og/${ogKey(path)}.jpg`),
  articleSection: p.category,
  wordCount: wordCount(p.body),
  inLanguage: LANG,
  // placeholder author names are published as the company instead
  author: isPlaceholderAuthor(p.author?.name)
    ? { '@id': ORG_ID }
    : { '@type': 'Person', name: p.author.name, jobTitle: p.author.role },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: { '@id': `${absUrl(path)}#webpage` },
  isPartOf: { '@id': `${absUrl('/blog')}#blog` },
});

const caseLd = (c, path) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${absUrl(path)}#work`,
  name: c.name,
  description: c.desc,
  url: absUrl(path),
  image: absUrl(`/og/${ogKey(path)}.jpg`),
  genre: c.industry,
  keywords: [...(c.tags ?? []), ...(c.services ?? [])].join(', '),
  creator: { '@id': ORG_ID },
  inLanguage: LANG,
  ...(c.liveUrl && { sameAs: c.liveUrl }),
});

const plusDays = (iso, days) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const jobLd = (j, path) => {
  const posted = j.posted ?? jobsPosted;
  const [mode, city] = j.location.split('/').map((s) => s.trim());
  const remote = /remote/i.test(mode);
  const cityName = remote ? city : mode;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: j.title,
    description: `<p>${esc(j.summary)}</p><h3>Responsibilities</h3><ul>${(j.responsibilities ?? []).map((r) => `<li>${esc(r)}</li>`).join('')}</ul><h3>Requirements</h3><ul>${(j.requirements ?? []).map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`,
    datePosted: posted,
    validThrough: `${plusDays(posted, 90)}T23:59:59Z`,
    employmentType: /part/i.test(j.type) ? 'PART_TIME' : /contract/i.test(j.type) ? 'CONTRACTOR' : 'FULL_TIME',
    directApply: false,
    url: absUrl(path),
    hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: site.url, logo: absUrl('/apple-touch-icon.png') },
    industry: 'Software development',
    occupationalCategory: j.team,
  };
  if (remote) ld.jobLocationType = 'TELECOMMUTE';
  if (cityName && cityCountry[cityName]) {
    ld.jobLocation = { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: cityName, addressCountry: cityCountry[cityName] } };
    if (remote) ld.applicantLocationRequirements = { '@type': 'Country', name: cityCountry[cityName] };
  }
  return ld;
};

/** Adds a short call-to-action only when a description is too short for search results (<120 chars). */
const pad = (text, extra) => (text.length < 120 && text.length + extra.length + 1 <= 160 ? `${text} ${extra}` : text);

/* ───────────── Static pages ───────────── */
const pageType = { '/about': 'AboutPage', '/contact': 'ContactPage', '/services': 'CollectionPage', '/case-studies': 'CollectionPage', '/blog': 'CollectionPage' };

const staticPages = {
  '/': { title: null, extra: () => [organization(), website()] },
  '/services': { crumb: 'Services', extra: () => [servicesList()] },
  '/case-studies': { crumb: 'Case Studies' },
  '/about': { crumb: 'About Us', extra: () => [organization()] },
  '/careers': { crumb: 'Careers' },
  '/blog': { crumb: 'Blog', extra: () => [blogLd()] },
  '/contact': { crumb: 'Contact Us', extra: () => [faqLd()] },
  '/privacy-policy': { title: 'Privacy Policy', description: 'How Velotech collects, uses and protects personal data submitted through this website, and the rights you have over it.', crumb: 'Privacy Policy' },
  '/terms': { title: 'Terms of Service', description: 'The terms that govern your use of the Velotech website, including its content, intellectual property and the information we publish here.', crumb: 'Terms of Service' },
};

/* ───────────── Dynamic pages ───────────── */
const dynamic = [
  {
    base: '/services',
    get: getService,
    list: services,
    meta: (s, path) => ({
      title: serviceSeo[s.slug]?.title ?? `${s.title} Services`,
      description: serviceSeo[s.slug]?.description ?? `${s.tagline} ${s.desc}`,
      imageAlt: `${s.title} — ${site.name}`,
      ld: [breadcrumbs([{ name: 'Services', path: '/services' }, { name: s.title, path }]), serviceLd(s, path)],
    }),
  },
  {
    base: '/case-studies',
    get: getCaseStudy,
    list: caseStudies,
    meta: (c, path) => ({
      title: `${c.name} — ${c.sample ? 'Example Project' : 'Case Study'}`,
      description: pad(c.desc, 'See the challenge, our solution and the tech stack.'),
      imageAlt: `${c.name} — ${c.industry} project by ${site.name}`,
      type: 'article',
      ld: [breadcrumbs([{ name: 'Case Studies', path: '/case-studies' }, { name: c.name, path }]), caseLd(c, path)],
    }),
  },
  {
    base: '/blog',
    get: getPost,
    list: posts,
    meta: (p, path) => ({
      title: postSeo[p.slug]?.title ?? p.title,
      description: postSeo[p.slug]?.description ?? pad(p.excerpt, 'A practical guide from the Velotech team.'),
      imageAlt: p.title,
      type: 'article',
      published: p.date,
      section: p.category,
      ld: [breadcrumbs([{ name: 'Blog', path: '/blog' }, { name: p.title, path }]), postLd(p, path)],
    }),
  },
  {
    base: '/careers',
    get: getJob,
    list: site.proof?.hiring ? jobs : [], // job pages only exist while hiring
    meta: (j, path) => ({
      title: `${j.title} — Careers`,
      description: pad(`${j.summary} ${j.type}, ${j.location}.`, 'Apply to join Velotech.'),
      ld: [breadcrumbs([{ name: 'Careers', path: '/careers' }, { name: j.title, path }]), jobLd(j, path)],
    }),
  },
];

const notFound = { title: 'Page Not Found', description: site.description, noindex: true };

/** Returns normalized metadata for a pathname. */
export function getRouteMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  let m;
  const stat = staticPages[path];
  if (stat) {
    const copy = pageSeo[path] ?? {};
    const title = copy.title ?? stat.title ?? null;
    const description = copy.description ?? stat.description ?? site.description;
    const fullTitle = title ? `${title} | ${site.name}` : site.defaultTitle;
    m = {
      ...stat,
      title,
      description,
      ld: [
        webPage({ type: pageType[path], path, title: fullTitle, description }),
        ...(stat.crumb ? [breadcrumbs([{ name: stat.crumb, path }])] : []),
        ...(stat.extra ? stat.extra() : []),
      ],
    };
  } else {
    for (const d of dynamic) {
      if (path.startsWith(d.base + '/')) {
        const item = d.get(path.slice(d.base.length + 1));
        // only items that are actually published (e.g. job pages vanish while not hiring)
        if (item && d.list.includes(item)) {
          const meta = d.meta(item, path);
          m = { ...meta, ld: [webPage({ path, title: `${meta.title} | ${site.name}`, description: meta.description }), ...meta.ld] };
        }
        break;
      }
    }
  }
  m = m || notFound;
  const title = m.title ? `${m.title} | ${site.name}` : site.defaultTitle;
  return {
    path,
    title,
    description: m.description,
    canonical: absUrl(path === '/' ? '/' : path),
    image: absUrl(m.noindex ? site.ogImage : `/og/${ogKey(path)}.jpg`),
    fallbackImage: absUrl(site.ogImage),
    imageAlt: m.imageAlt ?? title,
    type: m.type || 'website',
    published: m.published,
    section: m.section,
    noindex: !!m.noindex,
    ld: m.ld || [],
  };
}

/** Every indexable route — used for prerendering, sitemap.xml and OG images. */
export function allRoutes() {
  return [...Object.keys(staticPages), ...dynamic.flatMap((d) => d.list.map((item) => `${d.base}/${item.slug}`))];
}

/** Last-modified date per route for sitemap.xml (blog posts use their own dates). */
export function routeLastmod(route, fallback) {
  const post = route.startsWith('/blog/') && getPost(route.slice(6));
  return post ? post.updated ?? post.date : fallback;
}

/* ───────────── Head tags ───────────── */
/** Head tags as plain objects (shared by client + prerender). */
export function headTags(meta) {
  const tags = [
    ['meta', { name: 'description', content: meta.description }],
    ['link', { rel: 'canonical', href: meta.canonical }],
    ['link', { rel: 'alternate', hreflang: 'en', href: meta.canonical }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: meta.canonical }],
    [
      'meta',
      {
        name: 'robots',
        content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    ],
    ['meta', { property: 'og:type', content: meta.type }],
    ['meta', { property: 'og:site_name', content: site.name }],
    ['meta', { property: 'og:locale', content: site.locale }],
    ['meta', { property: 'og:title', content: meta.title }],
    ['meta', { property: 'og:description', content: meta.description }],
    ['meta', { property: 'og:url', content: meta.canonical }],
    ['meta', { property: 'og:image', content: meta.image }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: meta.imageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: meta.title }],
    ['meta', { name: 'twitter:description', content: meta.description }],
    ['meta', { name: 'twitter:image', content: meta.image }],
    ['meta', { name: 'twitter:image:alt', content: meta.imageAlt }],
  ];
  if (meta.published) tags.push(['meta', { property: 'article:published_time', content: meta.published }]);
  if (meta.section) tags.push(['meta', { property: 'article:section', content: meta.section }]);
  if (site.twitter) tags.push(['meta', { name: 'twitter:site', content: site.twitter }]);
  if (site.verification?.google) tags.push(['meta', { name: 'google-site-verification', content: site.verification.google }]);
  if (site.verification?.bing) tags.push(['meta', { name: 'msvalidate.01', content: site.verification.bing }]);
  return tags;
}

/** Serialized <head> markup for the prerenderer. */
export function headHtml(meta) {
  const tags = headTags(meta)
    .map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ')} data-seo />`)
    .join('\n    ');
  const ld = meta.ld
    .map((obj) => `<script type="application/ld+json" data-seo>${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  return `<title>${esc(meta.title)}</title>\n    ${tags}\n    ${ld}`;
}

/** Applies head tags in the browser after client-side navigation. */
export function applyHead(meta) {
  document.title = meta.title;
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  for (const [tag, attrs] of headTags(meta)) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    el.setAttribute('data-seo', '');
    document.head.appendChild(el);
  }
  for (const obj of meta.ld) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-seo', '');
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
}
