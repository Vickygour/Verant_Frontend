import ProductCard from '@/components/product/ProductCard';
import SectionHead from '@/components/ui/SectionHead';

const LAYOUT = [
  'md:col-span-7',
  'md:col-span-5 md:mt-24',
  'md:col-span-5',
  'md:col-span-7 md:-mt-10',
  'md:col-span-8 md:col-start-3',
];

/** Editorial five-piece grid with deliberate vertical offsets. */
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

      <div className="grid md:grid-cols-12 gap-5">
        {products.map((product, i) => (
          <div key={product.id} className={LAYOUT[i]}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
