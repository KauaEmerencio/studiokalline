import { motion, type Variants } from "framer-motion";
import { Users, Sparkles, Clock, Plus, Heart } from "lucide-react";
import CTAButton from "../CTA/CTAButton";
import { HERO, BOOKING_URL } from "../../data/site";
import heroImg from "../../assets/Hero.jpg";
import heroImgDesktop from "../../assets/Hero2.jpg";

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
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      <img
        src={heroImg}
        alt="Darc Kaline"
        className="absolute inset-0 h-full w-full object-cover lg:hidden"  />
      <img
        src={heroImgDesktop}
        alt="Darc Kaline"
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"   />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/60 via-ink/20 to-transparent lg:block" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-page relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-24 lg:mx-0 lg:max-w-2xl lg:justify-center lg:pb-28 lg:pl-16 lg:pt-32 xl:pl-24"
      >
        <motion.span variants={item} className="eyebrow flex items-center gap-1.5 text-rose-200">
          {HERO.eyebrow} <Heart size={11} fill="currentColor" strokeWidth={0} />
        </motion.span>
        <motion.h1
          variants={item}
          className="mt-1.5 font-display text-[2.6rem] leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          DARC
          <br />
          <span className="text-rose-300">KALINE</span>
        </motion.h1>

        <motion.span
          variants={item}
          className="mt-2 block font-body text-[11px] font-light uppercase tracking-widest2 text-rose-200/80 sm:text-xs"
        >
          — Lash Designer
        </motion.span>

        <motion.div variants={item} className="mt-2 text-rose-300/80">
          <Plus size={14} strokeWidth={1.5} />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-2 max-w-[16rem] font-body text-[13px] font-light leading-snug text-white/85 sm:max-w-sm sm:text-base sm:leading-relaxed"
        >
          {before}
          <span className="text-rose-300">{HERO.subtitleHighlight}</span>
          {after}
        </motion.p>

        <motion.ul
          variants={item}
          className="mt-5 flex flex-col items-start gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2"
        >
          {HERO.indicators.map((ind) => {
            const Icon = ICONS[ind.icon as keyof typeof ICONS];
            return (
              <li
                key={ind.label}
                className="flex items-center gap-1.5 font-body text-[10.5px] font-light text-white/90 sm:gap-2 sm:text-[12.5px]"
              >
                <Icon size={13} strokeWidth={1.5} className="shrink-0 text-rose-200" />
                {ind.label}
              </li>
            );
          })}
        </motion.ul>

        <motion.div variants={item} className="mt-6 w-full sm:max-w-md">
          <CTAButton />
        </motion.div>

        <motion.p variants={item} className="mt-3 font-body text-[11px] font-light text-white/70 sm:text-[12px]">
          {HERO.caption}{" "}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-300 underline underline-offset-2 hover:text-rose-200"
          >
            {HERO.captionLink}
          </a>
        </motion.p>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <svg viewBox="0 0 400 44" preserveAspectRatio="none" className="block h-9 w-full sm:h-12 lg:h-16">
          <path d="M0,22 C90,44 160,4 240,14 C310,23 350,6 400,16 L400,44 L0,44 Z" fill="#F6F1EB" />
        </svg>
      </div>
    </section>
  );
}