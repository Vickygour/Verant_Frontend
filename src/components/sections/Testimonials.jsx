'use client';

import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Stars from '@/components/ui/Stars';
import { useCatalog } from '@/context/CatalogContext';

// Swiper modules & styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  const { testimonials } = useCatalog();

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center relative">
      {/* Top Quote Icon */}
      <div className="text-sage mb-4" data-reveal>
        <Quote className="w-10 h-10 mx-auto" aria-hidden="true" />
      </div>

      {/* Main Brand Quote */}
      <p className="font-display text-3xl md:text-5xl leading-tight" data-reveal>
        “Elegance is not standing out. <em className="text-emerald">It is being remembered</em> for
        how quietly you did.”
      </p>

      <div className="eyebrow text-muted mt-6 mb-14" data-reveal>
        — Aurélien Vérant, Founder
      </div>

      {/* Swiper Slider Section */}
      <div className="relative group px-2 md:px-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
          }}
          navigation={{
            nextEl: '.testimonial-next',
            prevEl: '.testimonial-prev',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="pb-14"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={t.name || idx} className="h-auto">
              <figure className="bg-white border border-line p-6 text-left hover:border-emerald transition-all duration-300 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex gap-1 mb-4">
                    <Stars rating={5} />
                  </div>
                  <blockquote className="text-sm leading-relaxed text-ink/80 font-normal">
                    “{t.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-6 pt-4 border-t border-line">
                  <div className="font-bold text-sm text-ink">{t.name}</div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-muted font-bold mt-0.5">
                    {t.city} · Verified
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous Testimonial"
          className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-10 h-10 border border-emerald/20 bg-white text-emerald-deep flex items-center justify-center hover:bg-emerald-deep hover:text-white transition-all shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Next Testimonial"
          className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-10 h-10 border border-emerald/20 bg-white text-emerald-deep flex items-center justify-center hover:bg-emerald-deep hover:text-white transition-all shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Custom Pagination Bullets */}
        <div className="custom-swiper-pagination flex justify-center gap-2 mt-2" />
      </div>

      {/* Swiper Custom Pagination Style Override */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          border-radius: 0px;
          transition: all 0.3s ease;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #064e3b; /* emerald-deep tone */
          width: 24px;
        }
      `}</style>
    </section>
  );
}