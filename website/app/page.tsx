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

function getLatestReport() {
  return allReports().sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
  })[0];
}

export default function Home() {
  const latest = getLatestReport();
  const { label } = seriesMeta[latest.series];
  const slug = makeSlug(latest.series, latest.month, latest.year);

  return (
    <>
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-28">
        <h1
          className="text-6xl md:text-7xl leading-tight mb-6"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Tracking<br />Narratives.
        </h1>
        <p className="text-lg text-[#555] max-w-xl leading-relaxed">
          Research Analyst covering digital assets, macro markets, and emerging
          financial narratives.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* LATEST */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2
          className="text-2xl mb-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Latest
        </h2>
        <p className="text-sm text-[#888] mb-10">Most recent research and reports.</p>

        <Link href={`/reports/${slug}`} className="group block">
          <p className="text-xs font-medium text-[#2D4A6B] uppercase tracking-wide mb-2">
            {label}
          </p>
          <h3
            className="text-xl mb-3 group-hover:text-[#2D4A6B] transition-colors"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            {latest.month} {latest.year}
          </h3>
          <p className="text-sm text-[#555] leading-relaxed max-w-xl">
            {latest.insight}
          </p>
        </Link>
      </section>
    </>
  );
}
