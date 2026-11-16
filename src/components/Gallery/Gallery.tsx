import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Reveal from "../shared/Reveal";
import { GALLERY_IMAGES } from "../../data/site";
import "./gallery.css";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "200px" });
  const reducedMotion = useReducedMotion();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    if (hovered || focused || reducedMotion || !inView) {
      const position = swiper.getTranslate();
      swiper.autoplay.stop();
      swiper.setTransition(0);
      swiper.setTranslate(position);
    } else {
      swiper.autoplay.start();
    }
  }, [swiper, hovered, focused, reducedMotion, inView]);

  return (
    <section ref={sectionRef} id="galeria" className="bg-cream-soft pt-12 sm:pb-8 sm:pt-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-lg text-center">
          <h2 className="section-title mt-1.5 text-[1.6rem] sm:mt-3 sm:text-5xl">
            Olhares que encantam <span className="text-rose-500">♡</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-6 sm:mt-10">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
        <Swiper
          onSwiper={setSwiper}
          tabIndex={0}
          role="region"
          aria-label="Galeria de trabalhos"
          modules={[Autoplay]}
          autoplay={{ delay: 1, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={5000}
          spaceBetween={12}
          slidesPerView={2.6}
          grabCursor
          loop
          allowTouchMove
          breakpoints={{
            480: { slidesPerView: 3.2, spaceBetween: 16 },
            768: { slidesPerView: 4.5, spaceBetween: 20 },
            1024: { slidesPerView: 5.5, spaceBetween: 24 },
          }}
          className="kaline-gallery"
        >
          {GALLERY_IMAGES.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                className="aspect-square w-full rounded-full object-cover shadow-card"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </Reveal>
    </section>
  );
}
