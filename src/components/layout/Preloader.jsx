'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/data/site';

/** First-paint curtain. Runs once per session, then unmounts itself. */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((prev) => {
        const next = Math.min(100, prev + Math.random() * 18);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 140);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pct < 100) return undefined;
    const t1 = setTimeout(() => setDone(true), 350);
    const t2 = setTimeout(() => setGone(true), 1450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pct]);

  if (gone) return null;

  return (
    <div className={`preloader ${done ? 'done' : ''}`} aria-hidden="true">
      <div className="font-italiana text-5xl md:text-7xl tracking-[0.2em]">{SITE.name}</div>
      <div className="eyebrow mt-4 text-sage">
        {SITE.tagline} — Est. {SITE.established}
      </div>
      <div className="bar">
        <span style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 text-xs tracking-[0.3em] text-white/60">
        {String(Math.floor(pct)).padStart(2, '0')}%
      </div>
    </div>
  );
}
