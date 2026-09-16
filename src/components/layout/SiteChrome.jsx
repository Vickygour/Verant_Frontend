'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CustomCursor from '@/components/layout/CustomCursor';
import OverlayRoot from '@/components/overlays/OverlayRoot';

/** Persistent shell rendered around every route. */
export default function SiteChrome({ children }) {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <OverlayRoot />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
