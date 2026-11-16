import { TESTIMONIALS } from "../../data/site";
import avatar1 from "../../assets/testimonials/avatar-1.webp";
import avatar2 from "../../assets/testimonials/avatar-2.webp";
import avatar3 from "../../assets/testimonials/avatar-3.webp";

const AVATARS = [avatar1, avatar2, avatar3];

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="container-page py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="depoimentos-title"
          className="mt-4 font-display text-[2.125rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.4rem]">
          A experiência de quem já passou por aqui.
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className="m-0 flex min-w-0 flex-col rounded-3xl border border-rose-200/70 bg-cream-soft p-6 text-left shadow-card lg:p-7"
          >
            <blockquote className="font-body text-base font-normal leading-[1.65] text-ink lg:text-[17px]">
              <p>“{t.text}”</p>
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-6">
              <img
                src={AVATARS[i % AVATARS.length]}
                alt=""
                width={144}
                height={144}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white"
              />
              <span className="min-w-0 break-words font-display text-2xl leading-tight text-ink">
                {t.name}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
