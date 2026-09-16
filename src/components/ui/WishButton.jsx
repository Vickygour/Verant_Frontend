'use client';

import { Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

/** Heart toggle used on cards, quick view and the product page. */
export default function WishButton({ productId, className = '' }) {
  const { isWished, toggleWishlist } = useStore();
  const active = isWished(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(productId);
      }}
      className={`wish-btn ${active ? 'active' : ''} ${className}`}
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Save to wishlist'}
    >
      <Heart className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
