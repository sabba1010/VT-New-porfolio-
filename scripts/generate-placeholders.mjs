/**
 * Generates lightweight SVG placeholder images into /public/images.
 *
 * Run:  npm run placeholders
 *
 * Every placeholder is referenced from src/data/images.js — to use real
 * assets, drop your files into /public/images (any format: .jpg/.png/.webp/.svg)
 * and update the matching path in src/data/images.js.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectArt } from './project-art.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

const gradients = [
  ['#FF5B2E', '#FF9A62'],
  ['#1E2A78', '#4F6BFF'],
  ['#0F766E', '#34D399'],
  ['#5B21B6', '#A78BFA'],
  ['#14171F', '#3A4150'],
  ['#B45309', '#FBBF24'],
  ['#9D174D', '#F472B6'],
  ['#075985', '#38BDF8'],
  ['#3F6212', '#A3E635'],
  ['#7C2D12', '#FB923C'],
];

const write = (rel, svg) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + '\n');
};

const defs = (id, [a, b], angle = 135) => `
  <defs>
    <linearGradient id="${id}" gradientTransform="rotate(${angle - 90} .5 .5)">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
  </defs>`;

/* ---------- Portraits (team + testimonial clients) ---------- */
const portrait = (name, i) => {
  const g = gradients[(i * 3) % gradients.length];
  const skin = ['#F1C7A6', '#C98E66', '#8D5A3B', '#E8B892', '#6B4129', '#F5D3B8'][i % 6];
  const hair = ['#1F1A17', '#3B2418', '#0E0E10', '#5A3A22', '#161616', '#7A5230'][i % 6];
  return `<!-- PLACEHOLDER: ${name} — replace with a real photo -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480">
  ${defs('g', g, 160)}
  <rect width="400" height="480" fill="url(#g)"/>
  <circle cx="320" cy="80" r="120" fill="#fff" opacity=".08"/>
  <path d="M60 480c8-92 64-150 140-150s132 58 140 150z" fill="#0B0D12" opacity=".85"/>
  <path d="M150 340l50 46 50-46" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="6"/>
  <rect x="172" y="262" width="56" height="70" rx="20" fill="${skin}"/>
  <ellipse cx="200" cy="200" rx="74" ry="86" fill="${skin}"/>
  <path d="M124 196c-4-70 38-106 80-106 52 0 82 40 74 104-10-30-34-52-76-56-38-3-64 22-78 58z" fill="${hair}"/>
</svg>`;
};

