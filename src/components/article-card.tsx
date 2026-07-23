"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Article } from "@/content/articles";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      id={article.id}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-soft transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-foreground/12 hover:shadow-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-[#efeee9]">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          style={{ background: article.visual }}
          aria-hidden="true"
        />
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
      </div>
    </motion.article>
  );
}
