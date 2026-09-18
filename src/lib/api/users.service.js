'use client';

import api from '@/lib/api/client';

/** PATCH /api/users/me — protected. */
export async function updateMe({ name, phone }) {
  const res = await api.patch('/users/me', { name, phone });
  return res?.data?.user || null;
}

/** POST /api/users/me/addresses — protected. */
export async function addAddress(address) {
  const res = await api.post('/users/me/addresses', address);
  return res?.data?.addresses || [];
}

/** DELETE /api/users/me/addresses/:addressId — protected. */
export async function deleteAddress(addressId) {
  const res = await api.delete(`/users/me/addresses/${addressId}`);
  return res?.data?.addresses || [];
}

/** GET /api/users — admin only. */
export async function getAllUsers() {
  const res = await api.get('/users');
  return res?.data?.users || [];
}

const userService = {
  updateMe,
  addAddress,
  deleteAddress,
  all: getAllUsers,
};

export default userService;
