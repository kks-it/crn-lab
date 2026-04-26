export default function SectionTitle({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate">{description}</p> : null}
    </div>
  );
}
