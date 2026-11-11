import { brand } from '../../data/images';

/**
 * Velotech logo placeholder. To use your own logo, set `brand.logo`
 * (and `brand.logoLight` for dark backgrounds) in src/data/images.js.
 */
export default function Logo({ light = false }) {
  const src = light ? brand.logoLight || brand.logo : brand.logo;
  if (src) {
    return <img src={src} alt="Velotech" height="36" style={{ height: 36, width: 'auto' }} />;
  }
  const tile = light ? '#ffffff' : '#0b0d12';
  const mark = light ? '#0b0d12' : '#ffffff';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={tile} />
        <path d="M15 18h9l8 18 8-18h9L36 46h-8z" fill={mark} />
        <circle cx="48" cy="46" r="5" fill="#ff5b2e" />
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: '0.06em',
          color: light ? '#fff' : '#0b0d12',
        }}
      >
        VELOTECH
      </span>
    </span>
  );
}
