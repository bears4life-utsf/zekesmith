import { articles } from "@/content/articles";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";

export function Writing() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Writing"
          id="writing-heading"
          title="Notes on product, AI, and how software gets made"
          description="Essays and drafts on operating models, AI, and the converging craft of product and engineering."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
