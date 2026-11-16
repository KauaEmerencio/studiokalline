import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import CTAButton from "../CTA/CTAButton";
import { HERO } from "../../data/site";
import heroImg from "../../assets/optimized/hero-mobile.webp";
import heroImgDesktop from "../../assets/optimized/hero-desktop.webp";

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
      {/* Foto de fundo — foto vertical no mobile, foto widescreen no desktop */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={heroImgDesktop} width={1537} height={1023} />
        <img
          src={heroImg}
          alt="Darc Kaline"
          width={302}
          height={533}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/60 via-ink/20 to-transparent lg:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-page relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-24 lg:mx-0 lg:max-w-2xl lg:justify-center lg:pb-28 lg:pl-16 lg:pt-32 xl:pl-24"
      >
        <motion.h1
          variants={item}
          className="font-display text-[2.6rem] leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          DARC
          <br />
          <span className="text-rose-300">KALINE</span>
        </motion.h1>

        <motion.span
          variants={item}
          className="mt-2 block font-body text-[11px] font-light uppercase tracking-widest2 text-rose-200/80 sm:text-xs"
        >
          Lash Designer
        </motion.span>

        <motion.p
          variants={item}
          className="mt-[30px] max-w-[16rem] font-body text-[13px] font-light leading-snug text-white/85 sm:max-w-sm sm:text-base sm:leading-relaxed"
        >
          {before}
          <span className="text-rose-300">{HERO.subtitleHighlight}</span>
          {after}
        </motion.p>

        <motion.div variants={item} className="mt-6 w-full sm:max-w-md">
          <CTAButton />
        </motion.div>

        <motion.a
          variants={item}
          href="#estilos"
          className="mt-3 flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-rose-200 bg-cream px-5 py-4 font-body text-sm font-medium leading-normal text-rose-700 transition-colors hover:bg-cream-soft focus-visible:rounded-full focus-visible:outline-cream sm:min-h-16 sm:max-w-md"
        >
          {HERO.captionLink}
          <ArrowDown size={16} strokeWidth={1.6} aria-hidden="true" className="shrink-0" />
        </motion.a>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <svg viewBox="0 0 400 44" preserveAspectRatio="none" className="block h-9 w-full sm:h-12 lg:h-16">
          <path d="M0,22 C90,44 160,4 240,14 C310,23 350,6 400,16 L400,45 L0,45 Z" fill="#F6F1EB" />
        </svg>
      </div>
    </section>
  );
}
