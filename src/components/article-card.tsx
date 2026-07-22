"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Article } from "@/content/articles";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-2xl border border-border bg-background-elevated transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          style={{ background: article.visual }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 80%, ${article.accent}40, transparent 45%)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            }}
          />
        </div>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white/85 backdrop-blur-sm">
            {article.category}
          </span>
          <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm">
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
      </div>
    </motion.article>
  );
}
