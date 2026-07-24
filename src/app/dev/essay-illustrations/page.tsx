import type { Metadata } from "next";
import {
  EssayIllustration,
  essayIllustrationEntries,
  essayIllustrationTokens,
} from "@/components/essay-illustrations";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Essay illustrations (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary design-review surface for the Writing illustration system.
 * Safe to delete once illustrations are integrated into article cards.
 */
export default function EssayIllustrationsReviewPage() {
  const t = essayIllustrationTokens;

  return (
    <main id="main" className="min-h-full bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="mb-10 flex items-start justify-between gap-6 border-b border-border pb-8">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
              Dev · Design review
            </p>
            <h1 className="font-serif text-3xl tracking-tight text-balance sm:text-4xl">
              Essay illustrations
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Monochrome SVG set for Writing. Wired into article cards on
              `/writing` — keep this page for visual language review.
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-1 pt-2 font-mono text-[11px] text-muted sm:grid-cols-4">
              <div>
                <dt className="opacity-70">stroke</dt>
                <dd>{t.strokeWidth}</dd>
              </div>
              <div>
                <dt className="opacity-70">radius</dt>
                <dd>{t.cornerRadius}</dd>
              </div>
              <div>
                <dt className="opacity-70">node</dt>
                <dd>{t.nodeRadius}</dd>
              </div>
              <div>
                <dt className="opacity-70">viewBox</dt>
                <dd>
                  {t.viewBoxWidth}×{t.viewBoxHeight}
                </dd>
              </div>
            </dl>
          </div>
          <ThemeToggle />
        </header>

        <ul className="grid gap-8 sm:grid-cols-2">
          {essayIllustrationEntries.map((entry) => (
            <li key={entry.slug} className="space-y-3">
              <div className="overflow-hidden rounded-sm border border-border bg-background-elevated/40 p-4 sm:p-5">
                <EssayIllustration slug={entry.slug} className="aspect-[240/160]" />
              </div>
              <div className="space-y-1 px-0.5">
                <h2 className="text-sm font-medium tracking-tight">
                  {entry.title}
                </h2>
                <p className="text-xs text-muted">{entry.concept}</p>
                <p className="font-mono text-[10px] text-muted/80">
                  {entry.slug}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
