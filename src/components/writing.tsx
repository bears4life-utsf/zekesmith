"use client";

import { motion, useReducedMotion } from "framer-motion";
import { articles } from "@/content/articles";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function Writing() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-end lg:gap-16"
        >
          <SectionHeading
            eyebrow="Writing"
            id="writing-heading"
            title="Where the thinking continues"
            description="Some of these ideas eventually become essays about product, AI, leadership, and how software actually gets made."
          />
          <aside className="hidden border-t border-border pt-4 lg:block">
            <p className="text-sm leading-relaxed text-muted">
              {site.writing.aside}
            </p>
          </aside>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
