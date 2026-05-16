"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DREMes } from "@/lib/mock-data";
import { formatCurrencyCompact } from "@/lib/utils";

type Props = { dados: DREMes[] };

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg p-3 shadow-sm text-xs">
      <p className="font-semibold text-text mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex justify-between gap-6">
          <span className="text-text-muted">{entry.name}</span>
          <span className="font-medium" style={{ color: entry.color }}>
            {formatCurrencyCompact(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function EvolucaoChart({ dados }: Props) {
  const data = dados.map((m) => ({
    mes: m.mesLabel,
    Receita: m.receita,
    EBITDA: m.ebitda,
    "Lucro Líquido": m.lucroLiquido,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#166534" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#166534" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradEbitda" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16A34A" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="mes"
          tick={{ fontSize: 11, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="Receita"
          stroke="#166534"
          strokeWidth={2}
          fill="url(#gradReceita)"
        />
        <Area
          type="monotone"
          dataKey="EBITDA"
          stroke="#16A34A"
          strokeWidth={1.5}
          fill="url(#gradEbitda)"
          strokeDasharray="4 2"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
