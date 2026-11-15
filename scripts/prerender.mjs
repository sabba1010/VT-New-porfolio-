/**
 * Static prerendering (runs after `vite build`).
 *
 * For every route it writes dist/<route>.html containing:
 *  - the fully rendered page HTML (crawlable by Google, Bing, LinkedIn, etc.)
 *  - route-specific <title>, meta description, canonical, hreflang, Open Graph,
 *    Twitter card and JSON-LD structured data
 * It also writes 404.html (served with a real 404 status by the host),
 * sitemap.xml, robots.txt and llms.txt (a plain-text guide for AI search engines).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssr = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, getRouteMeta, allRoutes, headHtml, routeLastmod, ogKey, site, services, posts, caseStudies, company } = ssr;

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const HEAD_RE = /<!--seo-->[\s\S]*?<!--\/seo-->/;
if (!HEAD_RE.test(template)) throw new Error('index.html is missing the <!--seo--> … <!--/seo--> block');

const page = (meta, body) =>
  template
    .replace(HEAD_RE, `<!--seo-->\n    ${headHtml(meta)}\n    <!--/seo-->`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

// per-page social image if it was generated (npm run og), otherwise the default
const missingOg = [];
const withImage = (meta) => {
  if (meta.noindex) return meta;
  if (existsSync(join(dist, 'og', `${ogKey(meta.path)}.jpg`))) return meta;
  missingOg.push(meta.path);
  return { ...meta, image: meta.fallbackImage };
};

// 1) Prerender every route
const routes = allRoutes();
let count = 0;
for (const route of routes) {
  const html = await render(route);
  // "/services" → dist/services.html — served at the clean URL by Netlify,
  // Vercel (cleanUrls), GitHub Pages, nginx try_files and `vite preview`.
  const file = route === '/' ? join(dist, 'index.html') : join(dist, `${route}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(withImage(getRouteMeta(route)), html));
  count++;
}

// 2) 404 page (served by most static hosts for unknown paths)
writeFileSync(join(dist, '404.html'), page(getRouteMeta('/__404__'), await render('/__404__')));

// 3) sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === '/' ? '1.0' : r.split('/').length === 2 ? '0.8' : '0.6');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${site.url}${r === '/' ? '/' : r}</loc><lastmod>${routeLastmod(r, today)}</lastmod><priority>${priority(r)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

// 4) robots.txt — everything public except the chat API
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.url}/sitemap.xml\n`);

// 5) llms.txt — concise, link-rich summary for AI assistants and AI search (llmstxt.org)
const llms = `# ${site.name}

> ${site.description}

${site.name} works with startups and businesses worldwide. Every engagement can start with a free 30-minute AI audit.

## Services
${services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.desc}`).join('\n')}

## Work
${caseStudies.map((c) => `- [${c.name}](${site.url}/case-studies/${c.slug}) (${c.industry}): ${c.desc}`).join('\n')}

## Articles
${posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`).join('\n')}

## Company
- [About](${site.url}/about)
- [Contact / book a free AI audit](${site.url}/contact)
- [Careers](${site.url}/careers)
- Email: ${company.email}
`;
writeFileSync(join(dist, 'llms.txt'), llms);

console.log(`✔ Prerendered ${count} routes + 404, sitemap.xml, robots.txt and llms.txt`);
if (missingOg.length) {
  console.warn(`⚠ ${missingOg.length} page(s) have no social image yet (run \`npm run og\`): ${missingOg.slice(0, 5).join(', ')}${missingOg.length > 5 ? ' …' : ''}`);
}
if (site.url.includes('.example')) {
  console.warn('⚠ site.url is still a placeholder — set your real domain in src/data/site.js before deploying.');
}
