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
import { fetchProducts } from '@/lib/api/server';

export const metadata = {
  title: 'VÉRANT — Maison de Couture | Luxury Fashion',
  description: 'Sharp tailoring, heavy cottons and hand-finished sneakers. Shop the Verdant 07 collection from Maison Vérant.',
};

export const revalidate = 60;

export default async function HomePage() {
  const PRODUCTS = await fetchProducts();

  // Data array ensure karein
  const productList = Array.isArray(PRODUCTS) ? PRODUCTS : (PRODUCTS.data || PRODUCTS.products || []);

  // 1. Featured Sneakers (Jo pehle fix kiya tha)
  const featuredSneakers = productList.filter((p) => {
    const searchString = JSON.stringify(p).toLowerCase();
    return searchString.includes('sneaker') || searchString.includes('shoe');
  }).slice(0, 4);

  const fallbackSneakers = [0, 8, 3, 4].map(i => productList[i]).filter(Boolean).slice(0, 4);
  const finalSneakersToShow = featuredSneakers.length > 0 ? featuredSneakers : fallbackSneakers;

  // 2. New Teaser (Just Landed)
  const justLanded = productList.filter((p) => p.isNew).slice(0, 4);

  // 3. 🚨 BEST SELLERS FIX (Smart Fallback Logic) 🚨
  const actualBestSellers = productList.filter((p) => p.isBest);
  let finalBestSellers = [];

  if (actualBestSellers.length >= 4) {
    // Agar 4 ya usse zyada bestsellers hain, toh pehle 4 le lo
    finalBestSellers = actualBestSellers.slice(0, 4);
  } else {
    // Agar 2 hi hain, toh baaki normal products (jo bestseller nahi hain) unhe add kar ke 4 pura karo
    const otherProducts = productList.filter((p) => !p.isBest);
    finalBestSellers = [...actualBestSellers, ...otherProducts].slice(0, 4);
  }

  return (
    <>
      <PageAnimations />
      <Hero />
      <Marquee
        text="VÉRANT — MILANO — JAIPUR — LONDON — VERDANT 07 — HAND FINISHED —"
        className="bg-emerald text-white py-4 border-y border-emerald-deep"
        trackClassName="font-italiana text-2xl tracking-[0.2em]"
      />

      <FeaturedIcons products={finalSneakersToShow} />
      <NewTeaser products={justLanded} />
      <CategoryGrid />
      <CraftSection />

      {/* Yahan hum guaranteed 4 products pass kar rahe hain */}
      <BestSellersRail products={finalBestSellers} />

      <LookbookPreview />
      <Testimonials />
      <NewsletterPanel />
    </>
  );
}