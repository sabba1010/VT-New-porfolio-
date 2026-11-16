/**
 * Draws the team avatars (public/images/team/member-1..8.svg) as one
 * consistent illustrated set. Replace any file with a real photo later
 * (keep the 3:4 ratio) — or point src/data/images.js at the photo.
 * Run: node scripts/generate-team-art.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const out = join(process.cwd(), 'public', 'images', 'team');
mkdirSync(out, { recursive: true });

// order matches leaders in src/data/content.js: CEO, CTO, Head of Design, Head of Delivery, then the wider team
const people = [
  { skin: '#C68642', hair: '#1F1611', style: 'side', cloth: '#14161C', top: 'blazer', accent: '#E8590C', bg: ['#FFF3EA', '#FFDCC8'] },
  { skin: '#A86B3C', hair: '#16110E', style: 'buzz', beard: true, glasses: true, cloth: '#1E3A5F', top: 'crew', accent: '#F08A4B', bg: ['#FFF6EE', '#FFE2CF'] },
  { skin: '#E8B48A', hair: '#2B1B14', style: 'bun', cloth: '#E8590C', top: 'v', accent: '#FFB38A', bg: ['#FFF5EC', '#FFE6D6'] },
  { skin: '#D79B6A', hair: '#3A2A22', style: 'hijab', scarf: '#7A2405', cloth: '#7A2405', top: 'none', accent: '#F6A06A', bg: ['#FFF4EA', '#FFDDC9'] },
  { skin: '#8D5524', hair: '#120D0B', style: 'curly', cloth: '#2F4A3A', top: 'crew', accent: '#E8590C', bg: ['#FFF3EA', '#FFDCC8'] },
  { skin: '#E0AC69', hair: '#3B2418', style: 'long', glasses: true, cloth: '#14161C', top: 'v', accent: '#F08A4B', bg: ['#FFF6EE', '#FFE2CF'] },
  { skin: '#B9784C', hair: '#24170F', style: 'wavy', beard: true, cloth: '#5A3E8C', top: 'hoodie', accent: '#FFB38A', bg: ['#FFF5EC', '#FFE6D6'] },
  { skin: '#F2C6A0', hair: '#5A3A22', style: 'bob', cloth: '#1E3A5F', top: 'blazer', accent: '#F6A06A', bg: ['#FFF4EA', '#FFDDC9'] },
];

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, Math.round(v + amt))).toString(16).padStart(2, '0');
  return `#${c(n >> 16)}${c((n >> 8) & 255)}${c(n & 255)}`;
};

const curlyBack = (hair) => {
  let s = '';
  // a cloud of curls around the top half of the head
  for (let a = -20; a <= 200; a += 20) {
    const r = (a * Math.PI) / 180;
    s += `<circle cx="${(300 + 104 * Math.cos(r)).toFixed(1)}" cy="${(292 - 116 * Math.sin(r)).toFixed(1)}" r="40" fill="${hair}"/>`;
  }
  return s;
};

const hairBack = (p) => ({
  long: `<path d="M196 290C186 188 238 156 300 156C364 156 414 190 404 290L420 540C380 566 220 566 180 540Z" fill="${p.hair}"/>`,
  bob: `<path d="M194 300C184 194 238 164 300 164C362 164 416 194 406 300L412 410C384 424 362 418 354 404L246 404C238 418 216 424 188 410Z" fill="${p.hair}"/>`,
  bun: `<circle cx="300" cy="166" r="50" fill="${p.hair}"/>`,
  curly: curlyBack(p.hair),
}[p.style] ?? '');

const hairFront = (p) => ({
  side: `<path d="M206 300C194 206 242 164 306 164C370 164 408 206 396 296C390 262 374 236 352 224C320 242 262 240 226 224C214 244 208 270 206 300Z" fill="${p.hair}"/>`,
  buzz: `<path d="M212 270C214 202 254 182 300 182C346 182 386 202 388 270C372 230 342 214 300 214C258 214 228 230 212 270Z" fill="${p.hair}"/>`,
  bun: `<path d="M210 282C206 206 250 178 300 178C352 178 394 206 390 282C372 236 340 212 300 212C260 212 228 236 210 282Z" fill="${p.hair}"/>`,
  long: `<path d="M208 304C198 202 250 172 304 172C360 172 402 210 392 304C380 252 352 224 304 218C272 242 238 264 208 304Z" fill="${p.hair}"/>`,
  bob: `<path d="M210 272C210 200 250 176 300 176C350 176 390 200 390 272C384 248 330 232 300 232C270 232 216 248 210 272Z" fill="${p.hair}"/>`,
  wavy: `<path d="M204 300C190 200 244 160 306 162C372 164 410 210 396 300C392 270 380 246 362 236C350 254 320 252 300 238C282 254 250 256 232 244C218 258 208 278 204 300Z" fill="${p.hair}"/>`,
  curly: [230, 262, 300, 338, 370].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 196 : 206}" r="30" fill="${p.hair}"/>`).join(''),
}[p.style] ?? '');

const top = (p) => {
  const dark = shade(p.cloth, -28);
  return {
    crew: `<path d="M256 470C268 500 332 500 344 470" fill="none" stroke="${dark}" stroke-width="8" stroke-linecap="round"/>`,
    v: `<path d="M262 466L300 528L338 466Z" fill="${p.skin}"/><path d="M262 466L300 528L338 466" fill="none" stroke="${dark}" stroke-width="6" stroke-linejoin="round"/>`,
    blazer: `<path d="M252 468L300 560L348 468Z" fill="#F7F3EF"/><path d="M278 470L300 500L322 470" fill="none" stroke="#D9D1C9" stroke-width="5"/><path d="M252 468L300 560L270 612L222 500Z" fill="${dark}"/><path d="M348 468L300 560L330 612L378 500Z" fill="${dark}"/>`,
    hoodie: `<path d="M228 470C240 520 360 520 372 470C352 488 248 488 228 470Z" fill="${dark}"/><path d="M282 500L276 570M318 500L324 570" stroke="#F7F3EF" stroke-width="6" stroke-linecap="round"/>`,
    none: '',
  }[p.top];
};

const face = (p) => {
  const line = shade(p.skin, -70);
  return `
  <path d="M248 280C258 272 274 272 284 278M316 278C326 272 342 272 352 280" fill="none" stroke="${p.style === 'hijab' ? '#2B1B14' : p.hair}" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="266" cy="306" rx="7" ry="8.5" fill="#1B1A1F"/><ellipse cx="334" cy="306" rx="7" ry="8.5" fill="#1B1A1F"/>
  <circle cx="268.5" cy="303" r="2.2" fill="#fff"/><circle cx="336.5" cy="303" r="2.2" fill="#fff"/>
  <path d="M300 316C297 334 292 344 304 347" fill="none" stroke="${line}" stroke-width="4.5" stroke-linecap="round" opacity=".55"/>
  <ellipse cx="246" cy="342" rx="16" ry="9" fill="#E8590C" opacity=".12"/><ellipse cx="354" cy="342" rx="16" ry="9" fill="#E8590C" opacity=".12"/>
  ${p.beard ? `<path d="M210 318C212 392 250 424 300 424C350 424 388 392 390 318C382 350 362 372 342 378C322 362 278 362 258 378C238 372 218 350 210 318Z" fill="${p.hair}"/>` : ''}
  <path d="M278 366C290 380 310 380 322 366" fill="${p.beard ? 'none' : '#fff'}" stroke="${p.beard ? '#F2E6DC' : '#8A3A2A'}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  ${p.glasses ? `<g fill="none" stroke="#1B1A1F" stroke-width="5"><rect x="236" y="286" width="58" height="42" rx="16"/><rect x="306" y="286" width="58" height="42" rx="16"/><path d="M294 302C298 298 302 298 306 302M236 300L214 294M364 300L386 294"/></g>` : ''}`;
};

const svg = (p, i) => {
  const neck = shade(p.skin, -22);
  const hijab = p.style === 'hijab';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.bg[0]}"/><stop offset="1" stop-color="${p.bg[1]}"/></linearGradient>
    <pattern id="dots${i}" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="${p.accent}" opacity=".22"/></pattern>
  </defs>
  <rect width="600" height="800" fill="url(#bg${i})"/>
  <rect width="600" height="800" fill="url(#dots${i})"/>
  <circle cx="300" cy="350" r="226" fill="${p.accent}" opacity=".9"/>
  <circle cx="300" cy="350" r="226" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="2 12"/>
  <path d="M70 800C78 610 172 470 300 470C428 470 522 610 530 800Z" fill="${p.cloth}"/>
  ${top(p)}
  ${hijab ? `<path d="M300 170C198 170 180 254 184 334C186 404 218 452 246 480C190 520 160 560 150 620C230 660 370 660 450 620C440 560 410 520 354 480C382 452 414 404 416 334C420 254 402 170 300 170Z" fill="${p.scarf}"/>` : hairBack(p)}
  ${hijab ? '' : `<rect x="262" y="360" width="76" height="118" rx="30" fill="${neck}"/>
  <ellipse cx="210" cy="314" rx="16" ry="24" fill="${p.skin}"/><ellipse cx="390" cy="314" rx="16" ry="24" fill="${p.skin}"/>`}
  <ellipse cx="300" cy="302" rx="90" ry="106" fill="${p.skin}"/>
  ${hijab ? `<path fill-rule="evenodd" d="M300 168C226 168 186 220 186 300C186 384 232 432 300 432C368 432 414 384 414 300C414 220 374 168 300 168ZM300 204C250 204 218 240 218 300C218 362 252 404 300 404C348 404 382 362 382 300C382 240 350 204 300 204Z" fill="${p.scarf}"/>` : hairFront(p)}
  ${face(p)}
</svg>
`;
};

people.forEach((p, i) => writeFileSync(join(out, `member-${i + 1}.svg`), svg(p, i)));
console.log(`✔ ${people.length} team avatars written to public/images/team`);
