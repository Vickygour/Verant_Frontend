'use client';

import { UIProvider } from '@/context/UIContext';
import { AuthProvider } from '@/context/AuthContext';
import { CatalogProvider } from '@/context/CatalogContext';
import { StoreProvider } from '@/context/StoreContext';

/**
 * Client boundary for global state.
 * UIProvider wraps the rest because the store raises toasts and opens the bag.
 * AuthProvider sits above CatalogProvider/StoreProvider so the session is known
 * before the wishlist syncs with /api/wishlist.
 */
export default function Providers({ children }) {
  return (
    <UIProvider>
      <AuthProvider>
        <CatalogProvider>
          <StoreProvider>{children}</StoreProvider>
        </CatalogProvider>
      </AuthProvider>
    </UIProvider>
  );
}
