import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports — Jacob Joseph",
};

export default function ReportsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-4xl mb-2"
        style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
      >
        Reports
      </h1>
      <p className="text-sm text-[#888] mb-12">
        Institutional research and monthly market reports.
      </p>
      <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
        <p className="text-sm text-[#AAA]">
          Coming soon — first report in progress
        </p>
      </div>
    </section>
  );
}
