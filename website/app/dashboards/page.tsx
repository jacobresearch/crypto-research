import type { Metadata } from "next";
import SignalChart, { type ChartSeries } from "@/components/SignalChart";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dashboards — Jacob Joseph",
};

const serif = { fontFamily: "var(--font-dm-serif), Georgia, serif" };

const API_URL = process.env.MARKET_TERMINAL_API_URL;
const HISTORY_DAYS = 180;

const SIGNAL_ORDER = [
  "yield_curve_2s10s",
  "dgs10_velocity",
  "dfii10_velocity",
  "rate_move_decomposition",
] as const;

type SignalName = (typeof SIGNAL_ORDER)[number];

const SIGNAL_TITLES: Record<SignalName, string> = {
  yield_curve_2s10s: "10Y-2Y Yield Curve",
  dgs10_velocity: "10Y Yield Velocity",
  dfii10_velocity: "10Y Real Yield Velocity",
  rate_move_decomposition: "Rate Move Decomposition",
};

type Status = "green" | "amber" | "red";

const STATUS_COLORS: Record<Status, string> = {
  green: "#3F7A52",
  amber: "#B8860B",
  red: "#B3463D",
};

const NAVY = "#2D4A6B";
const SLATE = "#8C9FAE";

type SignalPoint = {
  signal_name: string;
  date: string;
  value: number | null;
  metadata: Record<string, unknown>;
};

type ChartPoint = { date: string; value: number };

type Card = {
  valueDisplay: string;
  secondary: string;
  interpretation: string;
  status: Status;
};

function daysAgoISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function formatBps(value: number): string {
  const bps = Math.round(value * 100);
  const sign = bps > 0 ? "+" : "";
  return `${sign}${bps} bps`;
}

async function fetchJson(path: string): Promise<SignalPoint[]> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

async function fetchLatestSignals(): Promise<Record<string, SignalPoint>> {
  const rows = await fetchJson("/signals/latest");
  return Object.fromEntries(rows.map((r) => [r.signal_name, r]));
}

async function fetchSignalHistory(signalName: SignalName): Promise<ChartPoint[]> {
  const startDate = daysAgoISO(HISTORY_DAYS);
  const rows = await fetchJson(`/signals/${signalName}?start_date=${startDate}`);
  // Values are stored in percentage points; convert to bps, matching the
  // headline number above each chart (formatBps) and the decomposition chart.
  return rows
    .filter((r): r is SignalPoint & { value: number } => r.value !== null)
    .map((r) => ({ date: r.date.slice(5), value: r.value * 100 }));
}

// rate_move_decomposition's headline value (real_contribution_pct) is a ratio that
// swings wildly when the nominal 10Y move is near zero, since that's a near-zero
// denominator. Its chart plots the raw nominal/real deltas (bps) instead, which
// don't have that divide-by-near-zero problem.
async function fetchDecompositionDeltaHistory(): Promise<{
  nominal: ChartPoint[];
  real: ChartPoint[];
}> {
  const startDate = daysAgoISO(HISTORY_DAYS);
  const rows = await fetchJson(`/signals/rate_move_decomposition?start_date=${startDate}`);

  const nominal: ChartPoint[] = [];
  const real: ChartPoint[] = [];

  for (const r of rows) {
    const meta = r.metadata as {
      dgs10_delta_10d: number | null;
      dfii10_delta_10d: number | null;
    };
    const date = r.date.slice(5);
    if (meta.dgs10_delta_10d !== null && meta.dgs10_delta_10d !== undefined) {
      nominal.push({ date, value: meta.dgs10_delta_10d * 100 });
    }
    if (meta.dfii10_delta_10d !== null && meta.dfii10_delta_10d !== undefined) {
      real.push({ date, value: meta.dfii10_delta_10d * 100 });
    }
  }

  return { nominal, real };
}

function yieldCurveStatus(value: number): Status {
  if (value > 0) return "green";
  if (value > -0.2) return "amber";
  return "red";
}

function velocityStatus(percentile: number): Status {
  if (percentile < 75) return "green";
  if (percentile <= 90) return "amber";
  return "red";
}

function decompositionStatus(realContributionPct: number): Status {
  if (realContributionPct < 50) return "green";
  if (realContributionPct <= 100) return "amber";
  return "red";
}

function buildYieldCurveCard(point: SignalPoint): Card {
  const value = point.value ?? 0;
  const meta = point.metadata as { dgs10: number; dgs2: number };
  const status = yieldCurveStatus(value);

  const interpretation =
    status === "green"
      ? "The yield curve is normally sloped, with long-term rates above short-term rates."
      : status === "amber"
        ? "The curve is flattening, narrowing toward inversion."
        : "The curve is inverted, a classic recession-risk signal.";

  return {
    valueDisplay: formatBps(value),
    secondary: `10Y ${meta.dgs10?.toFixed(2)}% · 2Y ${meta.dgs2?.toFixed(2)}%`,
    interpretation,
    status,
  };
}

