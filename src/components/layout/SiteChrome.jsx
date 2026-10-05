'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CustomCursor from '@/components/layout/CustomCursor';
import OverlayRoot from '@/components/overlays/OverlayRoot';

/** Auth screens are full-bleed, so they skip the header and footer. */
const BARE_ROUTES = ['/login', '/signup'];

/** Persistent shell rendered around every route. */
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.includes(pathname);

  return (
    <>
      {/* <Preloader /> */}
      <CustomCursor />
      <ScrollProgress />
      {!bare && <Header />}
      <OverlayRoot />
      <main className="min-h-screen">{children}</main>
      {!bare && <Footer />}
    </>
  );
}
