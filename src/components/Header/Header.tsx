import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Image, Star, Phone, CalendarHeart } from "lucide-react";
import { BOOKING_URL } from "../../data/site";
import logoDark from "../../assets/logo-icon.png";
import logoLight from "../../assets/logo-icon-light.png";

const NAV_LINKS = [
  { href: "#diferenciais", label: "Diferenciais", icon: Sparkles },
  { href: "#galeria", label: "Galeria", icon: Image },
  { href: "#depoimentos", label: "Depoimentos", icon: Star },
  { href: "#conecte-se", label: "Contato", icon: Phone },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [onPhoto, setOnPhoto] = useState(true);
  const btnRef = useRef<HTMLButtonElement>(null);

 
  useEffect(() => {
    const target = document.getElementById("top");
    if (!target) {
      setOnPhoto(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setOnPhoto(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    setOpen((v) => !v);
    btnRef.current?.blur();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <a href="#top" className="flex items-center">
          <img
            src={onPhoto ? logoLight : logoDark}
            alt="Darc Kaline Lash Designer"
            className="h-8 w-auto transition-opacity duration-300 sm:h-9 lg:h-11"
          />
        </a>

        {/* desktop  */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-[13px] transition-colors ${
                onPhoto ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-rose-600"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-rose-gradient px-5 py-2.5 font-body text-[12px] font-medium uppercase tracking-wide text-white shadow-card transition-opacity hover:opacity-90"
          >
            Agendar
          </a>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <AnimatePresence>
            {onPhoto && !open && (
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-rose-gradient px-4 py-2 font-body text-[10.5px] font-medium uppercase tracking-wide text-white shadow-card"
              >
                Agendar
              </motion.a>
            )}
          </AnimatePresence>

          <button
            ref={btnRef}
            onClick={toggle}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-card backdrop-blur-sm transition-colors focus:outline-none focus-visible:outline-none ${
              onPhoto && !open
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-cream/80 text-ink hover:bg-cream"
            }`}
          >
            {open ? <X size={17} strokeWidth={1.6} /> : <Menu size={17} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="container-page pb-4 lg:hidden"
          >
            <ul className="flex flex-col divide-y divide-ink/[0.06] overflow-hidden rounded-3xl border border-ink/[0.06] bg-cream-soft/95 shadow-soft backdrop-blur-sm">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2.5 px-6 py-4 font-body text-sm text-ink-soft transition-colors hover:text-rose-600"
                  >
                    <link.icon size={15} strokeWidth={1.5} className="text-rose-400" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: NAV_LINKS.length * 0.05 }}
              >
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2.5 px-6 py-4 font-body text-sm font-medium uppercase tracking-wide text-rose-600 transition-colors hover:text-rose-700"
                >
                  <CalendarHeart size={15} strokeWidth={1.6} />
                  Agendar
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}