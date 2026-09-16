'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const MESSAGE =
  'Complimentary shipping over ₹8,000 — Verdant 07 Drop Live — Milano / Jaipur / London — Hand-Finished Luxury —';

/** Dismissible ticker above the header. */
export default function AnnounceBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-emerald-deep text-white text-center relative overflow-hidden">
      <div className="marquee-track py-[9px] text-[10px] tracking-[0.3em] font-bold uppercase">
        <span className="px-8">{MESSAGE}</span>
        <span className="px-8" aria-hidden="true">
          {MESSAGE}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
