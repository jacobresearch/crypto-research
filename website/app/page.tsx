import type { Metadata } from "next";
import Link from "next/link";
import { allReports, makeSlug, seriesMeta } from "./reports/data";

export const metadata: Metadata = {
  title: "Jacob Joseph — Research Analyst",
};

const monthOrder = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getLatestReports(n = 3) {
  return allReports()
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
    })
    .slice(0, n);
}

export default function Home() {
  const latest = getLatestReports();

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
            const { label } = seriesMeta[r.series];
            const slug = makeSlug(r.series, r.month, r.year);
            return (
              <Link key={slug} href={`/reports/${slug}`} className="group block">
                <p className="text-xs font-medium text-[#2D4A6B] uppercase tracking-wide mb-1">
                  {label}
                </p>
                <h3
                  className="text-xl mb-2 group-hover:text-[#2D4A6B] transition-colors"
                  style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                >
                  {r.month} {r.year}
                </h3>
                <p className="text-sm text-[#555] leading-relaxed max-w-xl">
                  {r.insight}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
