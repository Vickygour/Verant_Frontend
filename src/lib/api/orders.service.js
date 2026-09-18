'use client';

import api from '@/lib/api/client';

/**
 * POST /api/orders — protected.
 * The server re-prices every line from the database, so we only send
 * identifiers and choices, never money.
 */
export async function createOrder({ items, shippingAddress, shipMethod, paymentMethod, upiId }) {
  const payload = {
    items: items.map((i) => ({
      productId: Number(i.productId ?? i.id),
      qty: i.qty,
      size: i.size,
      color: i.color,
    })),
    shippingAddress,
    shipMethod: shipMethod || 'standard',
    paymentMethod,
  };

  if (paymentMethod === 'upi') payload.upiId = upiId;

  const res = await api.post('/orders', payload);
  return res?.data?.order;
}

/** GET /api/orders/my — protected. */
export async function getMyOrders() {
  const res = await api.get('/orders/my');
  return res?.data?.orders || [];
}

/** GET /api/orders/:orderId — owner or admin. */
export async function getOrderById(orderId) {
  const res = await api.get(`/orders/${orderId}`);
  return res?.data?.order || null;
}

// --- Admin only --------------------------------------------------------------

export async function getAllOrders() {
  const res = await api.get('/orders/all');
  return res?.data?.orders || [];
}

export async function updateOrderStatus(orderId, { status, paymentStatus }) {
  const res = await api.patch(`/orders/${orderId}/status`, { status, paymentStatus });
  return res?.data?.order || null;
}

const orderService = {
  create: createOrder,
  mine: getMyOrders,
  getById: getOrderById,
  all: getAllOrders,
  updateStatus: updateOrderStatus,
};

export default orderService;
