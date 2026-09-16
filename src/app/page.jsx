import PageAnimations from '@/components/ui/PageAnimations';
import Marquee from '@/components/ui/Marquee';
import Hero from '@/components/sections/Hero';
import FeaturedIcons from '@/components/sections/FeaturedIcons';
import NewTeaser from '@/components/sections/NewTeaser';
import CategoryGrid from '@/components/sections/CategoryGrid';
import CraftSection from '@/components/sections/CraftSection';
import BestSellersRail from '@/components/sections/BestSellersRail';
import LookbookPreview from '@/components/sections/LookbookPreview';
import Testimonials from '@/components/sections/Testimonials';
import NewsletterPanel from '@/components/sections/NewsletterPanel';
import { PRODUCTS } from '@/data/products';

export const metadata = {
  title: 'VÉRANT — Maison de Couture | Luxury Fashion',
  description:
    'Sharp tailoring, heavy cottons and hand-finished sneakers. Shop the Verdant 07 collection from Maison Vérant.',
};

export default function HomePage() {
  const featured = [0, 8, 11, 13, 17].map((i) => PRODUCTS[i]);
  const justLanded = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBest).slice(0, 8);

  return (
    <>
      <PageAnimations />

      <Hero />

      <Marquee
        text="VÉRANT — MILANO — JAIPUR — LONDON — VERDANT 07 — HAND FINISHED —"
        className="bg-emerald text-white py-4 border-y border-emerald-deep"
        trackClassName="font-italiana text-2xl tracking-[0.2em]"
      />

      <FeaturedIcons products={featured} />
      <NewTeaser products={justLanded} />
      <CategoryGrid />
      <CraftSection />
      <BestSellersRail products={bestSellers} />
      <LookbookPreview />
      <Testimonials />
      <NewsletterPanel />
    </>
  );
}
