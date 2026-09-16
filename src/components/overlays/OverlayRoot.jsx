'use client';

import CartDrawer from '@/components/overlays/CartDrawer';
import WishlistDrawer from '@/components/overlays/WishlistDrawer';
import SearchOverlay from '@/components/overlays/SearchOverlay';
import QuickViewModal from '@/components/overlays/QuickViewModal';
import SizeGuideModal from '@/components/overlays/SizeGuideModal';
import ContactModal from '@/components/overlays/ContactModal';
import MobileMenu from '@/components/overlays/MobileMenu';
import ToastHost from '@/components/overlays/ToastHost';

/** Every globally-available drawer, modal and notification host, mounted once. */
export default function OverlayRoot() {
  return (
    <>
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <ContactModal />
      <ToastHost />
    </>
  );
}
