/** Formatting helpers shared across the storefront. */

/** Indian rupee formatting — ₹14,990 */
export const formatPrice = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

/** Discount percentage off MRP. */
export const discountPercent = (price, mrp) => Math.round((1 - price / mrp) * 100);

/** Monthly EMI over 12 months (indicative). */
export const emiPerMonth = (price) => Math.round(price / 12);

/** Generate a demo order id: VRNT-482913 */
export const createOrderId = () => `VRNT-${Date.now().toString().slice(-6)}`;
