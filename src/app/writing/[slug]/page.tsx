import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { articles, getArticleBySlug } from "@/content/articles";

type WritingArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: WritingArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Essay" };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function WritingArticleRoute({
  params,
}: WritingArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Header />
      <main id="main">
        <ArticlePage article={article} />
      </main>
      <Footer />
    </>
  );
}
