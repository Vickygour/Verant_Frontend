import { fetchProducts } from '@/lib/api/server';
import { SITE } from '@/data/site';

/** Generated sitemap covering static routes and every product page. */
export default async function sitemap() {
  const now = new Date();
  const PRODUCTS = await fetchProducts();
  const routes = ['', '/new', '/men', '/bestseller', '/about', '/lookbook'].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${SITE.url}/product/${p.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...products];
}