/* ---------- Project mockups ---------- */
const projectLayouts = [
  // dashboard
  (w) => `
  <rect x="120" y="110" width="${w - 240}" height="520" rx="22" fill="#fff" opacity=".96"/>
  <rect x="120" y="110" width="${w - 240}" height="48" rx="22" fill="#0B0D12" opacity=".9"/>
  <circle cx="150" cy="134" r="7" fill="#FF5F57"/><circle cx="172" cy="134" r="7" fill="#FEBC2E"/><circle cx="194" cy="134" r="7" fill="#28C840"/>
  <rect x="144" y="182" width="170" height="424" rx="14" fill="#F1F2F5"/>
  ${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="164" y="${206 + k * 40}" width="${k === 1 ? 130 : 100}" height="14" rx="7" fill="${k === 1 ? '#FF5B2E' : '#D5D8DF'}"/>`).join('')}
  ${[0, 1, 2].map((k) => `<rect x="${338 + k * 205}" y="182" width="190" height="110" rx="14" fill="#F6F7F9"/><rect x="${356 + k * 205}" y="204" width="80" height="12" rx="6" fill="#C9CDD6"/><rect x="${356 + k * 205}" y="232" width="120" height="28" rx="8" fill="#0B0D12" opacity=".85"/>`).join('')}
  <rect x="338" y="312" width="600" height="294" rx="14" fill="#F6F7F9"/>
  ${Array.from({ length: 12 }, (_, k) => {
    const h = 60 + ((k * 53) % 170);
    return `<rect x="${366 + k * 47}" y="${580 - h}" width="28" height="${h}" rx="6" fill="${k % 3 === 0 ? '#FF5B2E' : '#0B0D12'}" opacity="${k % 3 === 0 ? 1 : 0.18}"/>`;
  }).join('')}`,
  // mobile app
  () => `
  ${[0, 1, 2].map((k) => {
    const x = 270 + k * 230;
    const y = k === 1 ? 80 : 140;
    return `<g>
    <rect x="${x}" y="${y}" width="200" height="420" rx="34" fill="#0B0D12"/>
    <rect x="${x + 10}" y="${y + 10}" width="180" height="400" rx="26" fill="#fff"/>
    <rect x="${x + 70}" y="${y + 20}" width="60" height="12" rx="6" fill="#0B0D12"/>
    <rect x="${x + 26}" y="${y + 56}" width="148" height="110" rx="16" fill="#FF5B2E" opacity="${0.85 - k * 0.2}"/>
    <rect x="${x + 26}" y="${y + 184}" width="100" height="12" rx="6" fill="#0B0D12" opacity=".8"/>
    <rect x="${x + 26}" y="${y + 206}" width="140" height="10" rx="5" fill="#C9CDD6"/>
    ${[0, 1, 2].map((r) => `<rect x="${x + 26}" y="${y + 236 + r * 52}" width="148" height="40" rx="12" fill="#F1F2F5"/><circle cx="${x + 46}" cy="${y + 256 + r * 52}" r="10" fill="#0B0D12" opacity=".25"/>`).join('')}
  </g>`;
  }).join('')}`,
  // ecommerce
  (w) => `
  <rect x="120" y="110" width="${w - 240}" height="520" rx="22" fill="#fff" opacity=".96"/>
  <rect x="150" y="140" width="120" height="18" rx="9" fill="#0B0D12"/>
  ${[0, 1, 2, 3].map((k) => `<rect x="${560 + k * 90}" y="144" width="64" height="10" rx="5" fill="#C9CDD6"/>`).join('')}
  <rect x="150" y="186" width="${w - 300}" height="170" rx="18" fill="#0B0D12" opacity=".92"/>
  <rect x="186" y="226" width="280" height="26" rx="10" fill="#fff"/>
  <rect x="186" y="266" width="200" height="14" rx="7" fill="#fff" opacity=".5"/>
  <rect x="186" y="304" width="120" height="32" rx="16" fill="#FF5B2E"/>
  ${[0, 1, 2, 3].map((k) => `<rect x="${150 + k * 230}" y="380" width="210" height="160" rx="16" fill="#F1F2F5"/><rect x="${150 + k * 230}" y="556" width="130" height="12" rx="6" fill="#0B0D12" opacity=".75"/><rect x="${150 + k * 230}" y="578" width="70" height="12" rx="6" fill="#FF5B2E"/>`).join('')}`,
];

const project = (name, i) => {
  const w = 1200;
  const g = gradients[(i * 2 + 1) % gradients.length];
  return `<!-- PLACEHOLDER: ${name} — replace with a real project image (recommended 1200×750) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 750" width="${w}" height="750">
  ${defs('g', g, 135 + i * 20)}
  <rect width="${w}" height="750" fill="url(#g)"/>
  <circle cx="${w - 120}" cy="90" r="260" fill="#fff" opacity=".08"/>
  <circle cx="80" cy="700" r="220" fill="#000" opacity=".08"/>
  ${projectLayouts[i % projectLayouts.length](w)}
</svg>`;
};

/* ---------- Culture / office ---------- */
const culture = (name, i) => {
  const g = gradients[(i * 3 + 2) % gradients.length];
  return `<!-- PLACEHOLDER: ${name} — replace with an office / culture photo -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  ${defs('g', g, 120 + i * 30)}
  <rect width="800" height="600" fill="url(#g)"/>
  <rect x="0" y="420" width="800" height="180" fill="#0B0D12" opacity=".25"/>
  <rect x="${120 + i * 20}" y="250" width="240" height="150" rx="12" fill="#0B0D12" opacity=".8"/>
  <rect x="${136 + i * 20}" y="266" width="208" height="118" rx="6" fill="#fff" opacity=".85"/>
  <rect x="${220 + i * 20}" y="400" width="40" height="30" fill="#0B0D12" opacity=".7"/>
  <rect x="420" y="230" width="210" height="170" rx="12" fill="#0B0D12" opacity=".8"/>
  <rect x="436" y="246" width="178" height="138" rx="6" fill="#fff" opacity=".85"/>
  <circle cx="${250 + i * 20}" cy="470" r="46" fill="#0B0D12" opacity=".55"/>
  <circle cx="525" cy="470" r="46" fill="#0B0D12" opacity=".55"/>
  <circle cx="660" cy="120" r="70" fill="#fff" opacity=".15"/>
  <rect x="0" y="430" width="800" height="16" fill="#fff" opacity=".2"/>
