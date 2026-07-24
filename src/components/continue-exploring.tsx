import Link from "next/link";
import {
  articleHref,
  continueExploring,
  getArticleBySlug,
  getRelatedArticles,
  type Article,
  type ContinueExploringItem,
} from "@/content/articles";

export function ContinueExploringItemRow({
  item,
  article,
}: {
  item: Pick<ContinueExploringItem, "type" | "description">;
  article: Article;
}) {
  const href = articleHref(article.slug);

  return (
    <li className="border-t border-border/70 pt-7 first:border-t-0 first:pt-0 sm:border-t-0 sm:border-l sm:border-border/70 sm:pt-0 sm:pl-6 first:sm:border-l-0 first:sm:pl-0">
      <Link
        href={href}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <p className="text-[10px] font-normal uppercase tracking-[0.16em] text-muted/75">
          {item.type}
        </p>
        <h3 className="mt-3 text-balance font-serif text-xl tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground sm:text-[1.35rem]">
          {article.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm text-muted transition-colors duration-300 group-hover:text-foreground/80">
          Read Essay
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </Link>
    </li>
  );
}

/** Closing pathway inside the Product Tradeoff Model card. */
export function ContinueExploring() {
  const items = continueExploring
    .map((item) => {
      const article = getArticleBySlug(item.slug);
      if (!article) return null;
      return { item, article };
    })
    .filter((entry): entry is { item: ContinueExploringItem; article: Article } =>
      Boolean(entry),
    );

  return (
    <section
      aria-labelledby="continue-exploring-heading"
      className="mt-7 border-t border-border/35 pt-6 sm:mt-8 sm:pt-7"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2
          id="continue-exploring-heading"
          className="text-xs font-medium uppercase tracking-[0.14em] text-muted"
        >
          Continue Exploring
        </h2>
        <Link
          href="/writing"
          className="text-sm text-accent transition-colors hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          View all writing →
        </Link>
      </div>

      <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted sm:mt-5">
        The Product Tradeoff Model is built on decades of thinking about software
        delivery, organizational design, and leadership. These essays explore the
        ideas behind it.
      </p>

      <ul className="mt-10 grid gap-10 sm:mt-11 sm:grid-cols-3 sm:gap-0">
        {items.map(({ item, article }) => (
          <ContinueExploringItemRow
            key={article.slug}
            item={item}
            article={article}
          />
        ))}
      </ul>
    </section>
  );
}

/** Related essays on an article placeholder page. */
export function RelatedEssays({ article }: { article: Article }) {
  const related = getRelatedArticles(article);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-essays-heading"
      className="mt-16 border-t border-border pt-12 sm:mt-20 sm:pt-14"
    >
      <h2
        id="related-essays-heading"
        className="text-xs font-medium uppercase tracking-[0.14em] text-muted"
      >
        Continue Exploring
      </h2>
      <ul className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-0">
        {related.map((relatedArticle) => (
          <ContinueExploringItemRow
            key={relatedArticle.slug}
            item={{
              type: relatedArticle.category,
              description: relatedArticle.description,
            }}
            article={relatedArticle}
          />
        ))}
      </ul>
    </section>
  );
}
