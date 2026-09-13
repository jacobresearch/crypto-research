import type { Metadata } from "next";
import Link from "next/link";
import {
  exchangeReview,
  digitalAssetManagementReview,
  stablecoinsReport,
  seriesMeta,
  makeSlug,
  type Report,
  type SeriesKey,
} from "./data";

export const metadata: Metadata = {
  title: "Reports — Jacob Joseph",
};

const serif = { fontFamily: "var(--font-dm-serif), Georgia, serif" };

const monthOrder = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function groupByYear(reports: Report[]) {
  const years = Array.from(new Set(reports.map((r) => r.year))).sort(
    (a, b) => b - a
  );
  return years.map((year) => ({
    year,
    reports: reports
      .filter((r) => r.year === year)
      .sort((a, b) => monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month)),
  }));
}

function ReportSeries({
  seriesKey,
  reports,
}: {
  seriesKey: SeriesKey;
  reports: Report[];
}) {
  const { label, description, note } = seriesMeta[seriesKey];
  const groups = groupByYear(reports);

  return (
    <section className="mb-20">
      <h2 className="text-2xl mb-1" style={serif}>
        {label}
      </h2>
      <p className="text-sm text-[#888] mb-1">{description}</p>
      {note && <p className="text-xs text-[#AAA] mb-8">{note}</p>}
      {!note && <div className="mb-8" />}

      <div className="space-y-10">
        {groups.map(({ year, reports }) => (
          <div key={year} className="flex gap-8">
            <div className="w-12 shrink-0 pt-0.5">
              <span className="text-xs text-[#AAA]">{year}</span>
            </div>
            <div className="flex-1 space-y-5">
              {reports.map((r) => (
                <div key={`${r.month}-${r.year}`}>
                  <Link
                    href={`/reports/${makeSlug(seriesKey, r.month, r.year)}`}
                    className="text-sm font-medium text-[#1A1A1A] hover:text-[#2D4A6B] transition-colors"
                  >
                    {r.month} {r.year}
                    {r.kind !== "web" && (
                      <span className="ml-2 text-[10px] uppercase tracking-wide text-[#AAA] font-normal align-middle">
                        {r.kind === "pdf" ? "PDF" : "archived"}
                      </span>
                    )}
                  </Link>
                  <p className="text-sm text-[#555] leading-relaxed mt-0.5">
                    {r.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ReportsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl mb-2" style={serif}>
        Reports
      </h1>
      <p className="text-sm text-[#888] mb-16">
        Institutional research and monthly market reports authored at CCData / CoinDesk Data since February 2022.
      </p>

      <ReportSeries seriesKey="exchange-review" reports={exchangeReview} />

      <hr className="border-[#E0DDD8] mb-20" />

      <ReportSeries
        seriesKey="digital-asset-management-review"
        reports={digitalAssetManagementReview}
      />

      <hr className="border-[#E0DDD8] mb-20" />

      <ReportSeries seriesKey="stablecoins-report" reports={stablecoinsReport} />
    </section>
  );
}
