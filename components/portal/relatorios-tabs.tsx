"use client";

import { useState } from "react";
import { cn, formatCurrency, formatCompetencia } from "@/lib/utils";
import type { DREMes } from "@/lib/mock-data";

type DREDetalhe = typeof import("@/lib/mock-data").DRE_DETALHE;
type Balanco = typeof import("@/lib/mock-data").BALANCO;

type Props = {
  dreDetalhe: DREDetalhe;
  dreMeses: DREMes[];
  balanco: Balanco;
};

const TABS = [
  { id: "dre", label: "DRE" },
  { id: "evolucao", label: "DRE Histórico" },
  { id: "balanco", label: "Balanço" },
];

const NATUREZA_COLOR: Record<string, string> = {
  receita: "text-success",
  custo: "text-error",
  despesa: "text-error",
  imposto: "text-warning",
  subtotal: "text-text font-semibold",
  resultado: "text-primary font-bold",
};

const NATUREZA_BG: Record<string, string> = {
  subtotal: "bg-surface",
  resultado: "bg-primary-light",
};

export function RelatoriosTabs({ dreDetalhe, dreMeses, balanco }: Props) {
  const [tab, setTab] = useState("dre");

  return (
    <div>
      {/* Tabs — scroll horizontal no mobile */}
      <div className="flex border-b border-border mb-4 md:mb-6 overflow-x-auto scrollbar-none">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap flex-shrink-0",
              tab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* DRE detalhe */}
      {tab === "dre" && (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-border">
            <p className="text-sm font-semibold text-text">
              {formatCompetencia(dreDetalhe.competencia)}
            </p>
          </div>

          {/* Mobile: cards por grupo */}
          <div className="md:hidden divide-y divide-border">
            {dreDetalhe.grupos.map((grupo) => (
              <div
                key={grupo.nome}
                className={cn("px-4 py-3", NATUREZA_BG[grupo.natureza] ?? "")}
              >
                <div className="flex justify-between items-start gap-2">
                  <p className={cn("text-sm", NATUREZA_COLOR[grupo.natureza])}>
                    {grupo.nome}
                  </p>
                  <p className={cn("text-sm tabular-nums flex-shrink-0", NATUREZA_COLOR[grupo.natureza])}>
                    {formatCurrency(Math.abs(grupo.total))}
                  </p>
                </div>
                {grupo.contas.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {grupo.contas.map((conta) => (
                      <div key={conta.codigo} className="flex justify-between items-center pl-3">
                        <p className="text-xs text-text-muted">{conta.nome}</p>
                        <p className="text-xs text-text-muted tabular-nums">
                          {formatCurrency(Math.abs(conta.valor))}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: tabela */}
          <table className="hidden md:table w-full data-table">
            <thead>
              <tr>
                <th className="w-24">Código</th>
                <th>Conta</th>
                <th className="text-right w-40">Valor</th>
              </tr>
            </thead>
            <tbody>
              {dreDetalhe.grupos.map((grupo) => (
                <>
                  <tr key={grupo.nome} className={cn(NATUREZA_BG[grupo.natureza] ?? "")}>
                    <td className="text-text-muted text-xs">—</td>
                    <td className={cn("font-semibold", NATUREZA_COLOR[grupo.natureza])}>
                      {grupo.nome}
                    </td>
                    <td className={cn("text-right tabular-nums", NATUREZA_COLOR[grupo.natureza])}>
                      {formatCurrency(Math.abs(grupo.total))}
                    </td>
                  </tr>
                  {grupo.contas.map((conta) => (
                    <tr key={conta.codigo}>
                      <td className="text-text-muted text-xs">{conta.codigo}</td>
                      <td className="pl-6 text-text-muted">{conta.nome}</td>
                      <td className="text-right tabular-nums text-text-muted">
                        {formatCurrency(Math.abs(conta.valor))}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DRE histórico */}
      {tab === "evolucao" && (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-border">
            <p className="text-sm font-semibold text-text">Jan – Jun 2024</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full data-table" style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  <th className="sticky left-0 bg-surface z-10">Indicador</th>
                  {dreMeses.map((m) => (
                    <th key={m.competencia} className="text-right whitespace-nowrap">
                      {m.mesLabel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Receita", key: "receita" as const, cor: "" },
                  { label: "Custo", key: "cmv" as const, cor: "text-error" },
                  { label: "Lucro Bruto", key: "lucroBruto" as const, cor: "font-semibold" },
                  { label: "Despesas Op.", key: "despesasOp" as const, cor: "text-error" },
                  { label: "EBITDA", key: "ebitda" as const, cor: "font-semibold" },
                  { label: "Impostos", key: "impostos" as const, cor: "text-warning" },
                  { label: "Lucro Líq.", key: "lucroLiquido" as const, cor: "font-bold text-primary" },
                ].map(({ label, key, cor }) => (
                  <tr key={key}>
                    <td className={cn("font-medium sticky left-0 bg-white z-10", cor)}>
                      {label}
                    </td>
                    {dreMeses.map((m) => (
                      <td key={m.competencia} className={cn("text-right tabular-nums whitespace-nowrap", cor)}>
                        {formatCurrency(m[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Balanço */}
      {tab === "balanco" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              titulo: "Ativo",
              total: balanco.ativo.total,
              grupos: balanco.ativo.grupos,
              totalClass: "text-success",
            },
            {
              titulo: "Passivo + PL",
              total: balanco.passivo.total,
              grupos: balanco.passivo.grupos,
              totalClass: "text-text",
            },
          ].map((lado) => (
            <div key={lado.titulo} className="bg-white border border-border rounded-lg overflow-hidden">
              <div className="px-4 md:px-5 py-3 md:py-4 border-b border-border flex justify-between items-center">
                <p className="text-sm font-semibold text-text">{lado.titulo}</p>
                <p className={cn("text-sm font-semibold", lado.totalClass)}>
                  {formatCurrency(lado.total)}
                </p>
              </div>
              <div className="divide-y divide-border">
                {lado.grupos.map((grupo) => (
                  <div key={grupo.nome}>
                    <div className="px-4 py-2.5 bg-surface flex justify-between">
                      <p className="text-xs font-semibold text-text uppercase tracking-wider">
                        {grupo.nome}
                      </p>
                      <p className="text-xs font-semibold text-text tabular-nums">
                        {formatCurrency(grupo.total)}
                      </p>
                    </div>
                    {grupo.contas.map((conta) => (
                      <div key={conta.codigo} className="px-4 py-2 flex justify-between items-center">
                        <p className="text-xs text-text-muted pl-3">{conta.nome}</p>
                        <p className="text-xs text-text-muted tabular-nums">
                          {formatCurrency(conta.valor)}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
