'use client';

import { useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { useCatalog } from '@/context/CatalogContext';
import { useStore } from '@/context/StoreContext';

/** Records the visit and renders the visitor's own history (minus this product). */
export default function RecentlyViewed({ productId }) {
  const { recent, pushRecent } = useStore();
  const { getProduct } = useCatalog();

  useEffect(() => {
    pushRecent(productId);
  }, [productId, pushRecent]);

  const viewed = recent
    .filter((id) => String(id) !== String(productId))
    .map(getProduct)
    .filter(Boolean)
    .slice(0, 4);

  if (!viewed.length) return null;

  return (
    <div className="mt-16">
      <div className="eyebrow text-emerald mb-6" data-reveal>
        Recently Viewed
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {viewed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
