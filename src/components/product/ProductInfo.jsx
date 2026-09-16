'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Shirt, ShoppingBag, Truck, WashingMachine } from 'lucide-react';
import Stars from '@/components/ui/Stars';
import WishButton from '@/components/ui/WishButton';
import { useStore } from '@/context/StoreContext';
import { useUI } from '@/context/UIContext';
import { discountPercent, emiPerMonth, formatPrice } from '@/lib/format';
import { MAX_QTY_PER_LINE } from '@/lib/constants';

function Accordion({ Icon, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`acc ${open ? 'open' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex justify-between items-center p-4 font-bold text-sm"
      >
        <span className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-emerald" aria-hidden="true" />
          {title}
        </span>
        <Plus className="acc-icon w-4 h-4" aria-hidden="true" />
      </button>
      <div className="acc-body">
        <div className="px-4 pb-4 text-sm text-muted leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ProductInfo({ product }) {
  const { addToBag } = useStore();
  const { openSizeGuide, toast } = useUI();

  const [size, setSize] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const soldOut = product.stock === 0;
  const off = discountPercent(product.price, product.mrp);
  const needsSize = product.sizes.length > 1 && product.cat !== 'Accessories';

  const handleAdd = () => {
    if (needsSize && !size) {
      setSizeError(true);
      toast('Size Required', 'Please select a size first.');
      return;
    }
    setSizeError(false);
    addToBag(product.id, size || product.sizes[0], product.colors[colorIndex].n, qty);
  };

  const stockTone = soldOut
    ? 'text-red-700'
    : product.stock < 10
      ? 'text-[#8a6d1b]'
      : 'text-emerald';

  const stockDot = soldOut ? 'bg-red-700' : product.stock < 10 ? 'bg-amber-500' : 'bg-emerald';

  return (
    <div data-reveal>
      <div className="text-[11px] tracking-[0.3em] uppercase font-extrabold text-emerald">
        {product.cat} — {product.material}
      </div>

      <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight">{product.name}</h1>
      <div className="text-muted italic font-display text-lg mt-1">{product.tagline}</div>

      <div className="flex items-center gap-3 mt-4">
        <Stars rating={product.rating} />
        <span className="text-sm font-bold">{product.rating}</span>
        <span className="text-sm text-muted">· {product.reviews} verified reviews</span>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="font-display text-4xl">{formatPrice(product.price)}</span>
        <span className="text-muted line-through">{formatPrice(product.mrp)}</span>
        <span className="bg-emerald text-white text-[11px] font-extrabold px-2 py-1">
          SAVE {off}%
        </span>
      </div>

      <div className="text-xs text-muted mt-1">
        Inclusive of all taxes · EMI from {formatPrice(emiPerMonth(product.price))}/mo
      </div>

      <p className="text-sm leading-relaxed text-ink/80 mt-5 border-l-2 border-emerald pl-4">
        {product.desc}
      </p>

      <div className="mt-6">
        <div className="text-[11px] tracking-[0.25em] uppercase font-extrabold mb-3">
          Colour — <span className="text-emerald">{product.colors[colorIndex].n}</span>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color, i) => (
            <button
              key={color.n}
              type="button"
              title={color.n}
              aria-label={`Colour ${color.n}`}
              aria-pressed={colorIndex === i}
              onClick={() => setColorIndex(i)}
              className={`w-11 h-11 border p-[3px] ${
                colorIndex === i ? 'border-emerald ring-2 ring-emerald/30' : 'border-line'
              }`}
            >
              <span className="block w-full h-full" style={{ background: color.h }} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] tracking-[0.25em] uppercase font-extrabold">
            Select Size {soldOut ? '(Sold Out)' : ''}
          </span>
          <button
            type="button"
            onClick={openSizeGuide}
            className="text-[11px] font-bold text-emerald underline"
          >
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setSizeError(false);
              }}
              aria-pressed={size === s}
              className={`min-w-[64px] px-4 py-3 border text-sm font-bold transition ${
                size === s
                  ? 'bg-emerald text-white border-emerald'
                  : 'bg-white border-line hover:border-emerald'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {sizeError && (
          <div className="text-xs text-red-700 font-bold mt-2" role="alert">
            Please select a size.
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex items-center border border-line bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-11 h-[52px] flex items-center justify-center hover:bg-offwhite"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center font-extrabold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(MAX_QTY_PER_LINE, q + 1))}
            className="w-11 h-[52px] flex items-center justify-center hover:bg-offwhite"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className={`btn flex-1 !py-[17px] ${soldOut ? 'btn-disabled' : 'btn-primary'}`}
        >
          {soldOut ? (
            <span>Sold Out</span>
          ) : (
            <>
              <span>Add to Bag — {formatPrice(product.price * qty)}</span>
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>

        <WishButton productId={product.id} />
      </div>

      <div className={`mt-4 flex items-center gap-2 text-sm font-bold ${stockTone}`}>
        <span className={`w-2 h-2 rounded-full ${stockDot} pulse-dot`} />
        {soldOut
          ? 'Out of stock — join the waitlist below'
          : product.stock < 10
            ? `Only ${product.stock} left in stock — ships in 24h`
            : 'In stock — ships in 24h from Mumbai'}
      </div>

      <div className="mt-6 border border-line bg-white divide-y divide-line">
        <Accordion Icon={Shirt} title="Fit & Material">
          Fit: {product.fit}
          <br />
          Material: {product.material}
          <br />
          Model is 6'1" and wears size M.
        </Accordion>

        <Accordion Icon={WashingMachine} title="Care Instructions">
          {product.care}
        </Accordion>

        <Accordion Icon={Truck} title="Shipping & Returns">
          Standard (3–5 days) ₹199 · Free over ₹8,000. Express (24–48h) ₹499. 30-day returns, 2-year
          craft warranty. Questions?{' '}
          <Link href="/about" className="text-emerald underline">
            Read about the maison
          </Link>
          .
        </Accordion>
      </div>
    </div>
  );
}
