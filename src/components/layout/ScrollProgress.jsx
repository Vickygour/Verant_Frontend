'use client';

import { useScrollEffects } from '@/hooks/useScrollEffects';

/** Thin reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { progress } = useScrollEffects();
  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-emerald z-[120] transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
