import { useId } from 'react';
import { brand } from '../../data/images';

/**
 * Velotech logo: a solid circle split by a negative-space "V" — the outer
 * piece in ink/white, the wedge inside the V in brand orange — next to a
 * bold wordmark. To use an image file instead, set `brand.logo`
 * (and `brand.logoLight` for dark backgrounds) in src/data/images.js.
 */
export function LogoMark({ size = 36, light = false }) {
  // unique ids per instance (header, footer and mobile nav each render one)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const cut = `vt-cut-${uid}`;
  const clip = `vt-clip-${uid}`;
  const body = light ? '#ffffff' : '#0b0d12';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        {/* the V-shaped gap that splits the circle */}
        <mask id={cut} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          <polyline points="5,2 32,47 59,2" fill="none" stroke="#000" strokeWidth="6.5" strokeLinejoin="miter" strokeMiterlimit="10" />
        </mask>
        <clipPath id={clip}>
          <circle cx="32" cy="32" r="29" />
        </clipPath>
      </defs>
      <g mask={`url(#${cut})`}>
        <circle cx="32" cy="32" r="29" fill={body} />
        {/* wedge inside the V */}
        <polygon points="5,2 32,47 59,2" fill="#ff5b2e" clipPath={`url(#${clip})`} />
      </g>
    </svg>
  );
}

export default function Logo({ light = false }) {
  const src = light ? brand.logoLight || brand.logo : brand.logo;
  if (src) {
    return <img src={src} alt="Velotech" height="36" style={{ height: 36, width: 'auto' }} />;
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <LogoMark light={light} />
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: light ? '#fff' : '#0b0d12',
        }}
      >
        Velotech
      </span>
    </span>
  );
}
