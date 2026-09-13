import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Jacob Joseph",
};

const experience = [
  {
    period: "Jan 2025 — Present",
    role: "Senior Research Analyst",
    org: "CoinDesk",
  },
  {
    period: "Feb 2022 — Dec 2024",
    role: "Research Analyst",
    org: "CCData",
  },
  {
    period: "Sept 2020 — Jul 2021",
    role: "President, Blockchain Society",
    org: "University of Sussex",
  },
  {
    period: "Oct 2019 — Apr 2020",
    role: "Finance Intern",
    org: "Daikin Middle East and Africa",
  },
];

const education = [
  {
    period: "2020 — 2021",
    qualification: "MSc FinTech, Risk and Investment Analysis",
    institution: "University of Sussex",
  },
  {
    period: "2015 — 2018",
    qualification: "Affiliate",
    institution: "ACCA",
  },
  {
    period: "2015 — 2018",
    qualification: "Bachelor of Commerce",
    institution: "Manipal University, Dubai",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-4xl mb-12"
        style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
      >
        About
      </h1>

      {/* BIO */}
      <section className="mb-16">
        <div className="space-y-4 text-[#444] leading-relaxed max-w-2xl">
          <p>
            Jacob Joseph is a Senior Research Analyst at CoinDesk, specialising
            in digital asset markets with nearly five years of experience in the
            space. He leads CoinDesk's monthly market reports covering
            centralized exchange dynamics, stablecoin markets, and on-chain
            data — tracking the narratives that move prices before they reach
            the mainstream.
          </p>
          <p>
            His current research focus spans tokenized assets, DeFi
            applications, and Layer-1 network dynamics, while keeping a close
            eye on the macro forces shaping crypto cycles. Beyond digital
            assets, he follows emerging sectors at the frontier of finance and
            technology — including AI, energy, FinTech, and quantum computing —
            and the ways they are converging with decentralized systems.
          </p>
          <p>
            Before CoinDesk, Jacob founded and led the Blockchain Society at
            the University of Sussex while completing his postgraduate studies
            in FinTech, Investment, and Risk Analysis.
          </p>
        </div>
      </section>

      <hr className="border-[#E0DDD8] mb-16" />

      {/* EXPERIENCE */}
      <section className="mb-16">
        <h2
          className="text-2xl mb-10"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map(({ period, role, org }) => (
            <div key={`${role}-${org}`} className="flex gap-8">
              <div className="w-44 shrink-0 pt-0.5">
                <span className="text-xs text-[#AAA]">{period}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A] mb-0.5">{role}</p>
                <p className="text-xs text-[#2D4A6B] font-medium">{org}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-[#E0DDD8] mb-16" />

      {/* EDUCATION */}
      <section className="mb-16">
        <h2
          className="text-2xl mb-10"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Education
        </h2>
        <div className="space-y-8">
          {education.map(({ period, qualification, institution }) => (
            <div key={`${qualification}-${institution}`} className="flex gap-8">
              <div className="w-44 shrink-0 pt-0.5">
                <span className="text-xs text-[#AAA]">{period}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A] mb-0.5">{qualification}</p>
                <p className="text-xs text-[#2D4A6B] font-medium">{institution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-[#E0DDD8] mb-16" />

      {/* RESUME */}
      <section className="mb-16">
        <h2
          className="text-2xl mb-6"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Resume
        </h2>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#1A1A1A] px-5 py-2.5 text-sm font-medium hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-colors"
        >
          Download Resume (PDF)
        </a>
      </section>

      <hr className="border-[#E0DDD8] mb-16" />

      {/* CONTACT */}
      <section>
        <h2
          className="text-2xl mb-8"
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
            <span className="w-20 text-[#AAA]">Twitter</span>
            <span>@jacobjoseph97</span>
          </a>
          <a
            href="https://linkedin.com/in/jacobjoseph97"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#444] hover:text-[#2D4A6B] transition-colors"
          >
            <span className="w-20 text-[#AAA]">LinkedIn</span>
            <span>@jacobjoseph97</span>
          </a>
        </div>
      </section>
    </div>
  );
}
