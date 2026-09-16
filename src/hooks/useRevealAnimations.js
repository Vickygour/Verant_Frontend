'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-driven reveals powered by GSAP + ScrollTrigger.
 * GSAP is imported dynamically so it never lands in the server bundle,
 * and every trigger is torn down on route change to avoid leaks.
 *
 * Markup opts in with: data-reveal | data-clip | data-stagger |
 * data-parallax | data-count | data-horizontal-wrap
 */
export function useRevealAnimations(deps = []) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let ctx;
    let cancelled = false;

    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 44, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            },
          );
        });

        gsap.utils.toArray('[data-clip]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.2,
              ease: 'power4.inOut',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            },
          );
          const img = el.querySelector('img');
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.25 },
              {
                scale: 1,
                duration: 1.6,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' },
              },
            );
          }
        });

        gsap.utils.toArray('[data-stagger]').forEach((parent) => {
          gsap.fromTo(
            parent.children,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: parent, start: 'top 88%' },
            },
          );
        });

        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          gsap.to(el, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              scrub: 1,
              start: 'top bottom',
              end: 'bottom top',
            },
          });
        });

        gsap.utils.toArray('[data-count]').forEach((el) => {
          const end = parseFloat(el.dataset.count);
          const dec = Number(el.dataset.dec || 0);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
            onUpdate: () => {
              el.textContent = obj.v.toFixed(dec);
            },
          });
        });

        const wrap = document.querySelector('[data-horizontal-wrap]');
        if (wrap && window.innerWidth > 1024) {
          const track = wrap.querySelector('[data-horizontal-track]');
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
          gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ...deps]);
}

/** One-shot intro for elements marked `.hero-el`. */
export function useHeroIntro() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let ctx;
    let cancelled = false;

    (async () => {
      const { default: gsap } = await import('gsap');
      if (cancelled) return;
      ctx = gsap.context(() => {
        const els = document.querySelectorAll('.hero-el');
        if (els.length) {
          gsap.fromTo(
            els,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 },
          );
        }
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
}
