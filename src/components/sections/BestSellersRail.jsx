import ProductCard from '@/components/product/ProductCard';
import SectionHead from '@/components/ui/SectionHead';

/** Horizontally scrollable rail of proven sellers. */
export default function BestSellersRail({ products }) {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12">
        <SectionHead
          eyebrow="05 — Most Wanted"
          title={
            <>
              Best
              <br />
              Sellers<span className="text-emerald">.</span>
            </>
          }
          sub="Rated, re-ordered and restocked. Drag to explore the pieces India keeps buying."
          action={{ label: 'View All Best', href: '/bestseller' }}
        />
      </div>

      <div
        className="flex gap-5 overflow-x-auto h-scroll no-scrollbar px-5 md:px-10 lg:px-12 pb-4"
        data-stagger
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] md:min-w-[340px] max-w-[340px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
