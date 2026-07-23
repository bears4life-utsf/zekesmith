"use client";

import { motion } from "framer-motion";
import { articles } from "@/content/articles";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";
import { useEnableMotion } from "@/lib/motion";

export function Writing() {
  const enableMotion = useEnableMotion();

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-20 sm:px-8 sm:pb-12 sm:pt-28">
        <motion.div
          initial={enableMotion ? { opacity: 1, y: 14 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <SectionHeading
            eyebrow="Writing"
            id="writing-heading"
            title="How I explain the thinking"
            description="Essays that pressure-test the same ideas — frameworks, operating models, and the tradeoffs that shape how software gets made."
          />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted/90">
            {site.writing.aside}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-7 lg:max-w-4xl">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
