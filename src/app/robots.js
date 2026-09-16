import { SITE } from '@/data/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/checkout', '/wishlist'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
