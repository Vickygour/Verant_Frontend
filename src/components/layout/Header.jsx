'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Menu, Search, ShoppingBag, User, LogOut, Package, ChevronDown } from 'lucide-react';
import AnnounceBar from '@/components/layout/AnnounceBar';
import { NAV_LINKS } from '@/data/navigation';
import { SITE } from '@/data/site';
import { useScrollEffects } from '@/hooks/useScrollEffects';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';

/** Fixed site header: condenses on scroll, drives the overlay actions. */
export default function Header() {
  const pathname = usePathname();
  const { scrolled } = useScrollEffects();
  const { cartCount, wishlist } = useStore();
  const { openCart, openWishlist, openSearch, openMobileMenu } = useUI();

  // ✅ Auth state from AuthContext
  const { user, isLoggedIn, loading: authLoading, logout } = useAuth();

  // Dropdown open/close
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Logout → context clears token, redirects to /login
  const router = useRouter();

  const handleLogout = () => {
    setUserDropdownOpen(false);
    logout();
    router.push('/login');   // ✅
  };
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setUserDropdownOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    pathname === href || (href === '/men' && pathname.startsWith('/product'));

  // Safe initials / first name
  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || 'U';
  const firstName = user?.name?.trim()?.split(' ')[0] || 'Account';

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

        <div className="flex items-center gap-2 md:gap-3">
          {/* Search */}
          <button type="button" onClick={openSearch} className="icon-btn" aria-label="Search">
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* USER ACCOUNT */}
          <div className="relative" ref={dropdownRef}>
            {authLoading ? (
              // Skeleton while /auth/me loads (avoids "Login" flash)
              <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse" aria-hidden="true" />
            ) : isLoggedIn ? (
              /* LOGGED IN */
              <div>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-neutral-100 transition-colors border border-neutral-200"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald text-white flex items-center justify-center text-xs font-semibold">
                    {initial}
                  </div>
                  <span className="text-xs font-medium max-w-[90px] md:max-w-[120px] truncate hidden sm:inline-block">
                    {firstName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 shadow-xl rounded-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-800 truncate">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">
                        {user?.email || ''}
                      </p>
                    </div>

                    <Link
                      href="/account"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                      role="menuitem"
                    >
                      <User className="w-4 h-4 text-neutral-500" />
                      My Profile
                    </Link>

                    <Link
                      href="/account/orders"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                      role="menuitem"
                    >
                      <Package className="w-4 h-4 text-neutral-500" />
                      My Orders
                    </Link>

                    <div className="my-1 border-t border-neutral-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* GUEST */
              <Link
                href="/login"
                className="flex items-center gap-1.5 icon-btn text-xs font-medium px-2 py-1"
                aria-label="Login"
              >
                <User className="w-5 h-5" aria-hidden="true" />
                <span className="hidden md:inline-block text-xs uppercase tracking-wider">
                  Login
                </span>
              </Link>
            )}
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={openWishlist}
            className="icon-btn relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" aria-hidden="true" />
            {wishlist.length > 0 && <span className="badge-dot">{wishlist.length}</span>}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            className="icon-btn relative"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {cartCount > 0 && <span className="badge-dot">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}