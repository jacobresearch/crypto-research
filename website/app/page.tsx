import type { Metadata } from "next";
import Link from "next/link";
import { allReports, makeSlug, seriesMeta, protocolResearch } from "./reports/data";

export const metadata: Metadata = {
  title: "Jacob Joseph — Research Analyst",
};

type LatestItem = {
  key: string;
  href: string;
  category: string;
  title: string;
  summary: string;
  timestamp: number;
};

function getLatestItems(n = 5): LatestItem[] {
  const monthly: LatestItem[] = allReports().map((r) => {
    const slug = makeSlug(r.series, r.month, r.year);
    return {
      key: slug,
      href: `/reports/${slug}`,
      category: seriesMeta[r.series].label,
      title: `${r.month} ${r.year}`,
      summary: r.insight,
      timestamp: new Date(`1 ${r.month} ${r.year}`).getTime(),
    };
  });

  const protocol: LatestItem[] = protocolResearch.map((r) => ({
    key: r.slug,
    href: `/reports/${r.slug}`,
    category: "Protocol Research",
    title: r.title,
    summary:
      r.description[0].length > 140
        ? `${r.description[0].slice(0, 140)}…`
        : r.description[0],
    timestamp: new Date(`1 ${r.date}`).getTime(),
  }));

  return [...monthly, ...protocol]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, n);
}

export default function Home() {
  const latest = getLatestItems(5);

  return (
    <>
      {/* EYEBROW */}
      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10">
        <h1
          className="text-2xl mb-1"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Tracking Narratives.
        </h1>
        <p className="text-sm text-[#888]">
          Research Analyst — digital assets & macro.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* LATEST */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2
          className="text-2xl mb-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Latest
        </h2>
        <p className="text-sm text-[#888] mb-10">Most recent research and reports.</p>

        <div className="space-y-8">
          {latest.map((r) => {
            return (
              <Link key={r.key} href={r.href} className="group block">
                <p className="text-xs font-medium text-[#2D4A6B] uppercase tracking-wide mb-1">
                  {r.category}
                </p>
                <h3
                  className="text-xl mb-2 group-hover:text-[#2D4A6B] transition-colors"
                  style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                >
                  {r.title}
                </h3>
                <p className="text-sm text-[#555] leading-relaxed max-w-xl">
                  {r.summary}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
