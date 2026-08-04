import { motion, type Variants } from "framer-motion";
import { Users, Sparkles, Clock, Plus, Heart } from "lucide-react";
import CTAButton from "../CTA/CTAButton";
import { HERO, BOOKING_URL } from "../../data/site";
import heroImg from "../../assets/Hero.jpg";

const ICONS = { Users, Sparkles, Clock } as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [before, after] = HERO.subtitle.split(HERO.subtitleHighlight);

  return (
    <section className="relative w-full overflow-hidden bg-cream pb-6 pt-20 sm:pt-24 lg:pb-16 lg:pt-28">
      <div className="container-page lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-20">
        {/* Foto em moldura de arco — assinatura visual da página */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:order-2 lg:justify-start"
        >
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[420px] xl:max-w-[460px]">
            <div className="absolute -inset-4 -z-10 rounded-t-[50%/24%] rounded-b-[2.5rem] bg-rose-200/40 blur-2xl" />
            <img
              src={heroImg}
              alt="Studio Kaline"
              className="aspect-[3/4] w-full rounded-t-[50%/24%] rounded-b-[2.5rem] object-cover shadow-soft"
            />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 mt-6 flex flex-col items-center text-center sm:mt-8 lg:order-1 lg:mt-0 lg:items-start lg:text-left"
        >
          <motion.span variants={item} className="eyebrow flex items-center gap-1.5 text-rose-600">
            {HERO.eyebrow} <Heart size={11} fill="currentColor" strokeWidth={0} />
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-1.5 font-display text-[2.4rem] leading-[1.02] tracking-wide text-ink sm:mt-2 sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            STUDIO <span className="text-rose-600">KALINE</span>
          </motion.h1>

          <motion.div variants={item} className="mt-1.5 text-rose-400 sm:mt-2">
            <Plus size={14} strokeWidth={1.5} />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-2 max-w-xs font-body text-[13px] font-light leading-snug text-ink-soft sm:mt-3 sm:text-base sm:leading-relaxed lg:max-w-sm"
          >
            {before}
            <span className="text-rose-600">{HERO.subtitleHighlight}</span>
            {after}
          </motion.p>

          <motion.ul
            variants={item}
            className="mt-5 flex flex-col items-center gap-2 sm:mt-7 sm:flex-row sm:justify-center sm:gap-8 lg:items-start lg:justify-start"
          >
            {HERO.indicators.map((ind) => {
              const Icon = ICONS[ind.icon as keyof typeof ICONS];
              return (
                <li
                  key={ind.label}
                  className="flex items-center gap-1.5 font-body text-[10.5px] font-light text-ink-soft sm:gap-2 sm:text-[12px]"
                >
                  <Icon size={13} strokeWidth={1.5} className="shrink-0 text-rose-500" />
                  {ind.label}
                </li>
              );
            })}
          </motion.ul>

          <motion.div variants={item} className="mt-5 w-full max-w-md sm:mt-8">
            <CTAButton />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-3 font-body text-[11px] font-light text-ink-soft/80 sm:text-[12px]"
          >
            {HERO.caption}{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 underline underline-offset-2 hover:text-rose-700"
            >
              {HERO.captionLink}
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
