import PageAnimations from '@/components/ui/PageAnimations';
import BestSellerHero from '@/components/sections/BestSellerHero';
import BestSellerList from '@/components/sections/BestSellerList';
import { PRODUCTS } from '@/data/products';

export const metadata = {
  title: 'Best Sellers — Most Wanted',
  description:
    'Rated by 4,000+ verified clients and restocked monthly. The Vérant pieces India keeps buying.',
};

export default function BestSellerPage() {
  const list = PRODUCTS.filter((p) => p.isBest);

  return (
    <>
      <PageAnimations />
      <BestSellerHero products={list.slice(0, 3)} total={list.length} />
      <BestSellerList products={list.slice(3)} />
    </>
  );
}
