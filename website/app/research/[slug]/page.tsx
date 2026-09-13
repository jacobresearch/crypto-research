import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../data";

const serif = { fontFamily: "var(--font-dm-serif), Georgia, serif" };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: `${article.title} — Jacob Joseph` };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <Link
        href="/research"
        className="text-xs text-[#888] hover:text-[#1A1A1A] transition-colors mb-10 inline-block"
      >
        ← Research
      </Link>

      <p className="text-xs font-medium text-[#2D4A6B] uppercase tracking-wide mb-3">
        Market Spotlight
      </p>

      <h1 className="text-4xl mb-6" style={serif}>
        {article.title}
      </h1>

      <p className="text-xs text-[#AAA] mb-10">{article.date}</p>

      <p className="text-[#444] leading-relaxed max-w-xl mb-12">
        Thought piece on {article.topics}.
      </p>

      <hr className="border-[#E0DDD8] mb-10" />

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] border border-[#1A1A1A] px-5 py-2.5 hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-colors"
      >
        Read on Medium →
      </a>
    </article>
  );
}
