import { useState } from 'react';

/**
 * Lazy <img> that falls back to a lettered badge if the source is missing
 * or fails to load (used for CDN technology icons).
 */
export default function SmartImage({ src, alt, fallback, className = '', ...rest }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <span className={`smart-fallback ${className}`} role="img" aria-label={alt}>
        {fallback ?? alt?.slice(0, 2)}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
