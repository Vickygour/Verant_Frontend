'use client';

import { useRef, useState } from 'react';
import { RefreshCcw, ShieldCheck, Truck, ZoomIn } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import ProductBadge from '@/components/ui/ProductBadge';

const PROMISES = [
  { Icon: Truck, label: 'Free Ship ₹8k+' },
  { Icon: RefreshCcw, label: '30-Day Return' },
  { Icon: ShieldCheck, label: '2-Yr Warranty' },
];

/** Main image with pointer-tracked zoom, plus a thumbnail strip. */
export default function ProductGallery({ product }) {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);

  const thumbs = [...product.images, product.images[0]].slice(0, 4);

  const handleMove = (e) => {
    if (window.innerWidth < 768 || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y });
  };

  return (
    <div data-reveal>
      <div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setZoom(null)}
        className="zoom-wrap border border-line bg-white relative aspect-[3/4]"
      >
        <ProductBadge badge={product.badge} stock={product.stock} />

        <div
          className="absolute inset-0"
          style={{
            transform: zoom ? 'scale(2)' : 'scale(1)',
            transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : 'center',
            transition: 'transform .3s ease',
          }}
        >
          <SmartImage
            src={thumbs[active]}
            alt={product.name}
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-2 z-10">
          <ZoomIn className="w-3 h-3" aria-hidden="true" /> Hover to zoom
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-3">
        {thumbs.map((image, i) => (
          <button
            key={`${image}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={active === i}
            className={`relative border cursor-pointer overflow-hidden aspect-square bg-white ${
              active === i ? 'border-emerald' : 'border-line'
            }`}
          >
            <SmartImage
              src={image}
              alt={`${product.name} view ${i + 1}`}
              sizes="120px"
              className="object-cover hover:scale-105 transition"
            />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        {PROMISES.map(({ Icon, label }) => (
          <div key={label} className="border border-line bg-white p-3">
            <Icon className="w-5 h-5 mx-auto text-emerald" aria-hidden="true" />
            <div className="text-[10px] font-bold mt-1 tracking-wider uppercase">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
