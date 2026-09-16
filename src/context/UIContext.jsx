'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const UIContext = createContext(null);

const CLOSED = {
  cart: false,
  wishlist: false,
  search: false,
  mobileMenu: false,
  sizeGuide: false,
  contact: false,
  success: false,
};

/**
 * Drawer / modal visibility and the toast queue.
 * Kept separate from commerce state so opening the bag never re-renders the catalogue.
 */
export function UIProvider({ children }) {
  const [overlays, setOverlays] = useState(CLOSED);
  const [quickViewId, setQuickViewId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const setOverlay = useCallback((key, open) => {
    setOverlays((prev) => ({ ...prev, [key]: open }));
  }, []);

  const closeAll = useCallback(() => {
    setOverlays(CLOSED);
    setQuickViewId(null);
  }, []);

  const toast = useCallback((title, message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3600);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Escape closes whatever is on top.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  const value = useMemo(
    () => ({
      overlays,
      quickViewId,
      toasts,
      toast,
      dismissToast,
      closeAll,
      openCart: () => setOverlay('cart', true),
      closeCart: () => setOverlay('cart', false),
      openWishlist: () => setOverlay('wishlist', true),
      closeWishlist: () => setOverlay('wishlist', false),
      openSearch: () => setOverlay('search', true),
      closeSearch: () => setOverlay('search', false),
      openMobileMenu: () => setOverlay('mobileMenu', true),
      closeMobileMenu: () => setOverlay('mobileMenu', false),
      openSizeGuide: () => setOverlay('sizeGuide', true),
      closeSizeGuide: () => setOverlay('sizeGuide', false),
      openContact: () => setOverlay('contact', true),
      closeContact: () => setOverlay('contact', false),
      openSuccess: () => setOverlay('success', true),
      closeSuccess: () => setOverlay('success', false),
      openQuickView: (id) => setQuickViewId(id),
      closeQuickView: () => setQuickViewId(null),
    }),
    [overlays, quickViewId, toasts, toast, dismissToast, closeAll, setOverlay],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>');
  return ctx;
}
