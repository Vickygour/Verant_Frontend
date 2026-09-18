'use client';

import api from '@/lib/api/client';
import { normalizeProducts, normalizeProduct } from '@/lib/api/normalize';

/** Turn the UI's filter state into the query string GET /products expects. */
function toQuery(filters = {}) {
  const params = {};

  if (filters.cats?.length) params.cats = filters.cats.join(',');
  if (filters.sizes?.length) params.sizes = filters.sizes.join(',');
  if (filters.colors?.length) params.colors = filters.colors.join(',');
  if (filters.materials?.length) params.materials = filters.materials.join(',');
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;
  if (filters.avail && filters.avail !== 'all') params.avail = filters.avail;
  if (filters.sort) params.sort = filters.sort;
  if (filters.page) params.page = filters.page;
  params.limit = filters.limit || 100;

  return params;
}

/** GET /api/products — filtered, sorted, paginated catalogue. */
export async function listProducts(filters = {}) {
  const res = await api.get('/products', { params: toQuery(filters) });
  return {
    items: normalizeProducts(res?.data?.items),
    pagination: res?.data?.pagination || { page: 1, pages: 1, total: 0, limit: 100 },
  };
}

/** Walks every page so the client-side catalogue holds the complete collection. */
export async function fetchAllProducts() {
  const first = await listProducts({ page: 1, limit: 100 });
  const pages = first.pagination?.pages || 1;
  if (pages <= 1) return first.items;

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) => listProducts({ page: i + 2, limit: 100 })),
  );

  return rest.reduce((acc, page) => acc.concat(page.items), first.items);
}

/** GET /api/products/:id — accepts the numeric id, a slug or a Mongo _id. */
export async function getProductById(id) {
  const res = await api.get(`/products/${id}`);
  return normalizeProduct(res?.data?.product);
}

/** GET /api/products/featured */
export async function getFeaturedProducts() {
  const res = await api.get('/products/featured');
  return normalizeProducts(res?.data?.items);
}

/** GET /api/products/search?q= */
export async function searchProducts(q = '') {
  const res = await api.get('/products/search', { params: { q } });
  return normalizeProducts(res?.data?.items);
}

/** GET /api/products/categories */
export async function getCategories() {
  const res = await api.get('/products/categories');
  return Array.isArray(res?.data?.categories) ? res.data.categories : [];
}

// --- Admin only (protect + authorize('admin')) -------------------------------

export async function createProduct(payload) {
  const res = await api.post('/products', payload);
  return normalizeProduct(res?.data?.product);
}

export async function updateProduct(mongoId, payload) {
  const res = await api.patch(`/products/${mongoId}`, payload);
  return normalizeProduct(res?.data?.product);
}

export async function deleteProduct(mongoId) {
  return api.delete(`/products/${mongoId}`);
}

const productService = {
  list: listProducts,
  fetchAll: fetchAllProducts,
  getById: getProductById,
  featured: getFeaturedProducts,
  search: searchProducts,
  categories: getCategories,
  create: createProduct,
  update: updateProduct,
  remove: deleteProduct,
};

export default productService;
