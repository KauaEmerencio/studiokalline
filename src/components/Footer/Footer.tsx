import { MapPin, Clock, Mail, ChevronRight, Code2, Phone } from "lucide-react";
import { CONTACT, BOOKING_URL } from "../../data/site";
import logo from "../../assets/logo-icon-light.png";

const NAV_LINKS = [
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#galeria", label: "Galeria" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#conecte-se", label: "Contato" },
];

// Créditos de desenvolvimento — edite aqui se algum dado mudar.
const DEV = {
  name: "KL DEV TECH",
  tagline: "Desenvolvimento web com foco em performance e design.",
  email: "kauaemerencioo2@gmail.com",
  whatsapp: "https://wa.me/5579998107310",
};

function ColumnHeading({ children }: { children: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-body text-[11px] font-medium uppercase tracking-widest2 text-rose-300">
        {children}
      </h3>
      <span className="mt-2 block h-px w-6 bg-rose-400/60" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-28 pt-14 text-cream/70 sm:pb-14 lg:pt-20">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-12">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-9 w-9 object-contain" />
            <div>
              <span className="block font-display text-xl leading-none text-cream">Studio Kaline</span>
              <span className="mt-1 block font-body text-[9.5px] uppercase tracking-widest2 text-rose-300/80">
                Cílios que valorizam o seu olhar
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-xs font-body text-[12.5px] font-light leading-relaxed text-cream/50">
            Cuidado, delicadeza e atenção em cada detalhe — para você se sentir ainda mais bonita
            todos os dias.
          </p>
        </div>

        {/* Informações */}
        <div>
          <ColumnHeading>Informações</ColumnHeading>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-rose-300" />
              <a
                href={CONTACT.location}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[12.5px] font-light leading-relaxed text-cream/70 hover:text-cream"
              >
                {CONTACT.locationLabel}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-rose-300" />
              <div className="font-body text-[12.5px] font-light leading-relaxed text-cream/70">
                {CONTACT.hours.map((h) => (
                  <p key={h.days}>
                    {h.days}: {h.time}
                  </p>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-rose-300" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-body text-[12.5px] font-light leading-relaxed text-cream/70 hover:text-cream"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Navegação */}
        <div>
          <ColumnHeading>Navegação</ColumnHeading>
          <ul className="flex flex-col divide-y divide-cream/10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center justify-between py-2.5 font-body text-[13px] font-light text-cream/70 transition-colors first:pt-0 hover:text-cream"
                >
                  {link.label}
                  <ChevronRight
                    size={14}
                    strokeWidth={1.5}
                    className="text-cream/30 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-300"
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-2.5 font-body text-[13px] font-light text-rose-300 transition-colors hover:text-rose-200"
              >
                Agendar
                <ChevronRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 border-t border-cream/10 pt-6 sm:mt-14">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Code2 size={18} strokeWidth={1.5} className="hidden shrink-0 text-rose-300 sm:block" />
            <p className="font-body text-[12px] font-light leading-relaxed text-cream/50">
              Desenvolvido por{" "}
              <span className="font-medium text-cream/80">{DEV.name}</span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> — </span>
              {DEV.tagline}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`mailto:${DEV.email}`}
              className="flex items-center gap-2 font-body text-[12px] font-light text-cream/50 transition-colors hover:text-cream"
            >
              <Mail size={15} strokeWidth={1.5} className="text-rose-300" />
              {DEV.email}
            </a>
            <a
              href={DEV.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-[12px] font-light text-cream/50 transition-colors hover:text-cream"
            >
              <Phone size={15} strokeWidth={1.5} className="text-rose-300" />
              WhatsApp
            </a>
          </div>
        </div>

        <p className="mt-6 text-center font-body text-[10.5px] font-light text-cream/35">
          © {new Date().getFullYear()} Studio Kaline. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}