</svg>`;
};

/* ---------- Industry art ---------- */
const industryColors = [
  ['#0E7490', '#2DD4BF'], // healthcare
  ['#312E81', '#A855F7'], // fintech
  ['#B45309', '#FBBF24'], // education
  ['#0369A1', '#38BDF8'], // real estate
  ['#EA580C', '#EC4899'], // e-commerce
  ['#065F46', '#34D399'], // logistics
  ['#1D4ED8', '#22D3EE'], // travel
  ['#9D174D', '#F472B6'], // media
  ['#1E293B', '#64748B'], // finance
  ['#B91C1C', '#FB923C'], // retail
];
const industry = (name, i) => {
  const g = industryColors[i % industryColors.length];
  const rings = [0, 1, 2, 3, 4]
    .map((k) => `<circle cx="600" cy="380" r="${80 + k * 70}" fill="none" stroke="#fff" stroke-opacity="${0.22 - k * 0.035}" stroke-width="2"/>`)
    .join('');
  return `<!-- PLACEHOLDER: ${name} — replace with an industry image (recommended 900×600) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  ${defs('g', g, 150)}
  <rect width="900" height="600" fill="url(#g)"/>
  ${rings}
  <rect x="80" y="90" width="320" height="200" rx="22" fill="#fff" opacity=".92"/>
  <rect x="110" y="120" width="140" height="16" rx="8" fill="#0B0D12" opacity=".8"/>
  <rect x="110" y="150" width="220" height="12" rx="6" fill="#0B0D12" opacity=".2"/>
  <rect x="110" y="200" width="${120 + (i % 4) * 40}" height="60" rx="12" fill="${g[0]}"/>
  <rect x="140" y="330" width="260" height="160" rx="22" fill="#0B0D12" opacity=".85"/>
  <path d="M170 450 L220 410 L270 430 L330 370 L370 390" stroke="${g[1]}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
};

/* ---------- Logo wordmarks (clients / partners) ---------- */
const logoShapes = [
  '<circle cx="28" cy="40" r="16"/>',
  '<rect x="12" y="24" width="32" height="32" rx="8"/>',
  '<path d="M28 22l18 32H10z"/>',
  '<path d="M12 40a16 16 0 1 1 32 0h-8a8 8 0 1 0-16 0z"/>',
  '<path d="M12 24h32v8H28v24h-8V32h-8z"/>',
  '<path d="M28 22l16 9v18l-16 9-16-9V31z"/>',
];
const logo = (label, i) => `<!-- PLACEHOLDER LOGO: ${label} — replace with a real logo -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="8 18 ${label.length * 15 + 58} 44" width="${label.length * 15 + 58}" height="44" fill="#1B1F27">
  ${logoShapes[i % logoShapes.length]}
  <text x="54" y="49" font-family="Sora, Manrope, 'Segoe UI', Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="-0.5">${label}</text>
</svg>`;

/* ---------- Brand ---------- */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#0B0D12"/>
  <path d="M15 18h9l8 18 8-18h9L36 46h-8z" fill="#fff"/>
  <circle cx="48" cy="46" r="5" fill="#FF5B2E"/>
</svg>`;

/* ---------- Write files ---------- */
write('brand/favicon.svg', favicon);
for (let i = 1; i <= 8; i++) write(`team/member-${i}.svg`, portrait(`team/member-${i}`, i));
for (let i = 1; i <= 5; i++) write(`testimonials/client-${i}.svg`, portrait(`testimonials/client-${i}`, i + 7));
// Colourful, topic-specific case-study art (see project-art.mjs)
projectArt.forEach((art, i) => write(`projects/project-${i + 1}.svg`, art()));
for (let i = 1; i <= 5; i++) write(`about/culture-${i}.svg`, culture(`about/culture-${i}`, i - 1));

const industries = ['healthcare', 'fintech', 'education', 'real-estate', 'ecommerce', 'logistics', 'travel', 'media', 'finance', 'retail'];
industries.forEach((slug, i) => write(`industries/${slug}.svg`, industry(`industries/${slug}`, i)));

const logos = ['Lumora', 'Quantix', 'Arcwave', 'Nexora', 'Brightline', 'Kitecore', 'Orbitly', 'Fernhill', 'Solace', 'Vantage', 'Helixa', 'Northpeak'];
logos.forEach((label, i) => write(`logos/logo-${i + 1}.svg`, logo(label, i)));

/* ---------- Platform monogram badges (replace with official logos if desired) ---------- */
const badge = (label, bg) => `<!-- PLACEHOLDER BADGE: ${label} — replace with the official logo if you have permission -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="${bg}"/>
  <text x="32" y="41" text-anchor="middle" font-family="Sora, Manrope, 'Segoe UI', Arial, sans-serif" font-size="24" font-weight="700" fill="#fff">${label}</text>
</svg>`;
[
  ['shopify', 'Sh', '#5E8E3E'],
  ['wix', 'Wx', '#111111'],
  ['squarespace', 'Ss', '#1A1A1A'],
  ['square', 'Sq', '#2B2B2B'],
].forEach(([slug, label, bg]) => write(`platforms/${slug}.svg`, badge(label, bg)));

console.log('✔ Placeholder images generated in public/images');
