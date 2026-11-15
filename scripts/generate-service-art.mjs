/**
 * Generates the AI service illustrations in public/images/services/.
 * Run: node scripts/generate-service-art.mjs
 * Brand palette: ink #0B0D12, orange #FF5B2E → amber #FFB547.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = join(process.cwd(), 'public', 'images', 'services');
mkdirSync(out, { recursive: true });

const W = 1200;
const H = 750;
const FONT = "Manrope, 'Segoe UI', Arial, sans-serif";

const frame = (body, extraDefs = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FONT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#14161D"/><stop offset="1" stop-color="#0B0D12"/>
    </linearGradient>
    <linearGradient id="hot" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#FF5B2E"/><stop offset="1" stop-color="#FFB547"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.12" r="0.7">
      <stop offset="0" stop-color="#FF5B2E" stop-opacity=".35"/><stop offset="1" stop-color="#FF5B2E" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity=".05"/>
    </pattern>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity=".45"/>
    </filter>
    ${extraDefs}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
${body}
</svg>
`;

const pill = (x, y, w, label, { fill = '#1D2029', stroke = '#ffffff22', color = '#E7E8EC', size = 22, h = 56 } = {}) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}"/>
    <text x="${x + w / 2}" y="${y + h / 2 + size * 0.36}" font-size="${size}" font-weight="700" fill="${color}" text-anchor="middle">${label}</text>
  </g>`;

/* 1 ── AI Automation: a workflow that runs itself */
const automation = frame(`
  <g filter="url(#sh)">
    <rect x="90" y="110" width="1020" height="530" rx="32" fill="#16181F" stroke="#ffffff14"/>
  </g>
  <text x="140" y="180" font-size="26" font-weight="800" fill="#fff">Lead follow-up workflow</text>
  <circle cx="1040" cy="171" r="8" fill="#22C55E"/><text x="1022" y="180" font-size="20" font-weight="700" fill="#86EFAC" text-anchor="end">Running</text>
  <path d="M300 268 H900" stroke="#ffffff33" stroke-width="3" stroke-dasharray="10 10"/>
  ${pill(140, 240, 170, 'New lead')}
  <g>
    <rect x="400" y="232" width="200" height="72" rx="36" fill="url(#hot)"/>
    <text x="500" y="277" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">AI agent</text>
  </g>
  ${pill(680, 240, 180, 'CRM updated')}
  ${pill(900, 240, 170, 'Email sent')}
  ${[
    ['Lead qualified and added to CRM', 360],
    ['Invoice details extracted to accounting', 440],
    ['Weekly sales report sent to Slack', 520],
  ]
    .map(
      ([t, y]) => `
  <rect x="140" y="${y}" width="920" height="60" rx="16" fill="#1D2029" stroke="#ffffff10"/>
  <circle cx="176" cy="${y + 30}" r="7" fill="#FF5B2E"/>
  <text x="200" y="${y + 38}" font-size="22" font-weight="600" fill="#D7D9DF">${t}</text>
  <rect x="922" y="${y + 14}" width="118" height="32" rx="16" fill="#22C55E22"/>
  <text x="981" y="${y + 37}" font-size="17" font-weight="700" fill="#86EFAC" text-anchor="middle">Automated</text>`,
    )
    .join('')}
`);

/* 2 ── AI Integration: AI plugged into the tools you already use */
const apps = ['CRM', 'ERP', 'Website', 'Help desk', 'WhatsApp', 'Docs'];
const cx = 600;
const cy = 385;
const r = 245;
const integration = frame(`
  ${apps
    .map((_, i) => {
      const a = (-90 + i * 60) * (Math.PI / 180);
      return `<line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(a)}" y2="${cy + r * 0.82 * Math.sin(a)}" stroke="#ffffff30" stroke-width="3" stroke-dasharray="8 10"/>`;
    })
    .join('')}
  <circle cx="${cx}" cy="${cy}" r="150" fill="#FF5B2E" opacity=".08"/>
  <circle cx="${cx}" cy="${cy}" r="105" fill="#FF5B2E" opacity=".14"/>
  <g filter="url(#sh)"><circle cx="${cx}" cy="${cy}" r="72" fill="url(#hot)"/></g>
  <text x="${cx}" y="${cy + 14}" font-size="40" font-weight="800" fill="#fff" text-anchor="middle">AI</text>
  ${apps
    .map((label, i) => {
      const a = (-90 + i * 60) * (Math.PI / 180);
      const w = 190;
      const x = cx + r * Math.cos(a) - w / 2;
      const y = cy + r * 0.82 * Math.sin(a) - 32;
      return `<g filter="url(#sh)">${pill(x, y, w, label, { fill: '#1D2029', h: 64, size: 24 })}</g>`;
    })
    .join('')}
