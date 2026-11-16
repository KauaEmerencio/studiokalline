import { Feather, Clock, Heart } from "lucide-react";
import Reveal from "../shared/Reveal";
import { BENEFITS } from "../../data/site";

const ICONS = { Feather, Clock, Heart } as const;

export default function Benefits() {
  return (
    <section id="diferenciais" className="container-page py-12 sm:py-20 lg:py-24">
      <h2 className="sr-only">Diferenciais</h2>
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-8 lg:gap-x-16">
        {BENEFITS.map((b, i) => {
          const Icon = ICONS[b.icon as keyof typeof ICONS];
          return (
            <Reveal key={b.title} delay={i * 0.08} className="flex flex-col items-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-300/60 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <Icon size={18} strokeWidth={1.25} className="text-rose-600 sm:hidden" />
                <Icon size={22} strokeWidth={1.25} className="hidden text-rose-600 sm:block lg:hidden" />
                <Icon size={26} strokeWidth={1.25} className="hidden text-rose-600 lg:block" />
              </div>
              <h3 className="mt-3 w-full break-words font-display text-[15px] leading-tight text-ink sm:mt-4 sm:text-xl lg:text-2xl">
                {b.title}
              </h3>
              <p className="mt-1.5 w-full max-w-[10rem] break-words font-body text-[10.5px] font-light leading-snug text-ink-soft sm:mt-2 sm:max-w-[15rem] sm:text-[13px] sm:leading-relaxed lg:max-w-[17rem] lg:text-sm">
                {b.text}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
