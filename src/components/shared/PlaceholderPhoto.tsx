import { Camera } from "lucide-react";

interface PlaceholderPhotoProps {
  label?: string;
  ariaLabel?: string;
  className?: string;
  tone?: "light" | "deep";
  iconSize?: number;
}


export default function PlaceholderPhoto({
  label,
  ariaLabel,
  className = "",
  tone = "light",
  iconSize = 28,
}: PlaceholderPhotoProps) {
  const bg =
    tone === "light"
      ? "bg-gradient-to-br from-rose-100 via-cream-soft to-rose-200"
      : "bg-gradient-to-br from-rose-300 via-rose-400 to-rose-600";

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? label ?? "Espaço reservado para foto"}
      className={`relative overflow-hidden ${bg} ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/40">
        <Camera size={iconSize} strokeWidth={1.25} />
        {label && (
          <span className="font-body text-[11px] uppercase tracking-widest2 text-center px-4">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
