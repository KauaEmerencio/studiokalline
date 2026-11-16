import { motion } from "framer-motion";
import { CalendarHeart, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "../../data/site";

interface CTAButtonProps {
  label?: string;
  size?: "large" | "regular";
  className?: string;
  variant?: "gradient" | "solid";
  animated?: boolean;
}

export default function CTAButton({
  label = "AGENDAR MEU HORÁRIO",
  size = "large",
  className = "",
  variant = "gradient",
  animated = true,
}: CTAButtonProps) {
  const sizing =
    variant === "solid"
      ? "min-h-12 px-4 py-3 text-sm"
      : size === "large"
      ? "h-14 sm:h-16 text-[11.5px] sm:text-[13px] px-6 tracking-[0.18em]"
      : "h-12 text-[11px] px-5 tracking-[0.18em]";
  const theme = variant === "solid"
    ? "gap-2 bg-rose-700 text-white hover:bg-rose-600"
    : "bg-rose-gradient uppercase text-white shadow-soft";

  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={animated ? { scale: 1.015 } : undefined}
      whileTap={animated ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-full font-body font-medium ${theme} ${sizing} ${className}`}
    >
      {variant === "gradient" && <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-full" />}
      <CalendarHeart size={16} strokeWidth={1.6} className="relative shrink-0" />
      <span className="relative mx-auto">{label}</span>
      <ArrowRight size={16} strokeWidth={1.6} className="relative shrink-0" />
    </motion.a>
  );
}
