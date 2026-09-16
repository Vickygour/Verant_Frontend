'use client';

import { useHeroIntro, useRevealAnimations } from '@/hooks/useRevealAnimations';

/**
 * Mount once per page to enable scroll reveals and the `.hero-el` intro.
 * Both hooks no-op when no matching nodes exist or reduced motion is requested.
 */
export default function PageAnimations({ deps = [] }) {
  useRevealAnimations(deps);
  useHeroIntro();
  return null;
}
