import axios from 'axios';
import {
  PRODUCTS as STATIC_PRODUCTS,
  CATEGORIES as STATIC_CATEGORIES,
} from '@/data/products';
import { normalizeProducts, normalizeProduct } from '@/lib/api/normalize';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const serverApi = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

let offlineUntil = 0;
const OFFLINE_COOLDOWN_MS = 30_000;

async function safeGet(path, params) {
  if (Date.now() < offlineUntil) return null;

  try {
    const res = await serverApi.get(path, { params });
    return res.data?.data ?? null;
  } catch (error) {
    offlineUntil = Date.now() + OFFLINE_COOLDOWN_MS;
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `[verant] API unreachable (${BASE_URL}${path}) — falling back to the seed catalogue.`,
      );
    }
    return null;
  }
}

/** Whole catalogue, paginated through. Falls back to the static seed. */
export async function fetchProducts() {
  const first = await safeGet('/products', { page: 1, limit: 100 });
  if (!first?.items) return STATIC_PRODUCTS;

  const pages = first.pagination?.pages || 1;
  let items = normalizeProducts(first.items);

  for (let page = 2; page <= pages; page += 1) {
    // eslint-disable-next-line no-await-in-loop
    const next = await safeGet('/products', { page, limit: 100 });
    if (!next?.items) break;
    items = items.concat(normalizeProducts(next.items));
  }

  return items;
}

/** A single product by numeric id / slug / Mongo _id. */
export async function fetchProduct(id) {
  const data = await safeGet(`/products/${id}`);
  if (data?.product) return normalizeProduct(data.product);

  return STATIC_PRODUCTS.find((p) => String(p.id) === String(id)) || null;
}

/** Category list used by /men. */
export async function fetchCategories() {
  const data = await safeGet('/products/categories');
  const list = data?.categories;
  return Array.isArray(list) && list.length ? list : STATIC_CATEGORIES;
}

/** Every content block (looks, craft, testimonials, tiles, filter options). */
export async function fetchContent() {
  return (await safeGet('/content')) || {};
}
