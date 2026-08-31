import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jacob Joseph — Research Analyst",
  description: "Tracking narratives across digital assets, macro markets, and emerging financial themes.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">

      {/* NAV */}
      <nav className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between">
        <span className="text-sm font-medium tracking-wide text-[#1A1A1A]">Jacob Joseph</span>
        <div className="flex gap-8 text-sm text-[#555]">
          <a href="#research" className="hover:text-[#1A1A1A] transition-colors">Research</a>
          <a href="#reports" className="hover:text-[#1A1A1A] transition-colors">Reports</a>
          <a href="#media" className="hover:text-[#1A1A1A] transition-colors">Media</a>
          <a href="#contact" className="hover:text-[#1A1A1A] transition-colors">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-28">
        <p className="text-sm text-[#2D4A6B] mb-6 font-medium">London</p>
        <h1
          className="text-6xl md:text-7xl font-serif leading-tight mb-6"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Tracking<br />Narratives.
        </h1>
        <p className="text-lg text-[#555] max-w-xl leading-relaxed">
          Research Analyst covering digital assets, macro markets,
          and emerging financial narratives.
        </p>
      </section>

      {/* DIVIDER */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* ABOUT */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2
          className="text-2xl font-serif mb-6"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          About
        </h2>
        <div className="space-y-4 text-[#444] leading-relaxed max-w-2xl">
          <p>
            I am a Research Analyst based in London, focused on the intersection of
            digital assets and global financial markets. My work spans on-chain data
            analysis, macro themes, and the narratives that move markets before they
            show up in prices.
          </p>
          <p>
            I publish institutional research reports, maintain data pipelines, and write
            independently on emerging trends across crypto, equities, and macro. My goal
            is to cut through noise and surface the signals that matter.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* RESEARCH */}
      <section id="research" className="max-w-3xl mx-auto px-6 py-20">
        <h2
          className="text-2xl font-serif mb-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Research
        </h2>
        <p className="text-sm text-[#888] mb-10">Personal analysis, thought pieces, and market commentary.</p>

        <div className="space-y-10">
          {/* Research Item */}
          <article className="group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-medium group-hover:text-[#2D4A6B] transition-colors mb-1">
                  Coming soon — first piece in progress
                </h3>
                <p className="text-sm text-[#888] leading-relaxed max-w-xl">
                  Placeholder for your first research piece. Replace this with a real title and excerpt.
                </p>
              </div>
              <span className="text-xs text-[#AAA] whitespace-nowrap pt-1">2025</span>
            </div>
          </article>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* REPORTS */}
      <section id="reports" className="max-w-3xl mx-auto px-6 py-20">
        <h2
          className="text-2xl font-serif mb-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Reports
        </h2>
        <p className="text-sm text-[#888] mb-10">Institutional research and monthly market reports.</p>

        <div className="space-y-10">
          <article className="group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-medium group-hover:text-[#2D4A6B] transition-colors mb-1">
                  Monthly Digital Assets Report — placeholder
                </h3>
                <p className="text-sm text-[#888] leading-relaxed max-w-xl">
                  Replace this with your most recent institutional report title and a one-line description.
                </p>
              </div>
              <span className="text-xs text-[#AAA] whitespace-nowrap pt-1">2025</span>
            </div>
          </article>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* MEDIA */}
      <section id="media" className="max-w-3xl mx-auto px-6 py-20">
        <h2
          className="text-2xl font-serif mb-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Media
        </h2>
        <p className="text-sm text-[#888] mb-10">Press mentions, quoted commentary, and interviews.</p>

        <div className="space-y-8">
          <article className="group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#2D4A6B] mb-1">Bloomberg</p>
                <h3 className="text-base font-medium group-hover:text-[#2D4A6B] transition-colors mb-1">
                  Add your Bloomberg mention here
                </h3>
                <p className="text-sm text-[#888]">Replace with article title and link.</p>
              </div>
              <span className="text-xs text-[#AAA] whitespace-nowrap pt-1">2025</span>
            </div>
          </article>

          <article className="group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#2D4A6B] mb-1">Financial Times</p>
                <h3 className="text-base font-medium group-hover:text-[#2D4A6B] transition-colors mb-1">
                  Add your FT mention here
                </h3>
                <p className="text-sm text-[#888]">Replace with article title and link.</p>
              </div>
              <span className="text-xs text-[#AAA] whitespace-nowrap pt-1">2025</span>
            </div>
          </article>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* DATA & TOOLS */}
      <section id="tools" className="max-w-3xl mx-auto px-6 py-20">
        <h2
          className="text-2xl font-serif mb-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Data & Tools
        </h2>
        <p className="text-sm text-[#888] mb-10">Open source pipelines, dashboards, and research scripts.</p>

        <div className="space-y-6">
          <a
            href="https://github.com/jacobresearch/crypto-research"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group border border-[#E0DDD8] px-5 py-4 hover:border-[#2D4A6B] transition-colors"
          >
            <div>
              <p className="text-sm font-medium group-hover:text-[#2D4A6B] transition-colors">
                crypto-research
              </p>
              <p className="text-xs text-[#888] mt-0.5">
                Data pipelines, dashboards, and research scripts
              </p>
            </div>
            <span className="text-xs text-[#AAA]">GitHub</span>
          </a>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="border-[#E0DDD8]" />
      </div>

      {/* CONTACT */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
        <h2
          className="text-2xl font-serif mb-8"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Contact
        </h2>
        <div className="flex flex-col gap-4 text-sm">
          <a
            href="https://twitter.com/jacobjoseph97"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#444] hover:text-[#2D4A6B] transition-colors"
          >
            <span className="w-16 text-[#AAA]">Twitter</span>
            <span>@jacobjoseph97</span>
          </a>
          <a
            href="https://linkedin.com/in/jacobjoseph97"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#444] hover:text-[#2D4A6B] transition-colors"
          >
            <span className="w-16 text-[#AAA]">LinkedIn</span>
            <span>@jacobjoseph97</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-[#E0DDD8]">
        <p className="text-xs text-[#AAA]">
          © {new Date().getFullYear()} Jacob Joseph. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
