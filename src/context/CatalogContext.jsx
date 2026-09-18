'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import productService from '@/lib/api/products.service';
import contentService from '@/lib/api/content.service';
import {
  PRODUCTS as SEED_PRODUCTS,
  LOOKS as SEED_LOOKS,
  CRAFT as SEED_CRAFT,
  TESTIMONIALS as SEED_TESTIMONIALS,
  CATEGORY_TILES as SEED_CATEGORY_TILES,
  CATEGORIES as SEED_CATEGORIES,
  SIZE_OPTIONS as SEED_SIZE_OPTIONS,
  COLOR_OPTIONS as SEED_COLOR_OPTIONS,
  MATERIAL_OPTIONS as SEED_MATERIAL_OPTIONS,
} from '@/data/products';

const CatalogContext = createContext(null);

/**
 * Single source of truth for catalogue + CMS data on the client.
 *
 * It boots from the seed arrays in src/data/products.js (identical to what
 * `npm run seed` loads into MongoDB) so the first paint matches the server
 * render exactly, then swaps in live data from GET /products and GET /content.
 */
export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [categories, setCategories] = useState(SEED_CATEGORIES);
  const [content, setContent] = useState({
    looks: SEED_LOOKS,
    craft: SEED_CRAFT,
    testimonials: SEED_TESTIMONIALS,
    categoryTiles: SEED_CATEGORY_TILES,
    sizeOptions: SEED_SIZE_OPTIONS,
    colorOptions: SEED_COLOR_OPTIONS,
    materialOptions: SEED_MATERIAL_OPTIONS,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);

    const results = await Promise.allSettled([
      productService.fetchAll(),
      contentService.getAll(),
      productService.categories(),
    ]);

    const [productsRes, contentRes, categoriesRes] = results;

    if (productsRes.status === 'fulfilled' && productsRes.value.length) {
      setProducts(productsRes.value);
    }

    if (contentRes.status === 'fulfilled' && contentRes.value) {
      setContent((prev) => {
        const next = { ...prev };
        Object.entries(contentRes.value).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length) next[key] = value;
        });
        return next;
      });
    }

    if (categoriesRes.status === 'fulfilled' && categoriesRes.value.length) {
      setCategories(categoriesRes.value);
    }

    const failure = results.find((r) => r.status === 'rejected');
    setError(failure ? failure.reason : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(String(p.id), p));
    return map;
  }, [products]);

  const getProduct = useCallback((id) => productMap.get(String(id)) || null, [productMap]);

  const value = useMemo(
    () => ({
      products,
      categories,
      getProduct,
      getByCategory: (cat) =>
        !cat || cat === 'All' ? products : products.filter((p) => p.cat === cat),
      getFeatured: () => products.filter((p) => p.isBest || p.isNew),
      looks: content.looks,
      craft: content.craft,
      testimonials: content.testimonials,
      categoryTiles: content.categoryTiles,
      sizeOptions: content.sizeOptions,
      colorOptions: content.colorOptions,
      materialOptions: content.materialOptions,
      loading,
      error,
      refresh: load,
    }),
    [products, categories, getProduct, content, loading, error, load],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used inside <CatalogProvider>');
  return ctx;
}
