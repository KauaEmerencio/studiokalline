import { Star } from "lucide-react";
import Reveal from "../shared/Reveal";
import { TESTIMONIALS } from "../../data/site";
import avatar1 from "../../assets/gallery/gallery-1.jpg";
import avatar2 from "../../assets/gallery/gallery-2.jpg";
import avatar3 from "../../assets/gallery/gallery-3.jpg";

const AVATARS = [avatar1, avatar2, avatar3];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="container-page py-12 sm:py-20">
      <Reveal className="mx-auto max-w-lg text-center">
        <span className="eyebrow text-[10px] sm:text-xs">O que minhas clientes dizem</span>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-6">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div className="flex h-full flex-col items-center rounded-2xl border border-ink/5 bg-cream-soft px-5 py-5 text-center shadow-card sm:rounded-3xl sm:px-7 sm:py-7">
              <img
                src={AVATARS[i % AVATARS.length]}
                alt={t.name}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white sm:h-14 sm:w-14"
              />
              <div className="mt-2 flex gap-0.5 text-rose-500 sm:mt-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={11} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-2 flex-1 font-body text-[11.5px] font-light italic leading-snug text-ink-soft sm:mt-3 sm:text-[13px] sm:leading-relaxed">
                “{t.text}”
              </p>
              <span className="mt-3 font-display text-base text-ink sm:mt-4 sm:text-lg">— {t.name}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}