'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/context/AuthContext';
import { CatalogProvider } from '@/context/CatalogContext';
import { StoreProvider } from '@/context/StoreContext';
import { UIProvider } from '@/context/UIContext';

export default function Providers({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <UIProvider>
        <AuthProvider>
          <CatalogProvider>
            <StoreProvider>
              {children}
            </StoreProvider>
          </CatalogProvider>
        </AuthProvider>
      </UIProvider>
    </GoogleOAuthProvider>
  );
}