'use client';

import { X } from 'lucide-react';
import { SIZE_GUIDE_ROWS } from '@/data/site';
import { useUI } from '@/context/UIContext';

export default function SizeGuideModal() {
  const { overlays, closeSizeGuide } = useUI();
  const open = overlays.sizeGuide;

  return (
    <>
      <div
        onClick={closeSizeGuide}
        className={`overlay-bg fixed inset-0 bg-ink/50 z-[92] ${open ? 'open' : ''}`}
        role="presentation"
      />
      <div
        className={`fixed inset-0 z-[93] ${open ? 'flex' : 'hidden'} items-center justify-center p-4 pointer-events-none`}
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
      >
        <div className="pointer-events-auto bg-white max-w-2xl w-full p-8 border border-line">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-3xl">Size Guide</h3>
            <button
              type="button"
              onClick={closeSizeGuide}
              className="w-10 h-10 border border-line flex items-center justify-center hover:bg-ink hover:text-white"
              aria-label="Close size guide"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-emerald text-white text-[11px] tracking-widest uppercase">
                  <th className="p-3 text-left">Size</th>
                  <th className="p-3">Chest (in)</th>
                  <th className="p-3">Waist (in)</th>
                  <th className="p-3">UK (Foot)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE_ROWS.map(([size, chest, waist, uk], i) => (
                  <tr
                    key={size}
                    className={`border-b border-line ${i % 2 === 1 ? 'bg-ivory' : ''}`}
                  >
                    <td className="p-3 font-bold">{size}</td>
                    <td className="p-3 text-center">{chest}</td>
                    <td className="p-3 text-center">{waist}</td>
                    <td className="p-3 text-center">{uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted mt-4">
            VÉRANT tailoring runs true to size with a sharp continental cut. For an oversized drape,
            take one size up.
          </p>
        </div>
      </div>
    </>
  );
}
