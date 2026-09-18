import ProductCard from '@/components/product/ProductCard';
import SectionHead from '@/components/ui/SectionHead';

/** Horizontal slider — 4 cards per row (desktop), 2 (tablet), 1.2 (mobile) */
export default function FeaturedIcons({ products }) {
  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 py-20 md:py-28">
      <SectionHead
        eyebrow="01 — Curated Icons"
        title={
          <>
            The Icons
            <br />
            of the <em className="text-emerald">Season.</em>
          </>
        }
        sub="Five pieces chosen by our atelier. Large format, no noise — just cloth, cut and craft."
        action={{ label: 'Shop All Men', href: '/men' }}
      />

      {/* Slider */}
      <div className="relative">
        <div
          className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory
            scroll-smooth pb-4
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="
                snap-start shrink-0
                w-[75%] sm:w-[45%] md:w-[32%] lg:w-[24%]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Optional: subtle fade edges */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent hidden md:block" />
      </div>
    </section>
  );
}

