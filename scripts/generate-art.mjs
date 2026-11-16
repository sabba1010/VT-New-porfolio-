/**
 * Generates the site's illustrations (replacing the old placeholders):
 *   public/images/about/culture-1..5.svg      — team / workspace scenes (800×600)
 *   public/images/services/<dev-service>.svg   — development service art (1200×750)
 *   public/images/blog/<post-slug>.svg         — blog covers (1200×750)
 * Run: node scripts/generate-art.mjs
 * Brand palette: ink #0B0D12, orange #FF5B2E → amber #FFB547.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { posts } from '../src/data/blog.js';

const root = process.cwd();
const FONT = "Manrope, 'Segoe UI', Arial, sans-serif";
const HEAD = "Sora, Manrope, 'Segoe UI', Arial, sans-serif";

const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16181F"/><stop offset="1" stop-color="#0B0D12"/></linearGradient>
    <linearGradient id="hot" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FF5B2E"/><stop offset="1" stop-color="#FFB547"/></linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.1" r="0.75"><stop offset="0" stop-color="#FF5B2E" stop-opacity=".32"/><stop offset="1" stop-color="#FF5B2E" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#fff" stroke-opacity=".045"/></pattern>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000" flood-opacity=".5"/></filter>
  </defs>`;

const svg = (W, H, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FONT}">${defs}
  <rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect width="${W}" height="${H}" fill="url(#glow)"/>
${body}
</svg>
`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const text = (x, y, t, { size = 18, weight = 700, fill = '#E7E8EC', anchor = 'start', font = FONT } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(t)}</text>`;
const pill = (x, y, w, label, { h = 40, size = 16, fill = '#1D2029', stroke = '#ffffff1f', color = '#E7E8EC' } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}"/>${text(x + w / 2, y + h / 2 + size * 0.36, label, { size, fill: color, anchor: 'middle' })}`;
const card = (x, y, w, h, r = 22) => `<g filter="url(#sh)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#16181F" stroke="#ffffff14"/></g>`;
const bar = (x, y, w, { h = 12, fill = '#ffffff22' } = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>`;
const avatar = (cx, cy, r, initials, fill = '#2A2D36') =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="#16181F" stroke-width="3"/>${text(cx, cy + r * 0.36, initials, { size: r * 0.9, weight: 800, fill: '#fff', anchor: 'middle' })}`;
const browser = (x, y, w, h, url = '') => `${card(x, y, w, h, 18)}
  <rect x="${x}" y="${y}" width="${w}" height="40" rx="18" fill="#1D2029"/><rect x="${x}" y="${y + 22}" width="${w}" height="18" fill="#1D2029"/>
  <circle cx="${x + 22}" cy="${y + 20}" r="5" fill="#FF5F57"/><circle cx="${x + 40}" cy="${y + 20}" r="5" fill="#FEBC2E"/><circle cx="${x + 58}" cy="${y + 20}" r="5" fill="#28C840"/>
  ${url ? `<rect x="${x + 84}" y="${y + 10}" width="${Math.min(320, w - 120)}" height="20" rx="10" fill="#0B0D12"/>${text(x + 98, y + 24, url, { size: 12, weight: 600, fill: '#9CA0AB' })}` : ''}`;
const phone = (x, y, w, h, inner) => `<g filter="url(#sh)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.16}" fill="#1D2029" stroke="#ffffff24"/></g>
  <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="${w * 0.12}" fill="#0F1117"/>
  <rect x="${x + w / 2 - 28}" y="${y + 16}" width="56" height="12" rx="6" fill="#0B0D12"/>${inner}`;

const write = (rel, content) => {
  const file = join(root, 'public', 'images', rel);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
};

/* ═════════════ Culture / workspace scenes (800×600) ═════════════ */
const culture = [
  // 1 — the team's sprint board
  svg(800, 600, `${card(60, 70, 680, 460)}
  ${text(96, 122, 'Sprint board', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
  ${[avatar(610, 112, 18, 'SR', '#FF5B2E'), avatar(640, 112, 18, 'AK', '#3B3F9E'), avatar(670, 112, 18, 'MN', '#0E7490')].join('')}
  ${['To do', 'In progress', 'Shipped']
    .map((col, c) => {
      const x = 96 + c * 212;
      const cards = [3, 2, 3][c];
      return `${text(x, 168, col, { size: 15, fill: '#9CA0AB' })}${Array.from({ length: cards }, (_, i) => `
      <rect x="${x}" y="${184 + i * 104}" width="192" height="88" rx="14" fill="${c === 2 ? '#1E2A22' : '#1D2029'}" stroke="${c === 1 && i === 0 ? '#FF5B2E88' : '#ffffff10'}"/>
      ${bar(x + 16, 204 + i * 104, [130, 100, 150][i % 3], { h: 10, fill: '#ffffff40' })}${bar(x + 16, 224 + i * 104, [90, 120, 70][i % 3], { h: 10 })}
      ${c === 2 ? `<circle cx="${x + 168}" cy="${246 + i * 104}" r="9" fill="#22C55E"/>` : `<rect x="${x + 16}" y="${244 + i * 104}" width="56" height="18" rx="9" fill="${c === 1 ? '#FF5B2E33' : '#ffffff12'}"/>`}`).join('')}`;
    })
    .join('')}`),

  // 2 — weekly demo on a video call
  svg(800, 600, `${card(60, 60, 680, 480)}
  ${text(96, 112, 'Weekly demo', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
  <rect x="610" y="90" width="96" height="30" rx="15" fill="#FF5B2E22" stroke="#FF5B2E66"/><circle cx="628" cy="105" r="5" fill="#FF5B2E"/>${text(668, 110, 'LIVE', { size: 13, fill: '#FFB08F', anchor: 'middle' })}
  ${[
    ['SR', '#FF5B2E', 'Product'],
    ['AK', '#3B3F9E', 'Engineering'],
    ['MN', '#0E7490', 'Design'],
    ['JD', '#B3320A', 'Client'],
  ]
    .map(([ini, col, role], i) => {
      const x = 96 + (i % 2) * 312;
      const y = 140 + Math.floor(i / 2) * 176;
      return `<rect x="${x}" y="${y}" width="296" height="160" rx="18" fill="#1D2029" stroke="${i === 3 ? '#FF5B2E99' : '#ffffff10'}" stroke-width="${i === 3 ? 2 : 1}"/>
      ${avatar(x + 148, y + 70, 34, ini, col)}${text(x + 18, y + 144, role, { size: 14, fill: '#C9CBD1' })}
      <circle cx="${x + 274}" cy="${y + 138}" r="11" fill="#0B0D12"/>`;
    })
    .join('')}`),

  // 3 — the codebase & a green deploy
  svg(800, 600, `${browser(60, 60, 680, 400, 'src/agents/lead-router.ts')}
  ${[
    ['#C792EA', 40, '#82AAFF', 120],
    ['#FFB547', 70, '#E7E8EC', 180],
    ['#82AAFF', 30, '#C3E88D', 220],
    ['#E7E8EC', 90, '#FF5B2E', 110],
    ['#C792EA', 60, '#E7E8EC', 240],
    ['#FFB547', 40, '#C3E88D', 160],
    ['#82AAFF', 80, '#E7E8EC', 130],
  ]
    .map(([c1, w1, c2, w2], i) => `${text(84, 134 + i * 40, String(i + 12), { size: 13, fill: '#4B4F5C' })}${bar(124 + (i % 3) * 22, 124 + i * 40, w1, { h: 12, fill: c1 })}${bar(136 + (i % 3) * 22 + w1, 124 + i * 40, w2, { h: 12, fill: c2 })}`)
    .join('')}
  ${card(380, 400, 360, 140, 18)}
  ${text(404, 440, '$ npm run deploy', { size: 16, fill: '#9CA0AB', font: 'Consolas, monospace' })}
  ${text(404, 474, '✓ tests passed (128)', { size: 16, fill: '#86EFAC', font: 'Consolas, monospace' })}
  ${text(404, 506, '✓ deployed to production', { size: 16, fill: '#86EFAC', font: 'Consolas, monospace' })}`),

  // 4 — discovery workshop board
  svg(800, 600, `${card(60, 60, 680, 480)}
  ${text(96, 112, 'Discovery workshop', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
  ${text(96, 140, 'Goals · users · quick wins', { size: 15, fill: '#9CA0AB' })}
  ${[
    ['#FFB547', 110, 180, -4], ['#FF8A5C', 230, 172, 3], ['#FFD08A', 160, 280, 2],
    ['#7DD3FC', 420, 176, -3], ['#A5B4FC', 540, 190, 4], ['#7DD3FC', 470, 290, -2],
    ['#86EFAC', 300, 380, 3], ['#BBF7D0', 420, 392, -3], ['#86EFAC', 560, 372, 2],
  ]
    .map(([c, x, y, r]) => `<g transform="rotate(${r} ${x + 50} ${y + 46})"><rect x="${x}" y="${y}" width="100" height="92" rx="6" fill="${c}"/>${bar(x + 14, y + 22, 64, { h: 8, fill: '#0B0D1255' })}${bar(x + 14, y + 40, 46, { h: 8, fill: '#0B0D1240' })}</g>`)
    .join('')}
  <path d="M220 330 C 280 360, 300 380, 330 392" stroke="#FF5B2E" stroke-width="3" fill="none" stroke-dasharray="6 8"/>
  <path d="M520 320 C 500 350, 470 370, 452 390" stroke="#FF5B2E" stroke-width="3" fill="none" stroke-dasharray="6 8"/>`),

  // 5 — launch day
  svg(800, 600, `${card(60, 60, 680, 480)}
  ${text(96, 112, 'Launch day', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
  <rect x="580" y="88" width="126" height="34" rx="17" fill="#22C55E22" stroke="#22C55E66"/>${text(643, 111, 'Live ✓', { size: 15, fill: '#86EFAC', anchor: 'middle' })}
  ${[200, 300, 400].map((y) => `<line x1="96" y1="${y}" x2="704" y2="${y}" stroke="#ffffff10"/>`).join('')}
  <path d="M96 470 L190 452 L284 440 L378 400 L472 360 L566 290 L660 190 L704 168 L704 500 L96 500 Z" fill="url(#hot)" opacity=".18"/>
  <path d="M96 470 L190 452 L284 440 L378 400 L472 360 L566 290 L660 190 L704 168" fill="none" stroke="url(#hot)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="704" cy="168" r="9" fill="#FFB547"/>
  ${Array.from({ length: 26 }, (_, i) => {
    const x = 380 + ((i * 97) % 330);
    const y = 150 + ((i * 53) % 120);
    return `<rect x="${x}" y="${y}" width="8" height="14" rx="2" fill="${['#FF5B2E', '#FFB547', '#7DD3FC', '#86EFAC'][i % 4]}" transform="rotate(${(i * 37) % 90} ${x} ${y})" opacity=".85"/>`;
  }).join('')}`),
];
culture.forEach((c, i) => write(`about/culture-${i + 1}.svg`, c));

