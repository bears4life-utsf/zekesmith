import Link from "next/link";
import type { Article } from "@/content/articles";
import { ArticleReadingMeta } from "@/components/article-card";
import { RelatedEssays } from "@/components/continue-exploring";

const SHARED_PLACEHOLDER =
  "This essay is currently being developed. It will explore the leadership decisions, organizational consequences, and practical tradeoffs behind this idea.";

export function ArticlePage({ article }: { article: Article }) {
  return (
    <article className="mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {article.category}
        </p>
        <h1 className="mt-5 text-balance font-serif text-3xl tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {article.title}
        </h1>
        <p className="mt-6 text-pretty text-lg leading-[1.7] text-muted">
          {article.description}
        </p>
        <div className="mt-6">
          <ArticleReadingMeta article={article} />
        </div>

        <div className="mt-12 space-y-5 border-t border-border pt-10 text-base leading-[1.75] text-foreground/90">
          <p>{SHARED_PLACEHOLDER}</p>
          <p className="text-muted">{article.placeholderNote}</p>
        </div>

        <p className="mt-10 text-sm text-muted">
          <Link
            href="/writing"
            className="text-accent transition-colors hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            ← Back to Writing
          </Link>
        </p>

        <RelatedEssays article={article} />
      </div>
    </article>
  );
}
