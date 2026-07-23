export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={className ?? "max-w-2xl"}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-pretty text-base leading-[1.7] text-muted sm:text-lg sm:leading-[1.7]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
