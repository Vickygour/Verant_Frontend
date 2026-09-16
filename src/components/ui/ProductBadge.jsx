const TONE = {
  NEW: 'bg-emerald',
  LIMITED: 'bg-[#3E2F27]',
};

/** Corner flag: stock state wins over the marketing badge. */
export default function ProductBadge({ badge, stock }) {
  if (stock === 0) {
    return (
      <span className="absolute top-3 left-3 bg-ink text-white text-[10px] tracking-[0.2em] font-extrabold px-3 py-1.5 z-10">
        SOLD OUT
      </span>
    );
  }
  if (!badge) return null;

  return (
    <span
      className={`absolute top-3 left-3 ${TONE[badge] || 'bg-emerald-deep'} text-white text-[10px] tracking-[0.2em] font-extrabold px-3 py-1.5 z-10`}
    >
      {badge}
    </span>
  );
}
