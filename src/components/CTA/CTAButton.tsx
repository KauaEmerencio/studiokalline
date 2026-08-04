import { motion } from "framer-motion";
import { CalendarHeart, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "../../data/site";

interface CTAButtonProps {
  label?: string;
  size?: "large" | "regular";
  className?: string;
}

export default function CTAButton({
  label = "AGENDAR MEU HORÁRIO",
  size = "large",
  className = "",
}: CTAButtonProps) {
  const sizing =
    size === "large"
      ? "h-14 sm:h-16 text-[11.5px] sm:text-[13px] px-6 tracking-[0.18em]"
      : "h-12 text-[11px] px-5 tracking-[0.18em]";

  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-full bg-rose-gradient font-body font-medium uppercase text-white shadow-soft ${sizing} ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <CalendarHeart size={16} strokeWidth={1.6} className="relative shrink-0" />
      <span className="relative mx-auto">{label}</span>
      <ArrowRight size={16} strokeWidth={1.6} className="relative shrink-0" />
    </motion.a>
  );
}
