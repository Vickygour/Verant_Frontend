'use client';

import api from '@/lib/api/client';
import { normalizeReviews, normalizeReview } from '@/lib/api/normalize';

/** GET /api/products/:productId/reviews */
export async function getProductReviews(productId) {
  const res = await api.get(`/products/${productId}/reviews`);
  return normalizeReviews(res?.data?.reviews);
}

/** POST /api/products/:productId/reviews — protected, one review per user. */
export async function createReview(productId, { rating, title, comment }) {
  const res = await api.post(`/products/${productId}/reviews`, { rating, title, comment });
  return normalizeReview(res?.data?.review);
}

/** PATCH /api/reviews/:id/like — public "helpful" counter. */
export async function likeReview(reviewId) {
  const res = await api.patch(`/reviews/${reviewId}/like`);
  return normalizeReview(res?.data?.review);
}

/** DELETE /api/reviews/:id — owner or admin. */
export async function deleteReview(reviewId) {
  return api.delete(`/reviews/${reviewId}`);
}

const reviewService = {
  forProduct: getProductReviews,
  create: createReview,
  like: likeReview,
  remove: deleteReview,
};

export default reviewService;
