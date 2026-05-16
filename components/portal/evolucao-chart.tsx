"use client";

import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";
import type { PeriodoAgrupado, Periodo } from "@/lib/analytics";
import { formatCurrencyCompact } from "@/lib/utils";

type Props = {
  dados: PeriodoAgrupado[];
  periodo: Periodo;
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as PeriodoAgrupado;
  return (
    <div className="bg-white border border-border rounded-lg p-3 shadow-sm text-xs min-w-[180px]">
      <p className="font-semibold text-text mb-2">{label}</p>
      {[
        { name: "Receita", value: d.receita, color: "#166534" },
        { name: "EBITDA", value: d.ebitda, color: d.ebitda < 0 ? "#DC2626" : "#16A34A" },
        { name: "Lucro Líq.", value: d.lucroLiquido, color: d.lucroLiquido < 0 ? "#DC2626" : "#6B7280" },
      ].map((item) => (
        <div key={item.name} className="flex justify-between gap-4 py-0.5">
          <span className="text-text-muted">{item.name}</span>
          <span className="font-semibold tabular-nums" style={{ color: item.color }}>
            {formatCurrencyCompact(item.value)}
          </span>
        </div>
      ))}
      {d.margemEbitda !== 0 && (
        <div className="border-t border-border mt-1.5 pt-1.5 flex justify-between">
          <span className="text-text-muted">Margem EBITDA</span>
          <span className={`font-semibold ${d.margemEbitda < 0 ? "text-error" : "text-success"}`}>
            {d.margemEbitda.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

export function EvolucaoChart({ dados, periodo }: Props) {
  const temNegativo = dados.some((d) => d.ebitda < 0);
  const alturaChart = 220;

  if (periodo === "anual") {
    return (
      <ResponsiveContainer width="100%" height={alturaChart}>
        <BarChart data={dados} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={40} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#E5E7EB" />
          <Bar dataKey="receita" name="Receita" fill="#166534" opacity={0.85} radius={[3, 3, 0, 0]} />
          <Bar dataKey="ebitda" name="EBITDA" radius={[3, 3, 0, 0]}>
            {dados.map((d) => (
              <Cell key={d.periodoKey} fill={d.ebitda < 0 ? "#DC2626" : "#16A34A"} opacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={alturaChart}>
      <AreaChart data={dados} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#166534" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#166534" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradEbitda" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
          interval={periodo === "mensal" ? 2 : 0}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} />
        {temNegativo && (
          <ReferenceLine y={0} stroke="#DC2626" strokeDasharray="4 2" strokeWidth={1.5} />
        )}
        <Area type="monotone" dataKey="receita" stroke="#166534" strokeWidth={2}
          fill="url(#gradReceita)" dot={false} />
        <Area type="monotone" dataKey="ebitda" stroke="#16A34A" strokeWidth={1.5}
          fill="url(#gradEbitda)" strokeDasharray="4 2" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
