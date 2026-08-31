import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards — Jacob Joseph",
};

export default function DashboardsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-4xl mb-2"
        style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
      >
        Dashboards
      </h1>
      <p className="text-sm text-[#888] mb-12">
        Live data, on-chain analytics, and market dashboards.
      </p>
      <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
        <p className="text-sm text-[#AAA]">Dashboards coming soon</p>
      </div>
    </section>
  );
}
