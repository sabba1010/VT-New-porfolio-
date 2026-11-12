/**
 * Static prerendering (runs after `vite build`).
 *
 * For every route it writes dist/<route>.html containing:
 *  - the fully rendered page HTML (crawlable by Google, Bing, LinkedIn, etc.)
 *  - route-specific <title>, meta description, canonical, Open Graph,
 *    Twitter card and JSON-LD structured data
 * It also writes 404.html (served with a real 404 status by the host),
 * sitemap.xml and robots.txt.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { render, getRouteMeta, allRoutes, headHtml, site } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const HEAD_RE = /<!--seo-->[\s\S]*?<!--\/seo-->/;
if (!HEAD_RE.test(template)) throw new Error('index.html is missing the <!--seo--> … <!--/seo--> block');

const page = (meta, body) =>
  template
    .replace(HEAD_RE, `<!--seo-->\n    ${headHtml(meta)}\n    <!--/seo-->`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

// 2) Prerender every route
const routes = allRoutes();
let count = 0;
for (const route of routes) {
  const html = await render(route);
  // "/services" → dist/services.html — served at the clean URL by Netlify,
  // Vercel (cleanUrls), GitHub Pages, nginx try_files and `vite preview`.
  const file = route === '/' ? join(dist, 'index.html') : join(dist, `${route}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(getRouteMeta(route), html));
  count++;
}

// 3) 404 page (served by most static hosts for unknown paths)
writeFileSync(join(dist, '404.html'), page(getRouteMeta('/__404__'), await render('/__404__')));

// 4) sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === '/' ? '1.0' : r.split('/').length === 2 ? '0.8' : '0.6');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${site.url}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod><priority>${priority(r)}</priority></url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`✔ Prerendered ${count} routes + 404, sitemap.xml and robots.txt`);
if (site.url.includes('.example')) {
  console.warn('⚠ site.url is still a placeholder — set your real domain in src/data/site.js before deploying.');
}
