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

const files = {
  'ai-automation.svg': automation,
  'ai-integration.svg': integration,
  'ai-business-growth.svg': growth,
  'ai-development.svg': development,
};
for (const [name, svg] of Object.entries(files)) writeFileSync(join(out, name), svg);
console.log(`wrote ${Object.keys(files).length} illustrations to public/images/services/`);
