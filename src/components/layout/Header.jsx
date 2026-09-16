'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import AnnounceBar from '@/components/layout/AnnounceBar';
import { NAV_LINKS } from '@/data/navigation';
import { SITE } from '@/data/site';
import { useScrollEffects } from '@/hooks/useScrollEffects';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';

/** Fixed site header: condenses on scroll, drives the overlay actions. */
export default function Header() {
  const pathname = usePathname();
  const { scrolled } = useScrollEffects();
  const { cartCount, wishlist } = useStore();
  const { openCart, openWishlist, openSearch, openMobileMenu } = useUI();

  const isActive = (href) =>
    pathname === href || (href === '/men' && pathname.startsWith('/product'));

  return (
    <header className={`site-header fixed top-0 left-0 w-full z-[60] ${scrolled ? 'scrolled' : ''}`}>
      <AnnounceBar />

      <div className="header-inner flex items-center justify-between px-5 md:px-10 lg:px-12 py-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openMobileMenu}
            className="lg:hidden icon-btn border border-line bg-white"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald text-white flex items-center justify-center font-italiana text-2xl group-hover:bg-emerald-deep transition-colors">
              V
            </div>
            <div className="leading-none">
              <div className="font-italiana text-2xl md:text-[26px] tracking-[0.18em]">
                {SITE.name}
              </div>
              <div className="text-[9px] tracking-[0.4em] text-muted font-bold mt-1">
                MAISON · {SITE.established}
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-item link-line ${isActive(link.href) ? 'active' : ''}`}
            >
              <sup>{link.index}</sup> {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={openSearch} className="icon-btn" aria-label="Search">
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>

          <button type="button" onClick={openWishlist} className="icon-btn" aria-label="Wishlist">
            <Heart className="w-5 h-5" aria-hidden="true" />
            {wishlist.length > 0 && <span className="badge-dot">{wishlist.length}</span>}
          </button>

          <button type="button" onClick={openCart} className="icon-btn" aria-label="Shopping bag">
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {cartCount > 0 && <span className="badge-dot">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
