/**
 * Colourful, topic-specific case-study illustrations (1200×750 SVG).
 * Original artwork built from simple shapes — replace with real project
 * screenshots in src/data/images.js whenever you have them.
 */
const W = 1200;
const H = 750;

const frame = (id, [a, b], body, note) => `<!-- PLACEHOLDER: ${note} — replace with a real project image (1200×750) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Manrope, 'Segoe UI', Arial, sans-serif">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity=".22"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#${id})"/>
  <circle cx="1080" cy="80" r="260" fill="#fff" opacity=".10"/>
  <circle cx="90" cy="700" r="230" fill="#fff" opacity=".08"/>
  ${body}
</svg>`;

/** White app window with a title bar */
const windowBox = (x, y, w, h) => `
  <g filter="url(#sh)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="#fff"/>
  </g>
  <rect x="${x}" y="${y}" width="${w}" height="46" rx="22" fill="#F8FAFC"/>
  <rect x="${x}" y="${y + 30}" width="${w}" height="16" fill="#F8FAFC"/>
  <circle cx="${x + 28}" cy="${y + 23}" r="6" fill="#FF5F57"/><circle cx="${x + 48}" cy="${y + 23}" r="6" fill="#FEBC2E"/><circle cx="${x + 68}" cy="${y + 23}" r="6" fill="#28C840"/>`;

const bar = (x, y, w, h = 12, c = '#E2E8F0') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}"/>`;

/* ───────── 1. Healthcare — telehealth video visit ───────── */
const healthcare = () =>
  frame('g1', ['#0E7490', '#2DD4BF'], `
  ${windowBox(130, 100, 940, 560)}
  <!-- video call -->
  <rect x="160" y="170" width="520" height="350" rx="18" fill="#0F172A"/>
  <circle cx="420" cy="300" r="62" fill="#F5C9A5"/>
  <path d="M358 285c0-48 30-78 64-78 40 0 64 32 60 74-10-26-30-40-62-42-28-2-50 18-62 46z" fill="#3B2A20"/>
  <path d="M300 520c8-82 56-128 120-128s112 46 120 128z" fill="#14B8A6"/>
  <path d="M400 405l20 26 20-26" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
  <rect x="560" y="400" width="100" height="100" rx="12" fill="#1E293B" stroke="#fff" stroke-opacity=".3"/>
  <circle cx="610" cy="438" r="18" fill="#E8B892"/><path d="M582 500c4-26 14-40 28-40s24 14 28 40z" fill="#6366F1"/>
  <circle cx="360" cy="555" r="22" fill="#EF4444"/><path d="M350 555h20" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  <circle cx="420" cy="555" r="22" fill="#E2E8F0"/><circle cx="480" cy="555" r="22" fill="#E2E8F0"/>
  <!-- heart rate -->
  <rect x="710" y="170" width="330" height="160" rx="16" fill="#F0FDFA" stroke="#99F6E4"/>
  <text x="732" y="206" font-size="18" font-weight="700" fill="#0F766E">Heart rate</text>
  <text x="900" y="206" font-size="26" font-weight="800" fill="#0F172A">72</text><text x="944" y="206" font-size="14" fill="#64748B">bpm</text>
  <polyline points="732,280 790,280 806,250 822,312 840,226 858,296 874,280 1018,280" fill="none" stroke="#14B8A6" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <!-- appointments -->
  <rect x="710" y="350" width="330" height="270" rx="16" fill="#fff" stroke="#E2E8F0"/>
  <text x="732" y="386" font-size="18" font-weight="700" fill="#0F172A">Today</text>
  ${[0, 1, 2].map((k) => `<rect x="732" y="${408 + k * 64}" width="286" height="50" rx="12" fill="${['#ECFEFF', '#F0FDF4', '#FEF3C7'][k]}"/>
  <circle cx="758" cy="${433 + k * 64}" r="12" fill="${['#06B6D4', '#22C55E', '#F59E0B'][k]}"/>
  ${bar(782, 422 + k * 64, 120, 10, '#334155')}${bar(782, 440 + k * 64, 80, 8, '#94A3B8')}
  <text x="960" y="${439 + k * 64}" font-size="15" font-weight="700" fill="#334155">${['09:30', '11:00', '14:15'][k]}</text>`).join('')}
  <!-- medical badge -->
  <circle cx="1060" cy="140" r="44" fill="#fff" filter="url(#sh)"/>
  <path d="M1050 116h20v14h14v20h-14v14h-20v-14h-14v-20h14z" fill="#14B8A6"/>
  `, 'projects/project-1 (healthcare)');