/* ═════════════ Development service art (1200×750) ═════════════ */
const W = 1200;
const H = 750;
const devArt = {
  'web-development': svg(W, H, `${browser(120, 90, 960, 570, 'velotech.studio')}
    ${bar(160, 160, 120, { h: 14, fill: '#ffffff55' })}${[0, 1, 2, 3].map((i) => bar(700 + i * 90, 162, 60, { h: 10 })).join('')}
    ${text(160, 260, 'Fast. Accessible.', { size: 46, weight: 800, fill: '#fff', font: HEAD })}
    ${text(160, 318, 'SEO-ready.', { size: 46, weight: 800, fill: '#FF8A5C', font: HEAD })}
    ${bar(160, 352, 380, { h: 12 })}${bar(160, 376, 300, { h: 12 })}
    <rect x="160" y="414" width="170" height="52" rx="26" fill="url(#hot)"/>${text(245, 446, 'Get started', { size: 17, fill: '#fff', anchor: 'middle' })}
    <rect x="640" y="230" width="380" height="260" rx="18" fill="#1D2029" stroke="#ffffff10"/>
    <circle cx="830" cy="342" r="72" fill="none" stroke="#ffffff14" stroke-width="14"/>
    <circle cx="830" cy="342" r="72" fill="none" stroke="#22C55E" stroke-width="14" stroke-dasharray="452" stroke-dashoffset="8" transform="rotate(-90 830 342)" stroke-linecap="round"/>
    ${text(830, 356, '100', { size: 40, weight: 800, fill: '#fff', anchor: 'middle', font: HEAD })}
    ${text(830, 456, 'Performance score', { size: 16, fill: '#9CA0AB', anchor: 'middle' })}
    ${[0, 1, 2].map((i) => `<rect x="${160 + i * 300}" y="520" width="280" height="100" rx="14" fill="#1D2029" stroke="#ffffff10"/>${bar(184 + i * 300, 548, 120, { h: 12, fill: '#ffffff40' })}${bar(184 + i * 300, 572, 200, { h: 10 })}`).join('')}`),

  'mobile-app-development': svg(W, H, `
    ${phone(330, 70, 270, 600, `
      ${text(364, 140, 'Good morning', { size: 15, fill: '#9CA0AB' })}${text(364, 172, 'Your dashboard', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
      <rect x="360" y="196" width="210" height="130" rx="18" fill="url(#hot)"/>${text(380, 236, 'This week', { size: 14, fill: '#fff' })}${text(380, 278, '12 tasks done', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
      ${[0, 1, 2, 3].map((i) => `<rect x="360" y="${344 + i * 68}" width="210" height="56" rx="14" fill="#1D2029"/><circle cx="388" cy="${372 + i * 68}" r="13" fill="${['#FF5B2E', '#3B3F9E', '#0E7490', '#22C55E'][i]}"/>${bar(412, 364 + i * 68, 110, { h: 9, fill: '#ffffff50' })}${bar(412, 380 + i * 68, 70, { h: 8 })}`).join('')}
      <rect x="360" y="618" width="210" height="34" rx="17" fill="#1D2029"/>`)}
    ${phone(640, 150, 240, 520, `
      ${text(668, 216, 'Checkout', { size: 22, weight: 800, fill: '#fff', font: HEAD })}
      <rect x="664" y="240" width="192" height="150" rx="16" fill="#1D2029"/><rect x="680" y="256" width="72" height="72" rx="12" fill="#FFB547"/>${bar(764, 268, 76, { h: 10, fill: '#ffffff55' })}${bar(764, 288, 52, { h: 9 })}
      ${bar(680, 350, 160, { h: 9 })}
      <rect x="664" y="410" width="192" height="44" rx="12" fill="#1D2029"/>${text(680, 438, 'Apple Pay', { size: 15, fill: '#E7E8EC' })}
      <rect x="664" y="560" width="192" height="52" rx="26" fill="url(#hot)"/>${text(760, 592, 'Pay now', { size: 17, fill: '#fff', anchor: 'middle' })}`)}
    ${pill(130, 220, 150, 'iOS', { h: 48, size: 18 })}${pill(130, 286, 150, 'Android', { h: 48, size: 18 })}${pill(130, 352, 150, 'Flutter', { h: 48, size: 18, fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F' })}
    ${pill(920, 300, 170, 'Push alerts', { h: 48, size: 18 })}${pill(920, 366, 170, 'Offline mode', { h: 48, size: 18 })}`),

  'custom-software-development': svg(W, H, `${card(100, 80, 1000, 590, 24)}
    <rect x="100" y="80" width="200" height="590" rx="24" fill="#1D2029"/><rect x="276" y="80" width="24" height="590" fill="#1D2029"/>
    ${bar(130, 120, 110, { h: 16, fill: '#ffffff60' })}
    ${['Overview', 'Orders', 'Inventory', 'Customers', 'Reports'].map((t, i) => `${i === 0 ? '<rect x="120" y="' + (166 + i * 52) + '" width="160" height="40" rx="12" fill="#FF5B2E22"/>' : ''}${text(140, 192 + i * 52, t, { size: 16, fill: i === 0 ? '#FFB08F' : '#9CA0AB' })}`).join('')}
    ${text(340, 136, 'Operations overview', { size: 26, weight: 800, fill: '#fff', font: HEAD })}
    ${['Open orders', 'In stock', 'Avg. delivery'].map((t, i) => `<rect x="${340 + i * 240}" y="164" width="220" height="104" rx="16" fill="#1D2029" stroke="#ffffff10"/>${text(362 + i * 240, 198, t, { size: 15, fill: '#9CA0AB' })}${bar(362 + i * 240, 220, [110, 140, 90][i], { h: 16, fill: i === 0 ? 'url(#hot)' : '#ffffff40' })}`).join('')}
    <rect x="340" y="290" width="460" height="350" rx="16" fill="#1D2029" stroke="#ffffff10"/>
    ${Array.from({ length: 6 }, (_, i) => `<line x1="360" y1="${340 + i * 48}" x2="780" y2="${340 + i * 48}" stroke="#ffffff0d"/>${bar(370, 326 + i * 48, 140, { h: 10, fill: '#ffffff40' })}${bar(540, 326 + i * 48, 90, { h: 10 })}<rect x="680" y="${322 + i * 48}" width="80" height="20" rx="10" fill="${['#22C55E33', '#FF5B2E33', '#22C55E33', '#FFB54733', '#22C55E33', '#3B3F9E55'][i]}"/>`).join('')}
    <rect x="820" y="290" width="240" height="350" rx="16" fill="#1D2029" stroke="#ffffff10"/>
    ${[160, 220, 120, 260, 200].map((h, i) => `<rect x="${846 + i * 40}" y="${600 - h}" width="24" height="${h}" rx="8" fill="${i === 3 ? 'url(#hot)' : '#3A3E4A'}"/>`).join('')}`),

  'ecommerce-development': svg(W, H, `${browser(110, 80, 980, 590, 'shop.example.com')}
    ${bar(150, 150, 110, { h: 14, fill: '#ffffff55' })}
    <circle cx="1030" cy="156" r="18" fill="#1D2029"/><circle cx="1044" cy="144" r="10" fill="#FF5B2E"/>${text(1044, 149, '3', { size: 12, fill: '#fff', anchor: 'middle' })}
    ${[
      ['#FFB547', '#FF5B2E'], ['#7DD3FC', '#3B82F6'], ['#F9A8D4', '#DB2777'], ['#86EFAC', '#16A34A'],
    ]
      .map(([a, b], i) => `<rect x="${150 + i * 230}" y="200" width="210" height="260" rx="18" fill="#1D2029" stroke="#ffffff10"/>
      <rect x="${166 + i * 230}" y="216" width="178" height="160" rx="12" fill="${a}"/><path d="M${210 + i * 230} 330 l45 -70 l45 70 z" fill="${b}" opacity=".85"/>
      ${bar(166 + i * 230, 396, 120, { h: 11, fill: '#ffffff55' })}${text(166 + i * 230, 440, ['$49', '$89', '$35', '$120'][i], { size: 20, weight: 800, fill: '#fff', font: HEAD })}
      <rect x="${290 + i * 230}" y="418" width="54" height="30" rx="10" fill="${i === 1 ? 'url(#hot)' : '#2A2D36'}"/>`)
      .join('')}
    <rect x="150" y="490" width="900" height="140" rx="18" fill="#1D2029" stroke="#FF5B2E55"/>
    ${text(178, 530, 'Express checkout', { size: 18, fill: '#fff' })}${bar(178, 550, 300, { h: 10 })}
    ${['Card', 'Apple Pay', 'PayPal'].map((t, i) => pill(178 + i * 150, 576, 136, t, { h: 38, size: 15 })).join('')}
    <rect x="830" y="560" width="190" height="54" rx="27" fill="url(#hot)"/>${text(925, 593, 'Place order', { size: 17, fill: '#fff', anchor: 'middle' })}`),

  'product-design-development': svg(W, H, `
    ${['Idea', 'Wireframe', 'Prototype', 'Launch'].map((t, i) => pill(140 + i * 240, 100, 200, t, i === 3 ? { h: 48, size: 18, fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F' } : { h: 48, size: 18 })).join('')}
    ${[0, 1, 2].map((i) => `<path d="M${346 + i * 240} 124 h28" stroke="#FF5B2E" stroke-width="3" stroke-dasharray="5 6"/>`).join('')}
    ${card(140, 200, 430, 460)}
    ${text(170, 244, 'Wireframe', { size: 16, fill: '#9CA0AB' })}
    <rect x="170" y="264" width="370" height="120" rx="12" fill="none" stroke="#ffffff30" stroke-dasharray="8 8"/><path d="M170 264 L540 384 M540 264 L170 384" stroke="#ffffff1a"/>
    ${[0, 1, 2].map((i) => `<rect x="${170 + i * 126}" y="404" width="110" height="90" rx="10" fill="none" stroke="#ffffff30" stroke-dasharray="6 6"/>`).join('')}
    ${bar(170, 520, 260, { h: 12 })}${bar(170, 546, 200, { h: 12 })}<rect x="170" y="584" width="150" height="44" rx="22" fill="none" stroke="#ffffff40" stroke-dasharray="6 6"/>
    <path d="M590 430 h40" stroke="url(#hot)" stroke-width="5" stroke-linecap="round"/><path d="M622 418 l14 12 l-14 12" stroke="#FFB547" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${card(650, 200, 410, 460)}
    <rect x="680" y="234" width="350" height="140" rx="16" fill="url(#hot)"/>${text(704, 300, 'Book a session', { size: 28, weight: 800, fill: '#fff', font: HEAD })}${bar(704, 324, 180, { h: 10, fill: '#ffffff99' })}
    ${[0, 1, 2].map((i) => `<rect x="${680 + i * 120}" y="394" width="108" height="96" rx="14" fill="#1D2029"/><circle cx="${734 + i * 120}" cy="${432}" r="18" fill="${['#FFB547', '#7DD3FC', '#86EFAC'][i]}"/>${bar(706 + i * 120, 464, 56, { h: 8, fill: '#ffffff40' })}`).join('')}
    ${bar(680, 520, 260, { h: 12, fill: '#ffffff40' })}${bar(680, 546, 200, { h: 12 })}<rect x="680" y="584" width="160" height="46" rx="23" fill="#fff"/>${text(760, 613, 'Continue', { size: 16, fill: '#0B0D12', anchor: 'middle' })}`),

  'cms-development': svg(W, H, `${browser(110, 80, 980, 590, 'admin · Pages · Home')}
    <rect x="130" y="140" width="220" height="510" rx="14" fill="#1D2029"/>
    ${text(150, 176, 'Blocks', { size: 16, fill: '#9CA0AB' })}
    ${['Hero', 'Features', 'Testimonials', 'Pricing', 'FAQ', 'Footer'].map((t, i) => `<rect x="150" y="${194 + i * 56}" width="180" height="44" rx="10" fill="${i === 0 ? '#FF5B2E22' : '#16181F'}" stroke="${i === 0 ? '#FF5B2E66' : '#ffffff10'}"/>${text(170, 222 + i * 56, t, { size: 15, fill: i === 0 ? '#FFB08F' : '#C9CBD1' })}`).join('')}
    <rect x="370" y="140" width="700" height="510" rx="14" fill="#F7F6F2"/>
    <rect x="400" y="170" width="640" height="200" rx="12" fill="#fff" stroke="#FF5B2E" stroke-width="3" stroke-dasharray="10 6"/>
    ${text(430, 236, 'Summer collection', { size: 34, weight: 800, fill: '#0B0D12', font: HEAD })}${bar(430, 260, 300, { h: 12, fill: '#0B0D1222' })}
    <rect x="430" y="296" width="150" height="46" rx="23" fill="#0B0D12"/>${text(505, 325, 'Shop now', { size: 16, fill: '#fff', anchor: 'middle' })}
    <rect x="870" y="186" width="150" height="168" rx="10" fill="#FFB547"/>
    ${[0, 1, 2].map((i) => `<rect x="${400 + i * 216}" y="394" width="200" height="140" rx="12" fill="#fff"/>${bar(420 + i * 216, 414, 60, { h: 40, fill: '#FF5B2E22' })}${bar(420 + i * 216, 474, 140, { h: 10, fill: '#0B0D1233' })}${bar(420 + i * 216, 494, 100, { h: 10, fill: '#0B0D1222' })}`).join('')}
    ${['WordPress', 'Shopify', 'Webflow'].map((t, i) => pill(400 + i * 170, 568, 156, t, { h: 44, size: 16, fill: '#fff', stroke: '#0B0D1222', color: '#0B0D12' })).join('')}`),

  'software-outsourcing': svg(W, H, `
    ${card(120, 110, 400, 530)}
    ${text(156, 160, 'Your team', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
    ${[['You', 'Product owner', '#FF5B2E'], ['CT', 'CTO', '#3B3F9E'], ['DV', 'Developer', '#0E7490']].map(([i, r, c], k) => `<rect x="156" y="${190 + k * 100}" width="330" height="84" rx="16" fill="#1D2029"/>${avatar(198, 232 + k * 100, 24, i, c)}${text(238, 228 + k * 100, r, { size: 17, fill: '#fff' })}${bar(238, 244 + k * 100, 120, { h: 9 })}`).join('')}
    ${pill(156, 520, 150, 'Your tools', { h: 44, size: 16 })}${pill(316, 520, 170, 'Your rituals', { h: 44, size: 16 })}
    <path d="M540 375 h120" stroke="url(#hot)" stroke-width="6" stroke-linecap="round"/><circle cx="600" cy="375" r="26" fill="url(#hot)"/>${text(600, 383, '+', { size: 30, weight: 800, fill: '#fff', anchor: 'middle' })}
    ${card(680, 110, 400, 530)}
    ${text(716, 160, 'Velotech squad', { size: 24, weight: 800, fill: '#fff', font: HEAD })}
    ${[['FE', 'Frontend', '#FF5B2E'], ['BE', 'Backend', '#B3320A'], ['QA', 'QA engineer', '#16A34A'], ['PM', 'Delivery lead', '#7C3AED']].map(([i, r, c], k) => `<rect x="716" y="${190 + k * 92}" width="330" height="76" rx="16" fill="#1D2029"/>${avatar(756, 228 + k * 92, 22, i, c)}${text(794, 224 + k * 92, r, { size: 17, fill: '#fff' })}<circle cx="1018" cy="${228 + k * 92}" r="7" fill="#22C55E"/>${bar(794, 238 + k * 92, 100, { h: 9 })}`).join('')}
    ${pill(716, 570, 330, 'Same time zone · weekly demos', { h: 44, size: 16, fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F' })}`),

  'ui-ux-design': svg(W, H, `${card(90, 80, 1020, 590, 24)}
    <rect x="90" y="80" width="1020" height="56" rx="24" fill="#1D2029"/><rect x="90" y="112" width="1020" height="24" fill="#1D2029"/>
    ${['Frames', 'Components', 'Prototype'].map((t, i) => text(130 + i * 140, 115, t, { size: 15, fill: i === 0 ? '#fff' : '#9CA0AB' })).join('')}
    <rect x="130" y="170" width="250" height="460" rx="22" fill="#F7F6F2"/>
    <rect x="150" y="196" width="210" height="110" rx="14" fill="url(#hot)"/>${bar(166, 220, 120, { h: 12, fill: '#ffffffcc' })}${bar(166, 244, 80, { h: 10, fill: '#ffffff99' })}
    ${[0, 1, 2].map((i) => `<rect x="150" y="${324 + i * 76}" width="210" height="62" rx="12" fill="#fff"/><circle cx="178" cy="${355 + i * 76}" r="14" fill="${['#FFB547', '#7DD3FC', '#86EFAC'][i]}"/>${bar(202, 346 + i * 76, 110, { h: 9, fill: '#0B0D1244' })}${bar(202, 362 + i * 76, 70, { h: 8, fill: '#0B0D1222' })}`).join('')}
    <rect x="128" y="168" width="254" height="464" rx="24" fill="none" stroke="#3B82F6" stroke-width="2"/>
    <rect x="420" y="170" width="300" height="220" rx="18" fill="#1D2029" stroke="#ffffff10"/>${text(444, 206, 'Buttons', { size: 15, fill: '#9CA0AB' })}
    <rect x="444" y="226" width="140" height="44" rx="22" fill="url(#hot)"/>${text(514, 254, 'Primary', { size: 15, fill: '#fff', anchor: 'middle' })}
    <rect x="444" y="284" width="140" height="44" rx="22" fill="none" stroke="#ffffff40"/>${text(514, 312, 'Secondary', { size: 15, fill: '#fff', anchor: 'middle' })}
    <rect x="600" y="226" width="96" height="102" rx="14" fill="#2A2D36"/>
    <rect x="420" y="410" width="300" height="220" rx="18" fill="#1D2029" stroke="#ffffff10"/>${text(444, 446, 'Colour', { size: 15, fill: '#9CA0AB' })}
    ${['#FF5B2E', '#FFB547', '#0B0D12', '#F7F6F2', '#3B82F6', '#22C55E'].map((c, i) => `<rect x="${444 + (i % 3) * 86}" y="${466 + Math.floor(i / 3) * 76}" width="72" height="60" rx="12" fill="${c}" stroke="#ffffff22"/>`).join('')}
    <rect x="760" y="170" width="310" height="460" rx="18" fill="#1D2029" stroke="#ffffff10"/>${text(784, 206, 'Type scale', { size: 15, fill: '#9CA0AB' })}
    ${text(784, 270, 'Aa', { size: 64, weight: 800, fill: '#fff', font: HEAD })}${[34, 26, 20, 16].map((s, i) => bar(784, 310 + i * 52, 240 - i * 40, { h: s * 0.6, fill: i === 0 ? '#ffffff70' : '#ffffff30' })).join('')}
    <path d="M900 520 l0 46 l12 -12 l10 22 l9 -4 l-10 -21 l17 -1 z" fill="#fff" stroke="#0B0D12" stroke-width="2"/>
    <rect x="922" y="574" width="66" height="26" rx="8" fill="#3B82F6"/>${text(955, 592, 'Mina', { size: 13, fill: '#fff', anchor: 'middle' })}`),
};
Object.entries(devArt).forEach(([slug, content]) => write(`services/${slug}.svg`, content));

/* ═════════════ Blog covers (1200×750) ═════════════ */
const wrap = (s, max = 24) => {
  const lines = [];
  let line = '';
  for (const word of s.split(' ')) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
};
const motif = {
  Product: `${[0, 1, 2].map((i) => `<rect x="${820 + i * 30}" y="${220 + i * 110}" width="230" height="90" rx="16" fill="${i === 0 ? 'url(#hot)' : '#1D2029'}" stroke="#ffffff14"/>`).join('')}`,
  AI: `<circle cx="960" cy="360" r="150" fill="none" stroke="#ffffff14" stroke-width="2"/><circle cx="960" cy="360" r="96" fill="none" stroke="#FF5B2E66" stroke-width="2" stroke-dasharray="6 8"/><circle cx="960" cy="360" r="48" fill="url(#hot)"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${960 + 150 * Math.cos((a * Math.PI) / 180)}" cy="${360 + 150 * Math.sin((a * Math.PI) / 180)}" r="12" fill="#1D2029" stroke="#FFB547"/>`).join('')}`,
  Design: `${['#FF5B2E', '#FFB547', '#F7F6F2', '#3B82F6'].map((c, i) => `<rect x="${830 + (i % 2) * 130}" y="${220 + Math.floor(i / 2) * 130}" width="110" height="110" rx="20" fill="${c}"/>`).join('')}`,
  Mobile: `${[0, 1].map((i) => `<rect x="${840 + i * 130}" y="${200 + i * 50}" width="120" height="250" rx="24" fill="#1D2029" stroke="#ffffff24"/><rect x="${852 + i * 130}" y="${226 + i * 50}" width="96" height="70" rx="12" fill="${i ? '#7DD3FC' : 'url(#hot)'}"/>`).join('')}`,
  Culture: `${[[880, 260, '#FF5B2E'], [990, 300, '#3B3F9E'], [920, 390, '#0E7490'], [1040, 410, '#B3320A']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="48" fill="${c}" stroke="#16181F" stroke-width="5"/>`).join('')}`,
  Engineering: `${[140, 200, 170, 120, 90].map((h, i) => `<rect x="${840 + i * 52}" y="${470 - h}" width="34" height="${h}" rx="10" fill="${i === 4 ? 'url(#hot)' : '#3A3E4A'}"/>`).join('')}<path d="M850 300 L900 280 L960 300 L1010 340 L1070 370" stroke="#86EFAC" stroke-width="4" fill="none"/>`,
};
for (const p of posts) {
  // no headline on the cover — the card and the article already show the title
  write(
    `blog/${p.slug}.svg`,
    svg(W, H, `
    ${text(600, 470, p.category.toUpperCase(), { size: 200, weight: 800, fill: '#ffffff08', anchor: 'middle', font: HEAD })}
    <g transform="translate(600 375) scale(1.55) translate(-960 -350)">${motif[p.category] ?? motif.Product}</g>
    ${text(70, 690, 'Velotech Insights', { size: 20, weight: 700, fill: '#9CA0AB' })}
    <rect x="70" y="706" width="120" height="5" rx="2.5" fill="url(#hot)"/>`),
  );
}

console.log(`✔ ${culture.length} culture scenes, ${Object.keys(devArt).length} service illustrations, ${posts.length} blog covers`);
