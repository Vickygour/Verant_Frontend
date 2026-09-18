'use client';

import api from '@/lib/api/client';
import { normalizeProducts } from '@/lib/api/normalize';

/** GET /api/wishlist — protected. Returns fully populated products. */
export async function getWishlist() {
  const res = await api.get('/wishlist');
  return normalizeProducts(res?.data?.wishlist);
}

/** POST /api/wishlist/:productId — protected. Toggles add/remove. */
export async function toggleWishlist(productId) {
  const res = await api.post(`/wishlist/${productId}`);
  return { added: Boolean(res?.data?.added), message: res?.message };
}

const wishlistService = { get: getWishlist, toggle: toggleWishlist };

export default wishlistService;
