import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allReports,
  makeSlug,
  seriesMeta,
  protocolResearch,
} from "../data";

const serif = { fontFamily: "var(--font-dm-serif), Georgia, serif" };

export function generateStaticParams() {
  return [
    ...allReports().map((r) => ({ slug: makeSlug(r.series, r.month, r.year) })),
    ...protocolResearch.map((r) => ({ slug: r.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const monthly = allReports().find(
    (r) => makeSlug(r.series, r.month, r.year) === slug
  );
  if (monthly) {
    const { label } = seriesMeta[monthly.series];
    return { title: `${label} — ${monthly.month} ${monthly.year} — Jacob Joseph` };
  }
  const protocol = protocolResearch.find((r) => r.slug === slug);
  if (protocol) return { title: `${protocol.title} — Jacob Joseph` };
  return {};
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Protocol research
  const protocol = protocolResearch.find((r) => r.slug === slug);
  if (protocol) {
    return (
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/reports"
          className="text-xs text-[#888] hover:text-[#1A1A1A] transition-colors mb-10 inline-block"
        >
          ← Reports
        </Link>

        <p className="text-xs font-medium text-[#2D4A6B] uppercase tracking-wide mb-3">
          Protocol Research
        </p>

        <h1 className="text-4xl mb-4" style={serif}>
          {protocol.title}
        </h1>

        <p className="text-xs text-[#AAA] mb-12">{protocol.date}</p>

        <div className="space-y-4 text-[#444] leading-relaxed max-w-xl mb-12">
          {protocol.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <hr className="border-[#E0DDD8] mb-10" />

        <a
          href={protocol.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] border border-[#1A1A1A] px-5 py-2.5 hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-colors"
        >
          Read Report →
        </a>
      </article>
    );
  }

  // Monthly series report
  const report = allReports().find(
    (r) => makeSlug(r.series, r.month, r.year) === slug
  );
  if (!report) notFound();

  const { label } = seriesMeta[report.series];

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <Link
        href="/reports"
        className="text-xs text-[#888] hover:text-[#1A1A1A] transition-colors mb-10 inline-block"
      >
        ← Reports
      </Link>

      <p className="text-xs font-medium text-[#2D4A6B] uppercase tracking-wide mb-3">
        {label}
      </p>

      <h1 className="text-4xl mb-10" style={serif}>
        {report.month} {report.year}
      </h1>

      <p className="text-[#444] leading-relaxed text-base max-w-xl mb-12">
        {report.insight}
      </p>

      <hr className="border-[#E0DDD8] mb-10" />

      <a
        href={report.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] border border-[#1A1A1A] px-5 py-2.5 hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-colors"
      >
        Read Report →
      </a>

      {report.kind !== "web" && (
        <p className="text-xs text-[#AAA] mt-4">
          {report.kind === "pdf"
            ? "This edition is hosted as a PDF on the legacy CryptoCompare domain."
            : "This edition is hosted as an archived Medium post."}
        </p>
      )}
    </article>
  );
}
