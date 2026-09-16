'use client';

import { useEffect, useRef } from 'react';

/** Trailing ring cursor for pointer devices. Hidden on touch via CSS. */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frame;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const onOver = (e) => {
      if (!ring) return;
      const interactive = e.target.closest('button, a, .product-card');
      ring.style.width = interactive ? '56px' : '36px';
      ring.style.height = interactive ? '56px' : '36px';
      ring.style.background = interactive ? 'rgba(11,61,46,.08)' : 'transparent';
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
    </>
  );
}
