'use client';

import api from '@/lib/api/client';

const ALLOWED_KEYS = [
  'looks',
  'craft',
  'testimonials',
  'categoryTiles',
  'sizeOptions',
  'colorOptions',
  'materialOptions',
];

/** GET /api/content — every CMS block in one round trip (homepage boot). */
export async function getAllContent() {
  const res = await api.get('/content');
  return res?.data || {};
}

/** GET /api/content/:key — e.g. 'looks', 'craft', 'testimonials'. */
export async function getContent(key) {
  if (!ALLOWED_KEYS.includes(key)) {
    throw new Error(`Unknown content key: ${key}`);
  }
  const res = await api.get(`/content/${key}`);
  return res?.data?.[key];
}

const contentService = { getAll: getAllContent, get: getContent, KEYS: ALLOWED_KEYS };

export default contentService;
