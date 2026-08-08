import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarHeart } from "lucide-react";
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
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full bg-ink py-4 font-body text-[11px] font-medium uppercase tracking-wide text-white shadow-soft transition-opacity hover:opacity-90"
          >
            <CalendarHeart size={15} strokeWidth={1.6} />
            Agendar meu horário
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}