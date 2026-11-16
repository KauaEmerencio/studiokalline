import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { LASH_STYLES, type LashPhoto, type LashStyle } from "../../data/site";

interface LashPhotoDialogProps {
  model: LashStyle;
  onClose: () => void;
}

function GalleryImage({ photo }: { photo?: LashPhoto }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const labels = LASH_STYLES.photoDialog;
  const source = photo?.fullSrc?.trim() || photo?.src?.trim();

  if (!photo || !source) {
    return <p role="status" className="absolute inset-0 flex items-center justify-center px-6 text-center font-body text-sm leading-relaxed text-cream">{labels.errorLabel}</p>;
  }

  return (
    <>
      {status !== "loaded" && (
        <p role="status" className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center font-body text-sm leading-relaxed text-cream">
          {status === "error" ? labels.errorLabel : labels.loadingLabel}
        </p>
      )}
      <img
        src={source}
        alt={photo.alt}
        width={photo.fullWidth ?? photo.width}
        height={photo.fullHeight ?? photo.height}
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={`relative h-full w-full object-contain ${status === "loaded" ? "" : "invisible"}`}
      />
    </>
  );
}

export default function LashPhotoDialog({ model, onClose }: LashPhotoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStartedOutside = useRef(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const labels = LASH_STYLES.photoDialog;
  const titleId = `photo-dialog-${model.id}`;
  const photos = model.photos ?? [];
  const currentIndex = photoIndex >= 0 && photoIndex < photos.length ? photoIndex : 0;
  const photo = photos[currentIndex];
  const multiple = photos.length > 1;
  const counter = labels.counterLabel.replace("{current}", String(photos.length ? currentIndex + 1 : 0))
    .replace("{total}", String(photos.length));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    if (scrollbarWidth > 0) {
      root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbarWidth}px`;
    }
    root.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      if (dialog.open) dialog.close();
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    };
  }, []);

  const close = () => dialogRef.current?.close();
  const move = (direction: number) => {
    if (multiple) setPhotoIndex(index => {
      const validIndex = index >= 0 && index < photos.length ? index : 0;
      return (validIndex + direction + photos.length) % photos.length;
    });
  };
  const zoomed = () => (window.visualViewport?.scale ?? 1) > 1.01;
  const startSwipe = (event: TouchEvent<HTMLDivElement>) => {
    swipeStart.current = event.touches.length === 1 && !zoomed()
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  };
  const endSwipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || event.touches.length || event.changedTouches.length !== 1 || zoomed()) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      onClose={() => { if (!dialogRef.current?.open) onClose(); }}
      onPointerDown={(event) => { pointerStartedOutside.current = event.target === event.currentTarget; }}
      onClick={(event) => {
        if (pointerStartedOutside.current && event.target === event.currentTarget) close();
      }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "Tab") {
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])"));
          const current = controls.findIndex(control => control === document.activeElement);
          const next = current < 0 ? 0 : (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
          event.preventDefault();
          controls[next]?.focus();
        } else if (multiple && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none border-0 bg-transparent p-4 text-cream outline-none backdrop:bg-ink/90 open:flex open:items-center open:justify-center sm:p-8"
    >
      <div className="grid h-full max-h-[960px] w-full max-w-4xl grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-2xl border border-white/15 bg-ink shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
          <h2 id={titleId} className="min-w-0 font-display text-2xl leading-tight sm:text-3xl">{model.name}</h2>
          <button ref={closeRef} type="button" aria-label={labels.closeLabel} onClick={close} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-cream hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div
          className="relative min-h-0 p-2 sm:p-4"
          onTouchStart={startSwipe}
          onTouchMove={(event) => { if (event.touches.length !== 1 || zoomed()) swipeStart.current = null; }}
          onTouchEnd={endSwipe}
          onTouchCancel={() => { swipeStart.current = null; }}
        >
          <GalleryImage key={`${currentIndex}:${photo?.id ?? "missing"}:${photo?.fullSrc ?? photo?.src ?? ""}`} photo={photo} />
        </div>
        <div className="flex min-h-16 items-center justify-between gap-3 border-t border-white/10 px-4 py-2 sm:px-6">
          {multiple && (
            <button type="button" aria-label={labels.previousLabel} onClick={() => move(-1)} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/25 px-3 font-body text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200">
              <ChevronLeft size={20} aria-hidden="true" /><span className="hidden sm:inline">{labels.previousLabel}</span>
            </button>
          )}
          <p role="status" aria-live="polite" aria-atomic="true" className="flex-1 text-center font-body text-sm tabular-nums">{counter}</p>
          {multiple && (
            <button type="button" aria-label={labels.nextLabel} onClick={() => move(1)} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/25 px-3 font-body text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200">
              <span className="hidden sm:inline">{labels.nextLabel}</span><ChevronRight size={20} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
