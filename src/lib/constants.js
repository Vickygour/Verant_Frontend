/** Business rules and shared constants. */

export const FREE_SHIPPING_THRESHOLD = 8000;
export const STANDARD_SHIPPING = 199;
export const EXPRESS_SHIPPING = 499;
export const MAX_QTY_PER_LINE = 5;
export const GST_RATE = 0.107;

export const STORAGE_KEYS = {
  cart: 'verant_cart',
  wishlist: 'verant_wish',
  recent: 'verant_recent',
};

export const DEFAULT_FILTERS = {
  cats: [],
  maxPrice: 40000,
  sizes: [],
  colors: [],
  materials: [],
  avail: 'all',
  sort: 'featured',
  query: '',
};

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'low', label: 'Price: Low → High' },
  { value: 'high', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'new', label: 'Newest' },
];

export const INDIAN_STATES = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana',
  'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Kerala',
  'Punjab', 'Other',
];

/** Shipping cost for a given subtotal and method. */
export function shippingCost(subtotal, method = 'standard') {
  if (subtotal <= 0) return 0;
  if (method === 'express') return EXPRESS_SHIPPING;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}
