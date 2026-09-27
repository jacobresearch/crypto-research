import type { Metadata } from "next";
import Link from "next/link";
import SignalChart, { type ChartPoint, type ChartSeries } from "@/components/SignalChart";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI Value Chain — Jacob Joseph",
};

const serif = { fontFamily: "var(--font-dm-serif), Georgia, serif" };

const API_URL = process.env.MARKET_TERMINAL_API_URL;

const NAVY = "#2D4A6B";

const COMPANIES = [
  { ticker: "MSFT", name: "Microsoft" },
  { ticker: "AMZN", name: "Amazon" },
  { ticker: "GOOGL", name: "Alphabet" },
  { ticker: "META", name: "Meta" },
  { ticker: "ORCL", name: "Oracle" },
] as const;

const AGG_CAPEX_SIGNAL = "hyperscaler_capex_growth_yoy_agg";
const AGG_REVENUE_SIGNAL = "hyperscaler_revenue_growth_yoy_agg";

type SignalPoint = {
  signal_name: string;
  date: string;
  value: number | null;
  metadata: Record<string, unknown>;
};

function capexSignalName(ticker: string) {
  return `capex_growth_yoy_${ticker.toLowerCase()}`;
}

function revenueSignalName(ticker: string) {
  return `revenue_growth_yoy_${ticker.toLowerCase()}`;
}

function formatGrowthPct(value: number | null): string {
  if (value === null) return "n/a";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

async function fetchJsonArray(path: string): Promise<SignalPoint[]> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

async function fetchLatestSignals(): Promise<Record<string, SignalPoint>> {
  const rows = await fetchJsonArray("/signals/latest");
  return Object.fromEntries(rows.map((r) => [r.signal_name, r]));
}

async function fetchCapexHistory(ticker: string): Promise<ChartPoint[]> {
  const rows = await fetchJsonArray(`/signals/${capexSignalName(ticker)}`);
  return rows
    .filter((r): r is SignalPoint & { value: number } => r.value !== null)
    .map((r) => {
      const meta = r.metadata as { current_value?: number };
      const altValue =
        typeof meta.current_value === "number" ? meta.current_value / 1e9 : undefined;
      return { date: r.date, value: r.value, altValue };
    });
}

function DashboardTabs({ active }: { active: "rates" | "ai-value-chain" }) {
  const tabs = [
    { key: "rates", href: "/dashboards", label: "Rates & Macro" },
    { key: "ai-value-chain", href: "/dashboards/ai-value-chain", label: "AI Value Chain" },
  ] as const;

  return (
    <div className="flex gap-6 text-sm mb-10">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={
            tab.key === active
              ? "text-[#1A1A1A] font-medium"
              : "text-[#555] hover:text-[#1A1A1A] transition-colors"
          }
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default async function AiValueChainPage() {
  let latestByName: Record<string, SignalPoint> = {};
  const capexHistoryByTicker: Record<string, ChartPoint[]> = {};
  let fetchError: string | null = null;

  try {
    latestByName = await fetchLatestSignals();
    const histories = await Promise.all(
      COMPANIES.map((c) => fetchCapexHistory(c.ticker)),
    );
    COMPANIES.forEach((c, i) => {
      capexHistoryByTicker[c.ticker] = histories[i];
    });
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Unknown error fetching live signals.";
  }

  const aggCapex = latestByName[AGG_CAPEX_SIGNAL];
  const aggRevenue = latestByName[AGG_REVENUE_SIGNAL];

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl mb-2" style={serif}>
        Dashboards
      </h1>
      <p className="text-sm text-[#888] mb-6">
        Live data, on-chain analytics, and market dashboards.
      </p>

      <DashboardTabs active="ai-value-chain" />

      <p className="text-sm text-[#555] leading-relaxed mb-12 max-w-xl">
        Combined AI infrastructure capital expenditure across the four largest
        US hyperscalers (Microsoft, Amazon, Google, Meta), compared
        year-over-year. Oracle tracked separately given its different scale
        and fiscal calendar.
      </p>

      {fetchError ? (
        <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
          <p className="text-sm text-[#AAA]">
            Unable to load live signals right now. Please check back shortly.
          </p>
        </div>
      ) : (
        <>
          {/* HEADLINE AGGREGATES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="border border-[#E0DDD8] p-6">
              <h2 className="text-sm font-medium text-[#2D4A6B] uppercase tracking-wide mb-3">
                Hyperscaler Capex Growth (YoY)
              </h2>
              <p className="text-4xl" style={serif}>
                {formatGrowthPct(aggCapex?.value ?? null)}
              </p>
              <p className="text-xs text-[#AAA] mt-2">
                {aggCapex ? `As of ${aggCapex.date}` : "No data available"}
              </p>
            </div>

            <div className="border border-[#E0DDD8] p-6">
              <h2 className="text-sm font-medium text-[#2D4A6B] uppercase tracking-wide mb-3">
                Hyperscaler Revenue Growth (YoY)
              </h2>
              <p className="text-4xl" style={serif}>
                {formatGrowthPct(aggRevenue?.value ?? null)}
              </p>
              <p className="text-xs text-[#AAA] mt-2">
                {aggRevenue ? `As of ${aggRevenue.date}` : "No data available"}
              </p>
            </div>
          </div>

          {/* PER-COMPANY CARDS */}
          <div className="space-y-8">
            {COMPANIES.map(({ ticker, name }) => {
              const revenuePoint = latestByName[revenueSignalName(ticker)];
              const capexPoint = latestByName[capexSignalName(ticker)];
              const asOfDate = capexPoint?.date ?? revenuePoint?.date;
              const history = capexHistoryByTicker[ticker] ?? [];

              const series: ChartSeries[] = [
                { label: `${ticker} Capex`, color: NAVY, data: history },
              ];

              return (
                <div key={ticker} className="border border-[#E0DDD8] p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        {name} <span className="text-[#AAA]">({ticker})</span>
                      </h3>
                      <div className="flex gap-8">
                        <div>
                          <p className="text-xs text-[#AAA] mb-1">Revenue YoY</p>
                          <p className="text-2xl" style={serif}>
                            {formatGrowthPct(revenuePoint?.value ?? null)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#AAA] mb-1">Capex YoY</p>
                          <p className="text-2xl" style={serif}>
                            {formatGrowthPct(capexPoint?.value ?? null)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-[#AAA] whitespace-nowrap pt-0.5">
                      {asOfDate ?? "n/a"}
                    </span>
                  </div>

                  <p className="text-xs text-[#AAA] mb-3">Capex growth (YoY), trailing history</p>

                  {history.length > 1 ? (
                    <SignalChart
                      series={series}
                      unit="%"
                      altUnit="$B"
                      primaryModeLabel="Growth %"
                      altModeLabel="Raw Capex"
                      altChartType="bar"
                      enableBrush
                    />
                  ) : (
                    <p className="text-xs text-[#AAA]">Not enough history to chart yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
