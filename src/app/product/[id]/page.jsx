import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageAnimations from '@/components/ui/PageAnimations';
import SectionHead from '@/components/ui/SectionHead';
import ProductCard from '@/components/product/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RecentlyViewed from '@/components/product/RecentlyViewed';
import { PRODUCTS, getProduct } from '@/data/products';
import { SITE } from '@/data/site';

/** Pre-render every product page at build time. */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.id);
  if (!product) return { title: 'Product not found' };

  return {
    title: product.name,
    description: `${product.tagline} ${product.desc}`.slice(0, 160),
    openGraph: {
      title: `${product.name} — VÉRANT`,
      description: product.tagline,
      images: [{ url: product.images[0] }],
      type: 'website',
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  // Structured data so the listing is eligible for rich results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.desc,
    brand: { '@type': 'Brand', name: 'VÉRANT' },
    material: product.material,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability:
        product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE.url}/product/${product.id}`,
    },
  };

  return (
    <>
      <PageAnimations />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-[140px] pb-16 px-5 md:px-10 lg:px-12 max-w-[1400px] mx-auto">
        <nav
          className="text-[11px] tracking-[0.2em] uppercase font-bold text-muted mb-6"
          aria-label="Breadcrumb"
          data-reveal
        >
          <Link href="/" className="hover:text-emerald">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/men" className="hover:text-emerald">
            Men
          </Link>{' '}
          /{' '}
          <Link href={`/men?cat=${encodeURIComponent(product.cat)}`} className="hover:text-emerald">
            {product.cat}
          </Link>{' '}
          / <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <SectionHead
              eyebrow="Complete the Look"
              title={
                <>
                  You may also
                  <br />
                  <em className="text-emerald">admire.</em>
                </>
              }
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger>
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

        <RecentlyViewed productId={product.id} />
      </section>
    </>
  );
}