/* ───────── 2. Fintech — mobile wallet ───────── */
const fintech = () =>
  frame('g2', ['#312E81', '#A855F7'], `
  <!-- back card -->
  <g transform="rotate(-14 820 300)" filter="url(#sh)">
    <rect x="690" y="200" width="380" height="230" rx="24" fill="url(#cardB)"/>
  </g>
  <defs>
    <linearGradient id="cardA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366F1"/><stop offset="1" stop-color="#EC4899"/></linearGradient>
    <linearGradient id="cardB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F59E0B"/><stop offset="1" stop-color="#F97316"/></linearGradient>
  </defs>
  <!-- phone -->
  <g filter="url(#sh)"><rect x="420" y="60" width="320" height="640" rx="44" fill="#0B0B12"/></g>
  <rect x="434" y="74" width="292" height="612" rx="34" fill="#fff"/>
  <rect x="535" y="88" width="90" height="20" rx="10" fill="#0B0B12"/>
  <text x="458" y="150" font-size="15" fill="#64748B">Total balance</text>
  <text x="458" y="190" font-size="34" font-weight="800" fill="#0F172A">$12,480</text>
  <rect x="458" y="210" width="244" height="148" rx="18" fill="url(#cardA)"/>
  <rect x="478" y="240" width="40" height="30" rx="6" fill="#FDE68A"/>
  <circle cx="664" cy="330" r="14" fill="#fff" opacity=".7"/><circle cx="682" cy="330" r="14" fill="#fff" opacity=".4"/>
  ${bar(478, 320, 120, 10, 'rgba(255,255,255,.75)')}
  <!-- mini chart -->
  ${[44, 70, 52, 88, 64, 100, 76].map((h, k) => `<rect x="${462 + k * 34}" y="${470 - h}" width="22" height="${h}" rx="6" fill="${k === 5 ? '#7C3AED' : '#DDD6FE'}"/>`).join('')}
  <!-- transactions -->
  ${[0, 1, 2].map((k) => `<circle cx="478" cy="${514 + k * 54}" r="18" fill="${['#DCFCE7', '#FFEDD5', '#DBEAFE'][k]}"/>
  <circle cx="478" cy="${514 + k * 54}" r="7" fill="${['#22C55E', '#F97316', '#3B82F6'][k]}"/>
  ${bar(506, 504 + k * 54, 110, 10, '#334155')}${bar(506, 522 + k * 54, 70, 8, '#94A3B8')}
  <text x="702" y="${520 + k * 54}" font-size="15" font-weight="700" text-anchor="end" fill="${k === 0 ? '#16A34A' : '#0F172A'}">${['+$860', '-$42', '-$128'][k]}</text>`).join('')}
  <!-- success toast -->
  <g filter="url(#sh)"><rect x="140" y="420" width="250" height="84" rx="18" fill="#fff"/></g>
  <circle cx="186" cy="462" r="20" fill="#22C55E"/><path d="M176 462l7 7 14-14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="218" y="456" font-size="17" font-weight="700" fill="#0F172A">Transfer sent</text>
  <text x="218" y="480" font-size="14" fill="#64748B">Instant · 0 fees</text>
  <!-- coins -->
  ${[[220, 230, 46], [300, 300, 32], [980, 600, 40]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FBBF24"/><circle cx="${x}" cy="${y}" r="${r * 0.68}" fill="none" stroke="#F59E0B" stroke-width="4"/>`).join('')}
  `, 'projects/project-2 (fintech)');

/* ───────── 3. E-commerce — fashion storefront ───────── */
const tee = (cx, cy, c) => `<path transform="translate(${cx} ${cy})" d="M-46 -34 L-17 -50 Q0 -40 17 -50 L46 -34 L34 -10 L24 -15 L24 46 L-24 46 L-24 -15 L-34 -10 Z" fill="${c}"/>`;
const ecommerce = () =>
  frame('g3', ['#F97316', '#EC4899'], `
  ${windowBox(130, 90, 940, 580)}
  <!-- nav -->
  <text x="170" y="178" font-size="24" font-weight="800" fill="#0F172A">THREADLINE</text>
  ${[0, 1, 2, 3].map((k) => bar(560 + k * 90, 166, 64, 10, '#CBD5E1')).join('')}
  <circle cx="1012" cy="170" r="20" fill="#0F172A"/><path d="M1002 166h20l-3 12h-14z" fill="#fff"/>
  <circle cx="1026" cy="156" r="11" fill="#EC4899"/><text x="1026" y="161" font-size="12" font-weight="800" text-anchor="middle" fill="#fff">3</text>
  <!-- hero banner -->
  <rect x="170" y="210" width="860" height="150" rx="18" fill="#FFEDD5"/>
  <text x="206" y="268" font-size="34" font-weight="800" fill="#7C2D12">Summer Drop</text>
  <text x="206" y="300" font-size="17" fill="#9A3412">New arrivals · up to 40% off</text>
  <rect x="206" y="318" width="140" height="28" rx="14" fill="#0F172A"/>
  ${tee(860, 288, '#FB923C')}${tee(960, 300, '#EC4899')}
  <!-- products -->
  ${[['#FEF3C7', '#F59E0B'], ['#DBEAFE', '#3B82F6'], ['#FCE7F3', '#DB2777'], ['#DCFCE7', '#16A34A']].map(([bg, c], k) => `
  <rect x="${170 + k * 220}" y="384" width="200" height="190" rx="16" fill="${bg}"/>
  ${tee(270 + k * 220, 478, c)}
  ${bar(170 + k * 220, 592, 120, 10, '#334155')}
  <text x="${170 + k * 220}" y="636" font-size="18" font-weight="800" fill="#0F172A">$${[39, 54, 48, 62][k]}</text>
  <rect x="${300 + k * 220}" y="616" width="70" height="28" rx="14" fill="#EC4899"/>`).join('')}
  `, 'projects/project-3 (e-commerce)');

/* ───────── 4. Logistics — fleet map ───────── */
const truck = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-34" y="-22" width="44" height="30" rx="5" fill="#0F172A"/><path d="M10 -14h16l10 12v10h-26z" fill="#10B981"/><circle cx="-20" cy="10" r="7" fill="#334155"/><circle cx="22" cy="10" r="7" fill="#334155"/></g>`;
const pin = (x, y, c) => `<path transform="translate(${x} ${y})" d="M0 0c-14-18-22-28-22-40a22 22 0 0 1 44 0c0 12-8 22-22 40z" fill="${c}"/><circle cx="${x}" cy="${y - 40}" r="8" fill="#fff"/>`;
const logistics = () =>
  frame('g4', ['#065F46', '#34D399'], `
  ${windowBox(130, 90, 940, 580)}
  <!-- map -->
  <rect x="160" y="160" width="580" height="480" rx="16" fill="#ECFDF5"/>
  ${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M160 ${210 + k * 80}H740" stroke="#D1FAE5" stroke-width="10"/>`).join('')}
  ${[0, 1, 2, 3, 4, 5, 6].map((k) => `<path d="M${200 + k * 85} 160V640" stroke="#D1FAE5" stroke-width="10"/>`).join('')}
  <path d="M220 590 C 300 520, 330 420, 430 400 S 600 300, 680 220" fill="none" stroke="#10B981" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 22"/>
  ${pin(220, 600, '#F43F5E')}${pin(680, 230, '#2563EB')}
  ${truck(440, 404)}
  <!-- stats -->
  <rect x="770" y="160" width="270" height="200" rx="16" fill="#fff" stroke="#E2E8F0"/>
  <text x="794" y="196" font-size="17" font-weight="700" fill="#0F172A">On-time delivery</text>
  <circle cx="905" cy="282" r="52" fill="none" stroke="#D1FAE5" stroke-width="14"/>
  <circle cx="905" cy="282" r="52" fill="none" stroke="#10B981" stroke-width="14" stroke-dasharray="314 327" stroke-linecap="round" transform="rotate(-90 905 282)"/>
  <text x="905" y="290" font-size="24" font-weight="800" text-anchor="middle" fill="#0F172A">96%</text>
  <rect x="770" y="380" width="270" height="260" rx="16" fill="#fff" stroke="#E2E8F0"/>
  <text x="794" y="416" font-size="17" font-weight="700" fill="#0F172A">Fleet</text>
  ${[0, 1, 2].map((k) => `<circle cx="806" cy="${452 + k * 60}" r="10" fill="${['#22C55E', '#F59E0B', '#22C55E'][k]}"/>
  ${bar(828, 442 + k * 60, 130, 10, '#334155')}${bar(828, 460 + k * 60, 90, 8, '#94A3B8')}`).join('')}
  `, 'projects/project-4 (logistics)');

/* ───────── 5. Education — learning platform ───────── */
const education = () =>
  frame('g5', ['#B45309', '#FBBF24'], `
  ${windowBox(130, 90, 940, 580)}
  <text x="170" y="178" font-size="26" font-weight="800" fill="#0F172A">My courses</text>
  ${[['#E0E7FF', '#4F46E5'], ['#FEF3C7', '#D97706'], ['#D1FAE5', '#059669']].map(([bg, c], k) => `
  <rect x="${170 + k * 210}" y="210" width="190" height="270" rx="16" fill="#fff" stroke="#E2E8F0"/>
  <rect x="${170 + k * 210}" y="210" width="190" height="120" rx="16" fill="${bg}"/>
  <rect x="${170 + k * 210}" y="300" width="190" height="30" fill="${bg}"/>
  ${k === 1 ? `<path d="M${250 + k * 210} 248l34 20-34 20z" fill="${c}"/>` : `<rect x="${236 + k * 210}" y="246" width="58" height="46" rx="6" fill="${c}"/><path d="M${265 + k * 210} 246v46" stroke="${bg}" stroke-width="4"/>`}
  ${bar(188 + k * 210, 350, 130, 11, '#334155')}${bar(188 + k * 210, 372, 90, 9, '#94A3B8')}
  ${bar(188 + k * 210, 430, 154, 10, '#E2E8F0')}${bar(188 + k * 210, 430, [120, 70, 140][k], 10, c)}
  <text x="${188 + k * 210}" y="466" font-size="14" font-weight="700" fill="#475569">${[78, 45, 92][k]}% complete</text>`).join('')}
  <!-- progress ring -->
  <rect x="810" y="210" width="230" height="270" rx="16" fill="#FFFBEB" stroke="#FDE68A"/>
  <circle cx="925" cy="320" r="62" fill="none" stroke="#FDE68A" stroke-width="16"/>
  <circle cx="925" cy="320" r="62" fill="none" stroke="#D97706" stroke-width="16" stroke-dasharray="280 390" stroke-linecap="round" transform="rotate(-90 925 320)"/>
  <text x="925" y="330" font-size="28" font-weight="800" text-anchor="middle" fill="#0F172A">72%</text>
  <text x="925" y="430" font-size="16" font-weight="700" text-anchor="middle" fill="#92400E">Weekly goal</text>
  <!-- streak strip -->
  <rect x="170" y="510" width="870" height="120" rx="16" fill="#0F172A"/>
  <path d="M230 548 l50 -22 50 22 -50 22z" fill="#FBBF24"/><rect x="262" y="560" width="36" height="22" rx="4" fill="#FBBF24"/>
  <text x="360" y="566" font-size="24" font-weight="800" fill="#fff">12-day learning streak</text>
  <text x="360" y="594" font-size="16" fill="#CBD5E1">Keep going — 3 lessons left this week</text>
  ${[0, 1, 2, 3, 4, 5, 6].map((k) => `<circle cx="${790 + k * 34}" cy="570" r="12" fill="${k < 5 ? '#F59E0B' : '#334155'}"/>`).join('')}
  `, 'projects/project-5 (education)');

/* ───────── 6. Real estate — property marketplace ───────── */
const house = (x, y, s, roof, wall) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-60 0 L0 -50 L60 0 Z" fill="${roof}"/><rect x="-48" y="0" width="96" height="70" fill="${wall}"/>
  <rect x="-12" y="30" width="24" height="40" fill="#7C2D12"/><rect x="-38" y="14" width="20" height="18" fill="#BAE6FD"/><rect x="18" y="14" width="20" height="18" fill="#BAE6FD"/></g>`;
