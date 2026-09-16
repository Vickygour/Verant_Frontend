'use client';

import Image from 'next/image';
import { useState } from 'react';

/** Deterministic fallback seed so server and client render the same URL. */
function seedFrom(src = '') {
  let hash = 0;
  for (let i = 0; i < src.length; i += 1) {
    hash = (hash * 31 + src.charCodeAt(i)) % 9999;
  }
  return Math.abs(hash);
}

/**
 * next/image wrapper with a graceful fallback when a remote asset 404s.
 * Always renders with `fill`, so the parent element must be positioned
 * and have an intrinsic size (aspect ratio or fixed height).
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  priority = false,
  quality = 80,
  unoptimized = false,
}) {
  const [failed, setFailed] = useState(false);
  const resolved = failed ? `https://picsum.photos/seed/verant${seedFrom(src)}/800/1000` : src;

  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={unoptimized}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
