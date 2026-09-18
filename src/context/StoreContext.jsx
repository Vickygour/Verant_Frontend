'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { MAX_QTY_PER_LINE, STORAGE_KEYS, shippingCost } from '@/lib/constants';
import { useUI } from '@/context/UIContext';
import { useCatalog } from '@/context/CatalogContext';
import { useAuth } from '@/context/AuthContext';
import wishlistService from '@/lib/api/wishlist.service';

const StoreContext = createContext(null);

/**
 * Commerce state: bag, wishlist and recently-viewed history.
 * The bag stays local (there is no cart endpoint on the API), while the
 * wishlist mirrors GET/POST /api/wishlist whenever someone is signed in.
 */
export function StoreProvider({ children }) {
  const { toast, openCart, closeWishlist } = useUI();
  const { getProduct } = useCatalog();
  const { isAuthenticated, user } = useAuth();

  const [cart, setCart] = useLocalStorageState(STORAGE_KEYS.cart, []);
  const [wishlist, setWishlist] = useLocalStorageState(STORAGE_KEYS.wishlist, []);
  const [recent, setRecent] = useLocalStorageState(STORAGE_KEYS.recent, []);

  const syncedFor = useRef(null);

  /**
   * On sign-in: pull the saved wishlist from the server, push anything that was
   * hearted while signed out, and keep the union. On sign-out: leave whatever
   * is in localStorage alone so the guest experience is unchanged.
   */
  useEffect(() => {
    if (!isAuthenticated || !user?._id) {
      syncedFor.current = null;
      return undefined;
    }
    if (syncedFor.current === user._id) return undefined;
    syncedFor.current = user._id;

    let cancelled = false;

    (async () => {
      try {
        const serverProducts = await wishlistService.get();
        if (cancelled) return;

        const serverIds = serverProducts.map((p) => Number(p.id));

        setWishlist((localIds) => {
          const localOnly = localIds
            .map(Number)
            .filter((id) => !serverIds.includes(id));

          localOnly.forEach((id) => {
            wishlistService.toggle(id).catch(() => {});
          });

          return Array.from(new Set([...serverIds, ...localOnly]));
        });
      } catch {
        /* offline or expired token — the local wishlist keeps working */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?._id, setWishlist]);

  const addToBag = useCallback(
    (id, size, color, qty = 1) => {
      const product = getProduct(id);
      if (!product || product.stock === 0) {
        toast('Sold Out', 'This piece is currently unavailable.');
        return;
      }

      const chosenSize = size || product.sizes[Math.min(2, product.sizes.length - 1)];
      const chosenColor = color || product.colors[0].n;

      setCart((prev) => {
        const idx = prev.findIndex(
          (i) => String(i.id) === String(id) && i.size === chosenSize && i.color === chosenColor,
        );
        if (idx > -1) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: Math.min(MAX_QTY_PER_LINE, next[idx].qty + qty) };
          return next;
        }
        return [...prev, { id: Number(id), size: chosenSize, color: chosenColor, qty }];
      });

      openCart();
      toast('Added to Bag', `${product.name} · ${chosenSize}`);
    },
    [getProduct, openCart, setCart, toast],
  );

  const updateQty = useCallback(
    (index, delta) => {
      setCart((prev) =>
        prev
          .map((item, i) =>
            i === index
              ? { ...item, qty: Math.min(MAX_QTY_PER_LINE, item.qty + delta) }
              : item,
          )
          .filter((item) => item.qty > 0),
      );
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (index) => {
      setCart((prev) => {
        const product = getProduct(prev[index]?.id);
        if (product) toast('Removed', product.name);
        return prev.filter((_, i) => i !== index);
      });
    },
    [getProduct, setCart, toast],
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback(
    (id) => {
      const numeric = Number(id);

      setWishlist((prev) => {
        if (prev.includes(numeric)) {
          toast('Wishlist', 'Removed from wishlist.');
          return prev.filter((w) => w !== numeric);
        }
        toast('Wishlist', 'Saved to your wishlist.');
        return [...prev, numeric];
      });

      // Mirror the change on the server for signed-in clients.
      if (isAuthenticated) {
        wishlistService.toggle(numeric).catch(() => {});
      }
    },
    [isAuthenticated, setWishlist, toast],
  );

  const moveToCart = useCallback(
    (id) => {
      addToBag(id);
      setWishlist((prev) => prev.filter((w) => w !== Number(id)));
      if (isAuthenticated) wishlistService.toggle(Number(id)).catch(() => {});
      closeWishlist();
    },
    [addToBag, closeWishlist, isAuthenticated, setWishlist],
  );

  const pushRecent = useCallback(
    (id) => {
      const numeric = Number(id);
      setRecent((prev) => [numeric, ...prev.filter((r) => r !== numeric)].slice(0, 8));
    },
    [setRecent],
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProduct(item.id);
        return product ? sum + product.price * item.qty : sum;
      }, 0),
    [cart, getProduct],
  );

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      subtotal,
      wishlist,
      recent,
      addToBag,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      moveToCart,
      pushRecent,
      shippingFor: shippingCost,
      isWished: (id) => wishlist.includes(Number(id)),
    }),
    [
      cart,
      cartCount,
      subtotal,
      wishlist,
      recent,
      addToBag,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      moveToCart,
      pushRecent,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
