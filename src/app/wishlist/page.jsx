import WishlistClient from '@/components/product/WishlistClient';

export const metadata = {
  title: 'Wishlist',
  description: 'Every Vérant piece you have saved, ready to move into your bag.',
  robots: { index: false, follow: false },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
