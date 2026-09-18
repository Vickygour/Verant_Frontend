'use client';

import { useCatalog } from '@/context/CatalogContext';
import { formatPrice } from '@/lib/format';

const AVAILABILITY = [
  { value: 'all', label: 'All' },
  { value: 'in', label: 'In Stock' },
  { value: 'low', label: 'Low Stock (<10)' },
];

/** Sidebar facets. Presentational — all state lives in MenCollection. */
export default function FilterPanel({ filters, onToggle, onMaxPrice, onAvail, onClear, mobileOpen }) {
  const {
    categories: CATEGORIES,
    sizeOptions: SIZE_OPTIONS,
    colorOptions: COLOR_OPTIONS,
    materialOptions: MATERIAL_OPTIONS,
  } = useCatalog();

  const mobileClasses = mobileOpen
    ? 'block fixed inset-y-0 left-0 z-[75] w-[300px] max-h-none'
    : 'hidden lg:block';

  return (
    <aside
      className={`${mobileClasses} lg:w-[280px] shrink-0 bg-white border border-line lg:sticky lg:top-32 lg:max-h-[80vh] overflow-y-auto`}
      aria-label="Product filters"
    >
      <div className="p-5 border-b border-line flex justify-between items-center sticky top-0 bg-white z-10">
        <span className="eyebrow">Filters</span>
        <button
          type="button"
          onClick={onClear}
          className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-emerald hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="p-5 space-y-6">
        <fieldset>
          <legend className="text-[11px] tracking-[0.25em] uppercase font-extrabold mb-3">
            Category
          </legend>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-3 text-sm cursor-pointer hover:text-emerald">
                <input
                  type="checkbox"
                  className="check-lux"
                  checked={filters.cats.includes(cat)}
                  onChange={() => onToggle('cats', cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="text-[11px] tracking-[0.25em] uppercase font-extrabold mb-3">
            Max Price — <span className="text-emerald">{formatPrice(filters.maxPrice)}</span>
          </div>
          <input
            type="range"
            min={1000}
            max={40000}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onMaxPrice(Number(e.target.value))}
            className="w-full"
            aria-label="Maximum price"
          />
          <div className="flex justify-between text-[11px] text-muted mt-1">
            <span>₹1,000</span>
            <span>₹40,000</span>
          </div>
        </div>

        <fieldset>
          <legend className="text-[11px] tracking-[0.25em] uppercase font-extrabold mb-3">Size</legend>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onToggle('sizes', size)}
                className={`chip ${filters.sizes.includes(size) ? 'on' : ''}`}
                aria-pressed={filters.sizes.includes(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] tracking-[0.25em] uppercase font-extrabold mb-3">
            Colour
          </legend>
          <div className="space-y-2">
            {COLOR_OPTIONS.map((color) => (
              <label key={color} className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="check-lux"
                  checked={filters.colors.includes(color)}
                  onChange={() => onToggle('colors', color)}
                />
                {color}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] tracking-[0.25em] uppercase font-extrabold mb-3">
            Material
          </legend>
          <div className="space-y-2">
            {MATERIAL_OPTIONS.map((material) => (
              <label key={material} className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="check-lux"
                  checked={filters.materials.includes(material)}
                  onChange={() => onToggle('materials', material)}
                />
                {material}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] tracking-[0.25em] uppercase font-extrabold mb-3">
            Availability
          </legend>
          <div className="space-y-2">
            {AVAILABILITY.map((option) => (
              <label key={option.value} className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  className="radio-lux"
                  checked={filters.avail === option.value}
                  onChange={() => onAvail(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </aside>
  );
}
