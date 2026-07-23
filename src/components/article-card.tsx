"use client";

import { motion } from "framer-motion";
import type { Article } from "@/content/articles";
import { ArticleIllustration } from "@/components/article-illustrations";
import { scenarioHref } from "@/lib/productTradeoffEngine";
import { useEnableMotion } from "@/lib/motion";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  const enableMotion = useEnableMotion();
  const challengeLink = scenarioHref(article.relatedScenarioSlug);

  return (
    <motion.article
      id={article.id}
      initial={enableMotion ? { opacity: 1, y: 16 } : false}
      whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-soft transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-foreground/12 hover:shadow-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-[#efeee9]">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <ArticleIllustration
            kind={article.illustration}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-border bg-background-elevated/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted shadow-soft backdrop-blur-sm">
            {article.category}
          </span>
          <span className="rounded-full border border-border bg-background-elevated/80 px-2.5 py-1 text-[11px] font-medium text-muted backdrop-blur-sm">
            Draft
          </span>
        </div>
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{article.readingTime} read</span>
          <span aria-hidden="true">·</span>
          <span>Coming soon</span>
        </div>
        <h3 className="mt-3 text-balance text-xl font-medium tracking-tight text-foreground">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{article.teaser}</p>

        <div className="mt-5 border-t border-border/80 pt-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent/80">
            Explore the related challenge
          </p>
          <a
            href={challengeLink}
            onClick={(event) => {
              if (typeof window === "undefined") return;
              if (window.location.pathname !== "/" && window.location.pathname !== "") {
                return;
              }
              event.preventDefault();
              const url = new URL(challengeLink, window.location.origin);
              window.history.pushState(
                null,
                "",
                `${url.pathname}${url.search}${url.hash}`,
              );
              window.dispatchEvent(new PopStateEvent("popstate"));
              document
                .getElementById("tradeoffs")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="related-concept-chip mt-2.5 inline-flex transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open in the Tradeoff Model
          </a>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {article.relatedConcepts.map((concept) => (
              <li key={concept}>
                <span className="related-concept-chip cursor-default opacity-80">
                  {concept}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