function buildVelocityCard(point: SignalPoint): Card {
  const value = point.value ?? 0;
  const meta = point.metadata as {
    percentile: number;
    z_score: number;
    delta_5d: number;
    delta_20d: number;
  };
  const status = velocityStatus(meta.percentile);
  const percentileText = meta.percentile?.toFixed(0);

  const interpretation =
    status === "green"
      ? `This move is within a normal historical range (${percentileText}th percentile of 10-day moves).`
      : status === "amber"
        ? `This move is elevated — in the ${percentileText}th percentile of historical 10-day moves.`
        : `This move is extreme — in the ${percentileText}th percentile of historical 10-day moves, a sharp and unusual shift.`;

  return {
    valueDisplay: `${formatBps(value)} / 10 sessions`,
    secondary: `5d ${formatBps(meta.delta_5d)} · 20d ${formatBps(meta.delta_20d)} · z ${meta.z_score?.toFixed(2)}`,
    interpretation,
    status,
  };
}

function buildDecompositionCard(point: SignalPoint): Card {
  const meta = point.metadata as {
    dgs10_delta_10d: number | null;
    dfii10_delta_10d: number | null;
    breakeven_delta_10d: number | null;
    real_contribution_pct: number | null;
    implied_breakeven: number;
  };

  if (point.value === null) {
    return {
      valueDisplay: "n/a",
      secondary: `implied breakeven ${meta.implied_breakeven?.toFixed(2)}%`,
      interpretation:
        "The nominal 10Y move over the past 10 sessions is too small for a reliable real/inflation split.",
      status: "amber",
    };
  }

  const value = point.value;
  const status = decompositionStatus(value);

  const interpretation =
    status === "green"
      ? "This move is primarily inflation-expectation driven, generally the less threatening configuration for risk assets."
      : status === "amber"
        ? "This move carries a meaningful real-yield component alongside shifting inflation expectations."
        : "This move is real-yield-led, or real yields and breakevens are moving in opposite directions — the more concerning configuration per the research.";

  return {
    valueDisplay: `${value.toFixed(0)}% real-yield-led`,
    secondary: `nominal ${formatBps(meta.dgs10_delta_10d ?? 0)} · real ${formatBps(meta.dfii10_delta_10d ?? 0)} · breakeven ${formatBps(meta.breakeven_delta_10d ?? 0)}`,
    interpretation,
    status,
  };
}

const CARD_BUILDERS: Record<SignalName, (point: SignalPoint) => Card> = {
  yield_curve_2s10s: buildYieldCurveCard,
  dgs10_velocity: buildVelocityCard,
  dfii10_velocity: buildVelocityCard,
  rate_move_decomposition: buildDecompositionCard,
};

const CHART_SIGNALS = SIGNAL_ORDER.filter(
  (name) => name !== "rate_move_decomposition",
) as Exclude<SignalName, "rate_move_decomposition">[];

export default async function DashboardsPage() {
  let latestByName: Record<string, SignalPoint> = {};
  const historyByName: Record<SignalName, ChartPoint[]> = {} as Record<SignalName, ChartPoint[]>;
  let decompositionDeltaHistory: { nominal: ChartPoint[]; real: ChartPoint[] } = {
    nominal: [],
    real: [],
  };
  let fetchError: string | null = null;

  try {
    latestByName = await fetchLatestSignals();
    const [histories, decompositionDelta] = await Promise.all([
      Promise.all(CHART_SIGNALS.map((name) => fetchSignalHistory(name))),
      fetchDecompositionDeltaHistory(),
    ]);
    CHART_SIGNALS.forEach((name, i) => {
      historyByName[name] = histories[i];
    });
    decompositionDeltaHistory = decompositionDelta;
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Unknown error fetching live signals.";
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl mb-2" style={serif}>
        Dashboards
      </h1>
      <p className="text-sm text-[#888] mb-12">
        Live data, on-chain analytics, and market dashboards.
      </p>

      {fetchError ? (
        <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
          <p className="text-sm text-[#AAA]">
            Unable to load live signals right now. Please check back shortly.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {SIGNAL_ORDER.map((name) => {
            const point = latestByName[name];
            if (!point) return null;

            const card = CARD_BUILDERS[name](point);

            const series: ChartSeries[] =
              name === "rate_move_decomposition"
                ? [
                    { label: "Nominal 10Y", color: NAVY, data: decompositionDeltaHistory.nominal },
                    { label: "Real 10Y", color: SLATE, data: decompositionDeltaHistory.real },
                  ]
                : [{ label: SIGNAL_TITLES[name], color: NAVY, data: historyByName[name] ?? [] }];

            const hasChartData = series.some((s) => s.data.length > 1);

            return (
              <div key={name} className="border border-[#E0DDD8] p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-block w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: STATUS_COLORS[card.status] }}
                      />
                      <h2 className="text-sm font-medium">{SIGNAL_TITLES[name]}</h2>
                    </div>
                    <p className="text-2xl mt-2" style={serif}>
                      {card.valueDisplay}
                    </p>
                    <p className="text-xs text-[#AAA] mt-1">{card.secondary}</p>
                  </div>
                  <span className="text-xs text-[#AAA] whitespace-nowrap pt-0.5">
                    {point.date}
                  </span>
                </div>

                <p className="text-sm text-[#555] leading-relaxed mb-4">
                  {card.interpretation}
                </p>

                {hasChartData ? (
                  <SignalChart series={series} />
                ) : (
                  <p className="text-xs text-[#AAA]">Not enough history to chart yet.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
