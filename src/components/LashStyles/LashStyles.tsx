import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { LASH_STYLES, type LashStyle } from "../../data/site";
import CTAButton from "../CTA/CTAButton";
import Reveal from "../shared/Reveal";
import LashPhotoDialog from "./LashPhotoDialog";

export default function LashStyles() {
  const [selectedModel, setSelectedModel] = useState<LashStyle | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section
      id="estilos"
      aria-labelledby="estilos-title"
      className="container-page py-12 sm:py-20 lg:py-24"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="estilos-title" className="section-title">
          {LASH_STYLES.title}
        </h2>
        <p className="body-copy mt-4">{LASH_STYLES.subtitle}</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-4">
        {LASH_STYLES.models.map((model, index) => {
          const cover = model.photos[0];
          const count = model.photos.length;
          const labels = LASH_STYLES.photoDialog;
          const openLabel = (count === 1 ? labels.singleOpenLabel : labels.openLabel)
            .replace("{name}", model.name).replace("{count}", String(count));
          const cardLabel = count === 1 ? labels.singleCardLabel : labels.cardLabel.replace("{count}", String(count));

          return (
          <Reveal key={model.id} delay={index * 0.08}>
            <article className="h-full overflow-hidden rounded-2xl border border-ink/5 bg-cream-soft shadow-card sm:rounded-3xl">
              <div className="aspect-[4/3] w-full bg-white">
                {cover?.src.trim() && (
                  <button
                    type="button"
                    aria-label={openLabel}
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setSelectedModel(model);
                    }}
                    className="group relative block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-rose-700"
                  >
                    <img
                      src={cover.src}
                      srcSet={cover.srcSet}
                      sizes="(min-width: 1180px) 255px, (min-width: 1024px) calc((100vw - 160px) / 4), (min-width: 768px) calc((100vw - 92px) / 2), (min-width: 640px) calc(100vw - 66px), calc(100vw - 50px)"
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: cover.objectPosition }}
                      className="h-full w-full object-cover"
                    />
                    <span aria-hidden="true" className="absolute bottom-3 right-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-cream/95 px-3 font-body text-xs font-medium text-ink shadow-card group-hover:bg-rose-50">
                      <ZoomIn size={18} strokeWidth={1.75} />
                      {cardLabel}
                    </span>
                  </button>
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {model.name}
                </h3>
                <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink-soft">
                  {model.description}
                </p>
              </div>
            </article>
          </Reveal>
          );
        })}
      </div>

      <Reveal className="mx-auto mt-8 max-w-sm sm:mt-10">
        <CTAButton label={LASH_STYLES.bookingLabel} />
      </Reveal>
      {selectedModel && (
        <LashPhotoDialog
          key={selectedModel.id}
          model={selectedModel}
          onClose={() => {
            setSelectedModel(null);
            openerRef.current?.focus({ preventScroll: true });
          }}
        />
      )}
    </section>
  );
}
