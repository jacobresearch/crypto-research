import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jacob Joseph — Research Analyst",
};

function EmptyState({ label }: { label: string }) {
  return (
    <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
      <p className="text-sm text-[#AAA]">{label}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-28">
        <p className="text-sm text-[#2D4A6B] mb-6 font-medium">London</p>
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
        <p className="text-sm text-[#888] mb-10">
          Most recent research and reports.
        </p>
        <EmptyState label="Coming soon — first piece in progress" />
      </section>
    </>
  );
}
