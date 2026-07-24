import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  featuredArticle,
  supportingArticles,
} from "@/content/articles";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Writing",
  description: site.writing.intro,
};

export default function WritingPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section
          aria-labelledby="writing-heading"
          className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-32"
        >
          <header className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {site.writing.eyebrow}
            </p>
            <h1
              id="writing-heading"
              className="mt-5 text-balance text-3xl font-medium tracking-tight text-foreground sm:mt-6 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]"
            >
              {site.writing.headline}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-[1.75] text-muted sm:mt-7 sm:text-lg sm:leading-[1.75]">
              {site.writing.intro}
            </p>
          </header>

          <div className="mt-16 sm:mt-20 lg:mt-24">
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>

          <div className="mt-14 grid gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-20 lg:gap-x-10 lg:gap-y-12">
            {supportingArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="library"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
