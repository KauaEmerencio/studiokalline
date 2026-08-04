import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarHeart, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "../../data/site";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-0"
        >
          <div className="mx-auto flex max-w-md overflow-hidden rounded-full shadow-soft">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 bg-ink py-4 font-body text-[11px] font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              <CalendarHeart size={15} strokeWidth={1.6} />
              Agendar meu horário
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 bg-rose-gradient py-4 pr-5 font-body text-[11px] font-light text-white transition-opacity hover:opacity-90"
            >
              Agende agora na agenda online!
              <ArrowRight size={14} strokeWidth={1.8} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