`);

/* 3 ── AI for Business Growth: more of the right customers */
const bars = [150, 185, 175, 230, 265, 310, 360];
const growth = frame(`
  <g filter="url(#sh)">
    <rect x="110" y="110" width="980" height="530" rx="32" fill="#16181F" stroke="#ffffff14"/>
  </g>
  <text x="160" y="182" font-size="26" font-weight="800" fill="#fff">Qualified leads</text>
  <text x="160" y="216" font-size="19" font-weight="600" fill="#9CA0AB">AI scoring · personalised follow-ups</text>
  ${pill(820, 150, 220, 'AI-assisted', { fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F', size: 20, h: 48 })}
  ${[300, 400, 500].map((y) => `<line x1="160" y1="${y}" x2="1040" y2="${y}" stroke="#ffffff10"/>`).join('')}
  ${bars
    .map((h, i) => {
      const x = 180 + i * 122;
      const last = i === bars.length - 1;
      return `<rect x="${x}" y="${590 - h}" width="78" height="${h}" rx="14" fill="${last ? 'url(#hot)' : i >= 4 ? '#3A3E4A' : '#2A2D36'}"/>`;
    })
    .join('')}
  <path d="M219 452 L341 418 L463 428 L585 372 L707 338 L829 292 L951 246" fill="none" stroke="#FFB547" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="951" cy="246" r="9" fill="#FFB547"/>
`);

/* 4 ── AI Development: an assistant grounded in your own data */
const development = frame(`
  <g filter="url(#sh)">
    <rect x="170" y="90" width="860" height="570" rx="32" fill="#16181F" stroke="#ffffff14"/>
  </g>
  <rect x="470" y="140" width="510" height="76" rx="22" fill="#fff"/>
  <text x="725" y="186" font-size="22" font-weight="700" fill="#0B0D12" text-anchor="middle">Summarise our supplier renewal terms</text>
  <g>
    <rect x="220" y="250" width="620" height="300" rx="24" fill="#1D2029" stroke="#ffffff12"/>
    <circle cx="262" cy="292" r="18" fill="url(#hot)"/>
    <text x="294" y="300" font-size="20" font-weight="800" fill="#FFB08F">Your AI assistant</text>
    ${[340, 380, 420, 460].map((y, i) => `<rect x="252" y="${y}" width="${[540, 500, 520, 340][i]}" height="16" rx="8" fill="#ffffff${i === 0 ? '30' : '1e'}"/>`).join('')}
    <text x="252" y="522" font-size="18" font-weight="600" fill="#9CA0AB">Sources: 3 contracts · 2 policies</text>
  </g>
  ${pill(250, 585, 170, 'RAG search', { size: 18, h: 44, fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F' })}
  ${pill(436, 585, 150, 'Your data', { size: 18, h: 44 })}
  ${pill(602, 585, 150, 'Private', { size: 18, h: 44 })}
`);

/* 5 ── UGC Video Production: a creator video built to be tested */
const ugc = frame(`
  <g filter="url(#sh)">
    <rect x="465" y="70" width="270" height="560" rx="40" fill="#1D2029" stroke="#ffffff22"/>
    <rect x="477" y="82" width="246" height="536" rx="30" fill="url(#hot)"/>
  </g>
  <circle cx="600" cy="270" r="58" fill="#FFD2B8"/>
  <ellipse cx="600" cy="470" rx="110" ry="90" fill="#B3320A" opacity=".55"/>
  <rect x="560" y="94" width="80" height="20" rx="10" fill="#0B0D12"/>
  <circle cx="600" cy="360" r="38" fill="#ffffff44"/>
  <path d="M590 342 L618 360 L590 378 Z" fill="#fff"/>
  <rect x="495" y="520" width="170" height="16" rx="8" fill="#ffffffcc"/>
  <rect x="495" y="546" width="120" height="16" rx="8" fill="#ffffff99"/>
  <rect x="495" y="574" width="96" height="28" rx="8" fill="#fff"/>
  <text x="543" y="593" font-size="15" font-weight="800" fill="#0B0D12" text-anchor="middle">Shop now</text>
  ${[430, 474, 518].map((y) => `<circle cx="700" cy="${y}" r="17" fill="#00000044"/>`).join('')}
  <path d="M692 428 a6 6 0 0 1 8 -6 a6 6 0 0 1 8 6 c0 6 -8 11 -8 11 s-8 -5 -8 -11z" fill="#FF4D6D"/>
  ${pill(150, 170, 230, 'Hook A · “Wait…”', { size: 20, h: 54, fill: '#1D2029' })}
  ${pill(150, 244, 230, 'Hook B · “POV:”', { size: 20, h: 54, fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F' })}
  ${pill(150, 318, 230, 'Hook C · Demo', { size: 20, h: 54, fill: '#1D2029' })}
  ${pill(820, 210, 230, '9:16 · Reels', { size: 20, h: 54 })}
  ${pill(820, 284, 230, '1:1 · Feed', { size: 20, h: 54 })}
  ${pill(820, 358, 230, '16:9 · YouTube', { size: 20, h: 54 })}
`);

/* 6 ── Paid Ads Management: campaigns across platforms, measured */
const adsBars = [120, 170, 150, 210, 250, 300];
const ads = frame(`
  <g filter="url(#sh)">
    <rect x="110" y="100" width="980" height="550" rx="32" fill="#16181F" stroke="#ffffff14"/>
  </g>
  <text x="160" y="172" font-size="26" font-weight="800" fill="#fff">Campaign performance</text>
  ${pill(160, 200, 120, 'Meta', { size: 18, h: 44, fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F' })}
  ${pill(292, 200, 130, 'Google', { size: 18, h: 44 })}
  ${pill(434, 200, 124, 'TikTok', { size: 18, h: 44 })}
  ${['Spend', 'Cost per result', 'Return on ad spend']
    .map(
      (t, i) => `
  <rect x="${160 + i * 300}" y="280" width="280" height="96" rx="18" fill="#1D2029" stroke="#ffffff10"/>
  <text x="${184 + i * 300}" y="316" font-size="18" font-weight="600" fill="#9CA0AB">${t}</text>
  <rect x="${184 + i * 300}" y="336" width="${[150, 110, 170][i]}" height="16" rx="8" fill="${i === 2 ? 'url(#hot)' : '#ffffff30'}"/>`,
    )
    .join('')}
  ${adsBars
    .map((h, i) => `<rect x="${190 + i * 140}" y="${620 - h * 0.62}" width="80" height="${h * 0.62}" rx="12" fill="${i === adsBars.length - 1 ? 'url(#hot)' : '#2A2D36'}"/>`)
    .join('')}
  <path d="M230 560 L370 528 L510 540 L650 500 L790 470 L930 432" fill="none" stroke="#FFB547" stroke-width="4" stroke-linecap="round"/>
`);

/* 7 ── Digital Marketing: one plan across every channel */
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const posts = [
  [0, 0, 'hot'], [1, 1, '#3A3E4A'], [2, 0, '#3A3E4A'], [3, 2, 'hot'], [4, 1, '#3A3E4A'],
  [0, 2, '#3A3E4A'], [2, 2, 'hot'], [4, 0, '#2A2D36'],
];
const marketing = frame(`
  <g filter="url(#sh)">
    <rect x="110" y="100" width="980" height="550" rx="32" fill="#16181F" stroke="#ffffff14"/>
  </g>
  <text x="160" y="172" font-size="26" font-weight="800" fill="#fff">Content calendar</text>
  ${pill(720, 140, 110, 'Social', { size: 18, h: 44, fill: '#FF5B2E22', stroke: '#FF5B2E66', color: '#FFB08F' })}
  ${pill(842, 140, 90, 'SEO', { size: 18, h: 44 })}
  ${pill(944, 140, 100, 'Email', { size: 18, h: 44 })}
  ${days.map((d, i) => `<text x="${222 + i * 176}" y="236" font-size="18" font-weight="700" fill="#9CA0AB" text-anchor="middle">${d}</text>`).join('')}
  ${days
    .map((_, c) => [0, 1, 2].map((r) => `<rect x="${152 + c * 176}" y="${256 + r * 120}" width="140" height="104" rx="16" fill="#1D2029" stroke="#ffffff0d"/>`).join(''))
    .join('')}
  ${posts
    .map(
      ([c, r, fill]) => `
  <rect x="${164 + c * 176}" y="${268 + r * 120}" width="116" height="48" rx="10" fill="${fill === 'hot' ? 'url(#hot)' : fill}"/>
  <rect x="${164 + c * 176}" y="${326 + r * 120}" width="${[90, 70, 100][r]}" height="10" rx="5" fill="#ffffff30"/>`,
    )
    .join('')}
`);

const files = {
  'ai-automation.svg': automation,
  'ai-integration.svg': integration,
  'ai-business-growth.svg': growth,
  'ai-development.svg': development,
  'ugc-video-production.svg': ugc,
  'paid-ads-management.svg': ads,
  'digital-marketing.svg': marketing,
};
for (const [name, svg] of Object.entries(files)) writeFileSync(join(out, name), svg);
console.log(`wrote ${Object.keys(files).length} illustrations to public/images/services/`);
