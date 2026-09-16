'use client';

import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { NAV_LINKS } from '@/data/navigation';
import { SITE } from '@/data/site';
import { useUI } from '@/context/UIContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

export default function MobileMenu() {
  const { overlays, closeMobileMenu } = useUI();
  const open = overlays.mobileMenu;
  useLockBodyScroll(open);

  return (
    <div
      className={`mobile-menu fixed inset-0 z-[90] bg-emerald-deep text-white flex flex-col ${open ? 'open' : ''}`}
      aria-hidden={!open}
    >
      <div className="flex justify-between items-center px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-emerald-deep flex items-center justify-center font-italiana text-xl">
            V
          </div>
          <div className="font-italiana text-xl tracking-[0.18em]">{SITE.name}</div>
        </div>
        <button
          type="button"
          onClick={closeMobileMenu}
          className="w-11 h-11 border border-white/20 flex items-center justify-center hover:bg-white hover:text-emerald-deep transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-center px-8 gap-2" aria-label="Mobile">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMobileMenu}
            className="text-left group py-4 border-b border-white/10 flex items-baseline gap-4"
          >
            <span className="text-sage text-xs font-bold">{link.index}</span>
            <span className="font-display text-4xl md:text-5xl group-hover:italic group-hover:text-sage transition-all">
              {link.label}
            </span>
            <ArrowUpRight
              className="w-6 h-6 ml-auto opacity-0 group-hover:opacity-100 transition"
              aria-hidden="true"
            />
          </Link>
        ))}
      </nav>

      <div className="px-8 pb-8 text-white/50 text-[11px] tracking-[0.3em] uppercase">
        Milano — Jaipur — London · MMXXVI
      </div>
    </div>
  );
}
