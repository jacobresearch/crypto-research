import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — Jacob Joseph",
};

export default function ResearchPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-4xl mb-2"
        style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
      >
        Research
      </h1>
      <p className="text-sm text-[#888] mb-12">
        Personal analysis, thought pieces, and market commentary.
      </p>
      <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
        <p className="text-sm text-[#AAA]">
          Coming soon — first piece in progress
        </p>
      </div>
    </section>
  );
}
