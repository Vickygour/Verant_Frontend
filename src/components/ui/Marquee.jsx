/** Infinite ticker — the text is duplicated so the loop never shows a gap. */
export default function Marquee({ text, className = '', trackClassName = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`marquee-track ${trackClassName}`}>
        <span className="px-6">{text}&nbsp;</span>
        <span className="px-6" aria-hidden="true">
          {text}&nbsp;
        </span>
      </div>
    </div>
  );
}