const realEstate = () =>
  frame('g6', ['#0369A1', '#38BDF8'], `
  ${windowBox(130, 90, 940, 580)}
  <!-- map -->
  <rect x="160" y="160" width="470" height="480" rx="16" fill="#E0F2FE"/>
  <path d="M160 300 C 260 280, 340 360, 460 330 S 600 260, 630 280" fill="none" stroke="#BAE6FD" stroke-width="26"/>
  <path d="M330 160V640M160 480H630" stroke="#fff" stroke-width="14"/>
  ${[[250, 240, '$420k'], [470, 420, '$610k'], [300, 560, '$385k']].map(([x, y, p], k) => `
  <g filter="url(#sh)"><rect x="${x - 50}" y="${y - 22}" width="100" height="36" rx="18" fill="${k === 1 ? '#0F172A' : '#fff'}"/></g>
  <text x="${x}" y="${y + 3}" font-size="16" font-weight="800" text-anchor="middle" fill="${k === 1 ? '#fff' : '#0F172A'}">${p}</text>`).join('')}
  <!-- listings -->
  ${[['#FDE68A', '#DC2626', '#FEF3C7'], ['#C7D2FE', '#1E3A8A', '#E0E7FF']].map(([sky, roof, wall], k) => `
  <rect x="660" y="${160 + k * 245}" width="380" height="225" rx="16" fill="#fff" stroke="#E2E8F0"/>
  <rect x="676" y="${176 + k * 245}" width="150" height="193" rx="12" fill="${sky}"/>
  ${house(751, 290 + k * 245, 0.95, roof, wall)}
  <text x="846" y="${214 + k * 245}" font-size="24" font-weight="800" fill="#0F172A">${['$610,000', '$420,000'][k]}</text>
  ${bar(846, 232 + k * 245, 160, 10, '#334155')}${bar(846, 252 + k * 245, 110, 8, '#94A3B8')}
  ${[0, 1, 2].map((d) => `<rect x="${846 + d * 58}" y="${300 + k * 245}" width="48" height="26" rx="13" fill="#F1F5F9"/>`).join('')}
  <rect x="846" y="${340 + k * 245}" width="120" height="16" rx="8" fill="#0EA5E9"/>`).join('')}
  `, 'projects/project-6 (real estate)');

export const projectArt = [healthcare, fintech, ecommerce, logistics, education, realEstate];
