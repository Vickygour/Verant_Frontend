/** Barrel export so any component can pull a service in one line. */
export { default as api, API_BASE_URL } from '@/lib/api/client';
export { default as authService } from '@/lib/api/auth.service';
export { default as productService } from '@/lib/api/products.service';
export { default as contentService } from '@/lib/api/content.service';
export { default as wishlistService } from '@/lib/api/wishlist.service';
export { default as reviewService } from '@/lib/api/reviews.service';
export { default as orderService } from '@/lib/api/orders.service';
export { default as userService } from '@/lib/api/users.service';
