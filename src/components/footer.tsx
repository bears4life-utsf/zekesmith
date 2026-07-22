import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-serif text-lg text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            Building products. Exploring AI. Thinking in systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {item.label}
            </a>
          ))}
          <p className="text-muted/80">© {year}</p>
        </div>
      </div>
    </footer>
  );
}
