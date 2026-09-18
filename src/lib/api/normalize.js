/**
 * The Mongo Product document and the original static catalogue differ in
 * exactly one field name: `isNewArrival` (backend) vs `isNew` (UI).
 * Everything the storefront renders goes through here so no component
 * ever has to know which side the data came from.
 */
export function normalizeProduct(raw) {
  if (!raw) return null;

  return {
    ...raw,
    id: Number(raw.id),
    name: raw.name || '',
    cat: raw.cat || '',
    price: Number(raw.price) || 0,
    mrp: Number(raw.mrp) || Number(raw.price) || 0,
    rating: Number(raw.rating) || 0,
    reviews: Number(raw.reviews) || 0,
    badge: raw.badge || '',
    isNew: raw.isNewArrival ?? raw.isNew ?? false,
    isBest: raw.isBest ?? false,
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    colors: Array.isArray(raw.colors) && raw.colors.length
      ? raw.colors
      : [{ n: 'Default', h: '#0B3D2E' }],
    material: raw.material || '',
    fit: raw.fit || '',
    stock: Number(raw.stock) || 0,
    tagline: raw.tagline || '',
    desc: raw.desc || '',
    care: raw.care || '',
    images: Array.isArray(raw.images) && raw.images.length ? raw.images : [''],
  };
}

export function normalizeProducts(list) {
  return (Array.isArray(list) ? list : []).map(normalizeProduct).filter(Boolean);
}

/** Review documents → the shape ProductReviews already renders. */
export function normalizeReview(raw) {
  if (!raw) return null;

  const created = raw.createdAt ? new Date(raw.createdAt) : null;

  return {
    id: raw._id || raw.id,
    author: raw.author || 'Verified Customer',
    rating: Number(raw.rating) || 5,
    date: created
      ? created.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : 'Just now',
    title: raw.title || '',
    comment: raw.comment || '',
    verified: raw.verified ?? true,
    likes: Number(raw.likes) || 0,
  };
}

export function normalizeReviews(list) {
  return (Array.isArray(list) ? list : []).map(normalizeReview).filter(Boolean);
}
