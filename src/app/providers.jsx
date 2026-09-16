'use client';

import { UIProvider } from '@/context/UIContext';
import { StoreProvider } from '@/context/StoreContext';

/**
 * Client boundary for global state.
 * UIProvider wraps StoreProvider because the store raises toasts and opens the bag.
 */
export default function Providers({ children }) {
  return (
    <UIProvider>
      <StoreProvider>{children}</StoreProvider>
    </UIProvider>
  );
}
