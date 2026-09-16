'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { getProduct } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { formatPrice } from '@/lib/format';
import { FREE_SHIPPING_THRESHOLD, shippingCost } from '@/lib/constants';

export default function CartDrawer() {
  const router = useRouter();
  const { overlays, closeCart, toast } = useUI();
  const { cart, cartCount, subtotal, updateQty, removeFromCart } = useStore();

  const open = overlays.cart;
  useLockBodyScroll(open);

  const shipping = shippingCost(subtotal, 'standard');
  const needed = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const goToCheckout = () => {
    if (!cart.length) {
      toast('Empty Bag', 'Add something sharp first.');
      return;
    }
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      <div
        onClick={closeCart}
        className={`overlay-bg fixed inset-0 bg-ink/40 backdrop-blur-sm z-[80] ${open ? 'open' : ''}`}
        role="presentation"
      />

      <aside
        className={`drawer fixed top-0 right-0 h-full w-full max-w-[460px] bg-ivory z-[81] flex flex-col border-l border-line ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping bag"
        aria-hidden={!open}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-line bg-white">
          <div>
            <div className="eyebrow text-emerald">Shopping Bag</div>
            <div className="font-display text-2xl mt-1">
              {cartCount} Item{cartCount !== 1 ? 's' : ''}
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="w-10 h-10 border border-line flex items-center justify-center hover:bg-ink hover:text-white transition"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-4 bg-emerald-deep text-white text-[11px] tracking-[0.15em] uppercase font-bold">
          {cart.length === 0
            ? 'Complimentary shipping over ₹8,000'
            : needed === 0
              ? "✓ You've unlocked free standard shipping"
              : `Add ${formatPrice(needed)} more for free shipping`}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-14">
              <ShoppingBag className="w-12 h-12 mx-auto text-line" aria-hidden="true" />
              <h4 className="font-display text-2xl mt-4">Your bag is empty.</h4>
              <p className="text-sm text-muted mt-2">Sharp pieces await.</p>
              <Link href="/men" onClick={closeCart} className="btn btn-primary mt-6">
                <span>Shop Men</span>
              </Link>
            </div>
          ) : (
            cart.map((item, index) => {
              const product = getProduct(item.id);
              if (!product) return null;

              return (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 bg-white border border-line p-3"
                >
                  <Link
                    href={`/product/${product.id}`}
                    onClick={closeCart}
                    className="relative w-20 h-24 shrink-0"
                  >
                    <SmartImage
                      src={product.images[0]}
                      alt={product.name}
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-display text-[15px] leading-tight">
                        <Link
                          href={`/product/${product.id}`}
                          onClick={closeCart}
                          className="hover:text-emerald"
                        >
                          {product.name}
                        </Link>
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(index)}
                        className="text-muted hover:text-red-700 shrink-0"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="text-[11px] text-muted mt-1">
                      {product.cat} · {item.size} · {item.color}
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => updateQty(index, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-offwhite"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-extrabold">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(index, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-offwhite"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="font-extrabold text-sm">
                        {formatPrice(product.price * item.qty)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-line bg-white px-6 py-5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted">Subtotal</span>
            <span className="font-bold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted">Shipping</span>
            <span className="font-bold">
              {subtotal === 0 ? '—' : shipping === 0 ? 'FREE' : formatPrice(shipping)}
            </span>
          </div>
          <div className="flex justify-between font-display text-2xl mb-4">
            <span>Total</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </div>

          <button type="button" onClick={goToCheckout} className="btn btn-primary w-full">
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={closeCart}
            className="w-full text-center mt-3 text-[11px] tracking-[0.25em] uppercase font-bold link-line"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </>
  );
}
