import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "./data";

export const metadata: Metadata = {
  title: "Research — Jacob Joseph",
};

const serif = { fontFamily: "var(--font-dm-serif), Georgia, serif" };

export default function ResearchPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl mb-2" style={serif}>
        Research
      </h1>
      <p className="text-sm text-[#888] mb-12">
        Personal analysis, thought pieces, and market commentary.
      </p>

      <div className="space-y-8">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/research/${a.slug}`}
            className="group block"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  className="text-base font-medium group-hover:text-[#2D4A6B] transition-colors mb-1"
                >
                  {a.title}
                </h2>
                <p className="text-sm text-[#888] leading-relaxed">
                  Thought piece on {a.topics}.
                </p>
              </div>
              <span className="text-xs text-[#AAA] whitespace-nowrap pt-0.5">
                {a.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
