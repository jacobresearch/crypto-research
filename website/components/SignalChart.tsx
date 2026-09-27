"use client";

import { useState } from "react";
import {
  Bar,
  Brush,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const NAVY = "#2D4A6B";

export type ChartPoint = {
  date: string;
  value: number;
  /** Optional secondary value for the same point (e.g. a raw-dollar figure
   * alongside a growth %) — enables the primary/alt mode toggle below. */
  altValue?: number;
};

export type ChartSeries = {
  label: string;
  color: string;
  data: ChartPoint[];
};

type MergedRow = Record<string, string | number | undefined>;

function mergeSeries(series: ChartSeries[]): MergedRow[] {
  const byDate = new Map<string, MergedRow>();

  series.forEach((s, i) => {
    s.data.forEach(({ date, value, altValue }) => {
      const row = byDate.get(date) ?? { date };
      row[`v${i}`] = value;
      if (altValue !== undefined) row[`alt${i}`] = altValue;
      byDate.set(date, row);
    });
  });

  return Array.from(byDate.values()).sort((a, b) =>
    String(a.date).localeCompare(String(b.date)),
  );
}

type Unit = "bps" | "%" | "$B";

function formatValue(value: number, unit: Unit): string {
  if (unit === "%") return `${value.toFixed(1)}%`;
  if (unit === "$B") return `$${value.toFixed(1)}B`;
  return `${value.toFixed(1)} bps`;
}

export default function SignalChart({
  series,
  unit = "bps",
  altUnit,
  primaryModeLabel = "Primary",
  altModeLabel = "Alternate",
  altChartType = "line",
  enableBrush = false,
}: {
  series: ChartSeries[];
  unit?: Unit;
  altUnit?: Unit;
  primaryModeLabel?: string;
  altModeLabel?: string;
  altChartType?: "line" | "bar";
  enableBrush?: boolean;
}) {
  const [mode, setMode] = useState<"primary" | "alt">("primary");

  const hasAlt = altUnit !== undefined && series.some((s) => s.data.some((p) => p.altValue !== undefined));
  const activeMode = hasAlt && mode === "alt" ? "alt" : "primary";
  const activeUnit = activeMode === "alt" && altUnit ? altUnit : unit;
  const dataKeyPrefix = activeMode === "alt" ? "alt" : "v";
  const showAsBar = activeMode === "alt" && altChartType === "bar";

  const data = mergeSeries(series);
  const showLegend = series.length > 1;

  return (
    <div>
      {hasAlt && (
        <div className="flex gap-4 mb-2 text-xs">
          <button
            type="button"
            onClick={() => setMode("primary")}
            className={
              activeMode === "primary"
                ? "text-[#1A1A1A] font-medium border-b border-[#2D4A6B]"
                : "text-[#AAA] hover:text-[#555] transition-colors"
            }
          >
            {primaryModeLabel}
          </button>
          <button
            type="button"
            onClick={() => setMode("alt")}
            className={
              activeMode === "alt"
                ? "text-[#1A1A1A] font-medium border-b border-[#2D4A6B]"
                : "text-[#AAA] hover:text-[#555] transition-colors"
            }
          >
            {altModeLabel}
          </button>
        </div>
      )}

      <div className={enableBrush ? "h-44 w-full" : "h-32 w-full"}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: showLegend ? 0 : 4, right: 4, bottom: 0, left: 4 }}
          >
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#AAA" }}
              axisLine={{ stroke: "#E0DDD8" }}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#AAA" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => formatValue(value, activeUnit)}
              width={62}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderColor: "#E0DDD8",
                borderRadius: 4,
                backgroundColor: "#FAFAF8",
              }}
              labelStyle={{ color: "#1A1A1A" }}
              formatter={(value, name) => [formatValue(Number(value), activeUnit), String(name)]}
            />
            {showLegend && (
              <Legend
                verticalAlign="top"
                align="right"
                height={20}
                iconType="plainline"
                iconSize={10}
                wrapperStyle={{ fontSize: 11, color: "#888" }}
              />
            )}
            {series.map((s, i) =>
              showAsBar ? (
                <Bar
                  key={s.label}
                  dataKey={`${dataKeyPrefix}${i}`}
                  name={s.label}
                  fill={s.color}
                  radius={[1, 1, 0, 0]}
                  isAnimationActive={false}
                />
              ) : (
                <Line
                  key={s.label}
                  type="monotone"
                  dataKey={`${dataKeyPrefix}${i}`}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                  connectNulls
                />
              ),
            )}
            {enableBrush && (
              <Brush
                dataKey="date"
                height={20}
                stroke={NAVY}
                fill="#F5F3EF"
                travellerWidth={8}
                tickFormatter={(value: string) => value.slice(0, 7)}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
