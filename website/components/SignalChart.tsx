"use client";

import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ChartPoint = {
  date: string;
  value: number;
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
    s.data.forEach(({ date, value }) => {
      const row = byDate.get(date) ?? { date };
      row[`v${i}`] = value;
      byDate.set(date, row);
    });
  });

  return Array.from(byDate.values()).sort((a, b) =>
    String(a.date).localeCompare(String(b.date)),
  );
}

function formatBps(value: number): string {
  return `${value.toFixed(1)} bps`;
}

export default function SignalChart({ series }: { series: ChartSeries[] }) {
  const data = mergeSeries(series);
  const showLegend = series.length > 1;

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            tickFormatter={formatBps}
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
            formatter={(value, name) => [formatBps(Number(value)), String(name)]}
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
          {series.map((s, i) => (
            <Line
              key={s.label}
              type="monotone"
              dataKey={`v${i}`}
              name={s.label}
              stroke={s.color}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
