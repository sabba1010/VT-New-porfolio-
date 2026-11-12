/**
 * Central SEO metadata for every route.
 * Used by the browser (on navigation) AND by the build-time prerenderer,
 * so search engines and social networks get correct tags for each page.
 */
import { site, absUrl } from '../data/site';
import { company } from '../data/content';
import { services, getService } from '../data/services';
import { industries, getIndustry } from '../data/industries';
import { hireRoles, getRole } from '../data/hire';
import { caseStudies, getCaseStudy } from '../data/caseStudies';
import { posts, getPost } from '../data/blog';
import { jobs, getJob } from '../data/careers';

/* ───────────── Structured data (JSON-LD) ───────────── */
const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: absUrl('/images/brand/favicon.svg'),
  email: company.email,
  telephone: company.phone,
  address: { '@type': 'PostalAddress', streetAddress: company.address },
  sameAs: company.socials.map((s) => s.href).filter((h) => h.startsWith('http')),
});

const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
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
  name: s.title,
  description: s.desc,
  url: absUrl(path),
  provider: { '@type': 'Organization', name: site.name, url: site.url },
  areaServed: 'Worldwide',
});

/* ───────────── Static pages ───────────── */
const staticPages = {
  '/': { title: null, description: site.description, ld: () => [organization(), website()] },
  '/services': { title: 'Software Development Services', description: 'Web, mobile, AI, AI automation, e-commerce, CMS and custom software development, plus in-house UI/UX, product, packaging, graphic and social media design.', crumb: 'Services' },
  '/industries': { title: 'Industries We Serve', description: 'Software solutions for healthcare, fintech, education, real estate, e-commerce, logistics and more.', crumb: 'Industries' },
  '/hire-developers': { title: 'Hire Dedicated Developers', description: 'Hire pre-vetted AI, web, mobile and CMS developers who work in your time zone. Start in two weeks with a risk-free trial.', crumb: 'Hire Developers' },
  '/case-studies': { title: 'Case Studies', description: 'Real projects and measurable results from products designed and engineered by Velotech.', crumb: 'Case Studies' },
  '/about': { title: 'About Us', description: 'Velotech is a digital engineering agency with teams across six countries, helping businesses turn ideas into scalable products.', crumb: 'About Us' },
  '/careers': { title: 'Careers', description: 'Join Velotech — remote-friendly roles in engineering, design, AI and DevOps.', crumb: 'Careers' },
  '/blog': { title: 'Blog & Insights', description: 'Articles on product strategy, design, AI and software engineering from the Velotech team.', crumb: 'Blog' },
  '/contact': { title: 'Contact Us', description: 'Tell us about your project. Velotech replies within one business day with next steps and a free consultation.', crumb: 'Contact Us' },
  '/privacy-policy': { title: 'Privacy Policy', description: 'How Velotech collects, uses and protects personal data.', crumb: 'Privacy Policy' },
  '/terms': { title: 'Terms of Service', description: 'Terms governing the use of the Velotech website.', crumb: 'Terms of Service' },
};

/* ───────────── Dynamic pages ───────────── */
const dynamic = [
  {
    base: '/services',
    get: getService,
    list: services,
    meta: (s, path) => ({
      title: `${s.title} Services`,
      description: `${s.tagline} ${s.desc}`,
      image: s.image,
      ld: [breadcrumbs([{ name: 'Services', path: '/services' }, { name: s.title, path }]), serviceLd(s, path)],
    }),
  },
  {
    base: '/industries',
    get: getIndustry,
    list: industries,
    meta: (i, path) => ({
      title: `${i.name} Software Development`,
      description: i.desc,
      image: i.image,
      ld: [breadcrumbs([{ name: 'Industries', path: '/industries' }, { name: i.name, path }])],
    }),
  },
  {
    base: '/hire-developers',
    get: getRole,
    list: hireRoles,
    meta: (r, path) => ({
      title: `Hire ${r.title}`,
      description: `Hire pre-vetted ${r.title.toLowerCase()} from Velotech — ${r.desc.toLowerCase()}. Time-zone overlap, full IP ownership and a risk-free trial.`,
      ld: [breadcrumbs([{ name: 'Hire Developers', path: '/hire-developers' }, { name: r.title, path }])],
    }),
  },
  {
    base: '/case-studies',
    get: getCaseStudy,
    list: caseStudies,
    meta: (c, path) => ({
      title: `${c.name} — Case Study`,
      description: c.desc,
      image: c.image,
      type: 'article',
      ld: [breadcrumbs([{ name: 'Case Studies', path: '/case-studies' }, { name: c.name, path }])],
    }),
  },
  {
    base: '/blog',
    get: getPost,
    list: posts,
    meta: (p, path) => ({
      title: p.title,
      description: p.excerpt,
      image: p.cover,
      type: 'article',
      ld: [
        breadcrumbs([{ name: 'Blog', path: '/blog' }, { name: p.title, path }]),
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          image: absUrl(p.cover),
          author: { '@type': 'Person', name: p.author.name },
          publisher: { '@type': 'Organization', name: site.name, url: site.url },
          mainEntityOfPage: absUrl(path),
        },
      ],
    }),
  },
  {
    base: '/careers',
    get: getJob,
    list: jobs,
    meta: (j, path) => ({
      title: `${j.title} — Careers`,
      description: j.summary,
      ld: [breadcrumbs([{ name: 'Careers', path: '/careers' }, { name: j.title, path }])],
    }),
  },
];

const notFound = { title: 'Page Not Found', description: site.description, noindex: true };

/** Returns normalized metadata for a pathname. */
export function getRouteMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  let m = staticPages[path];
  if (m) {
    m = { ...m, ld: m.ld ? m.ld() : m.crumb ? [breadcrumbs([{ name: m.crumb, path }])] : [] };
  } else {
    for (const d of dynamic) {
      if (path.startsWith(d.base + '/')) {
        const item = d.get(path.slice(d.base.length + 1));
        if (item) m = d.meta(item, path);
        break;
      }
    }
  }
  m = m || notFound;
  return {
    title: m.title ? `${m.title} | ${site.name}` : site.defaultTitle,
    description: m.description,
    canonical: absUrl(path === '/' ? '/' : path),
    image: absUrl(m.image && !m.image.endsWith('.svg') ? m.image : site.ogImage),
    type: m.type || 'website',
    noindex: !!m.noindex,
    ld: m.ld || [],
  };
}

/** Every indexable route — used for prerendering and sitemap.xml. */
export function allRoutes() {
  return [
    ...Object.keys(staticPages),
    ...dynamic.flatMap((d) => d.list.map((item) => `${d.base}/${item.slug}`)),
  ];
}

/* ───────────── Head tags ───────────── */
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Head tags as plain objects (shared by client + prerender). */
export function headTags(meta) {
  const tags = [
    ['meta', { name: 'description', content: meta.description }],
    ['link', { rel: 'canonical', href: meta.canonical }],
    ['meta', { name: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' }],
    ['meta', { property: 'og:type', content: meta.type }],
    ['meta', { property: 'og:site_name', content: site.name }],
    ['meta', { property: 'og:locale', content: site.locale }],
    ['meta', { property: 'og:title', content: meta.title }],
    ['meta', { property: 'og:description', content: meta.description }],
    ['meta', { property: 'og:url', content: meta.canonical }],
    ['meta', { property: 'og:image', content: meta.image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: meta.title }],
    ['meta', { name: 'twitter:description', content: meta.description }],
    ['meta', { name: 'twitter:image', content: meta.image }],
  ];
  if (site.twitter) tags.push(['meta', { name: 'twitter:site', content: site.twitter }]);
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
