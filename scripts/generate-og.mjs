/**
 * Generates a 1200×630 social-share image (Open Graph / Twitter card, JPEG) for
 * every page into public/og/<page>.jpg, plus the default public/og-image.png.
 *
 * Run with:  npm run og
 * Needs Google Chrome or Edge installed locally (set CHROME_PATH if it's
 * somewhere unusual). Re-run whenever page titles or new pages change.
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });

const { getRouteMeta, allRoutes, ogKey, site } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!chrome) throw new Error('Chrome/Edge not found — set CHROME_PATH to your browser executable.');

const font = (pkg, file) => `data:font/woff2;base64,${readFileSync(join(root, 'node_modules', '@fontsource-variable', pkg, 'files', file)).toString('base64')}`;
const SORA = font('sora', 'sora-latin-wght-normal.woff2');
const MANROPE = font('manrope', 'manrope-latin-wght-normal.woff2');

const LOGO = `<svg width="56" height="56" viewBox="0 0 64 64"><defs><mask id="c" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#fff"/><polyline points="5,2 32,47 59,2" fill="none" stroke="#000" stroke-width="6.5" stroke-linejoin="miter" stroke-miterlimit="10"/></mask><clipPath id="k"><circle cx="32" cy="32" r="29"/></clipPath></defs><g mask="url(#c)"><circle cx="32" cy="32" r="29" fill="#fff"/><polygon points="5,2 32,47 59,2" fill="#ff5b2e" clip-path="url(#k)"/></g></svg>`;

const kicker = (path) =>
  path === '/' ? 'AI & Software Development'
  : path.startsWith('/services/') ? 'Service'
  : path.startsWith('/case-studies/') ? 'Case study'
  : path.startsWith('/blog/') ? 'Article'
  : path.startsWith('/careers/') ? 'We’re hiring'
  : 'Velotech';

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : s);

const html = (title, desc, tag) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Sora;src:url(${SORA}) format('woff2');font-weight:100 900}
@font-face{font-family:Manrope;src:url(${MANROPE}) format('woff2');font-weight:200 800}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:Manrope,sans-serif;color:#fff;
 background:radial-gradient(circle at 88% 8%,rgba(255,91,46,.42),transparent 42%),radial-gradient(circle at 0% 100%,rgba(255,181,71,.12),transparent 40%),#0b0d12;position:relative}
body:before{content:'';position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:linear-gradient(160deg,#000 10%,transparent 75%)}
.wrap{position:relative;height:100%;padding:68px 80px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font:700 34px/1 Sora;letter-spacing:-.04em}
.tag{margin-top:64px;align-self:flex-start;padding:10px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);font:700 20px/1 Manrope;letter-spacing:.08em;text-transform:uppercase;color:#ffb08f}
h1{margin-top:28px;font:700 ${title.length > 42 ? 62 : 74}px/1.06 Sora;letter-spacing:-.035em;max-width:1000px}
p{margin-top:24px;font-size:28px;line-height:1.4;color:rgba(255,255,255,.66);max-width:930px}
.foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;font:600 22px Manrope;color:rgba(255,255,255,.55)}
.bar{width:180px;height:6px;border-radius:6px;background:linear-gradient(90deg,#ff5b2e,#ffb547)}
</style></head><body><div class="wrap">
<div class="brand">${LOGO}Velotech</div>
<span class="tag">${esc(tag)}</span>
<h1>${esc(title)}</h1>
<p>${esc(desc)}</p>
<div class="foot"><span>${esc(site.url.replace(/^https?:\/\//, ''))}</span><span class="bar"></span></div>
</div></body></html>`;

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });

const shot = async (file, title, desc, tag) => {
  await page.setContent(html(title, desc, tag), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const jpeg = file.endsWith('.jpg');
  await page.screenshot({ path: file, type: jpeg ? 'jpeg' : 'png', ...(jpeg ? { quality: 85 } : {}) });
};

const routes = allRoutes();
for (const route of routes) {
  const meta = getRouteMeta(route);
  const title = route === '/' ? 'AI-Powered Software That Grows Your Business' : meta.title.replace(/\s*\|\s*Velotech$/, '');
  await shot(join(outDir, `${ogKey(route)}.jpg`), clip(title, 70), clip(meta.description, 125), kicker(route));
}
// default image (fallback for any page without its own)
await shot(join(root, 'public', 'og-image.png'), 'AI-Powered Software That Grows Your Business', clip(site.description, 125), 'AI & Software Development');

await browser.close();
console.log(`✔ Wrote ${routes.length} social images to public/og/ and refreshed public/og-image.png`);
