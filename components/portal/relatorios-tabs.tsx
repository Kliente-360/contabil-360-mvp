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
  { id: "balanco", label: "Balanço Patrimonial" },
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
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
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
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-semibold text-text">
              Demonstrativo de Resultado — {formatCompetencia(dreDetalhe.competencia)}
            </p>
          </div>
          <table className="w-full data-table">
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
                  <tr
                    key={grupo.nome}
                    className={cn(NATUREZA_BG[grupo.natureza] ?? "")}
                  >
                    <td className="text-text-muted text-xs">—</td>
                    <td
                      className={cn(
                        "font-semibold",
                        NATUREZA_COLOR[grupo.natureza]
                      )}
                    >
                      {grupo.nome}
                    </td>
                    <td
                      className={cn(
                        "text-right tabular-nums",
                        NATUREZA_COLOR[grupo.natureza]
                      )}
                    >
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
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-semibold text-text">
              DRE Comparativo — Jan a Jun 2024
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Indicador</th>
                  {dreMeses.map((m) => (
                    <th key={m.competencia} className="text-right">{m.mesLabel}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Receita", key: "receita" as const, cor: "" },
                  { label: "Custo dos Serviços", key: "cmv" as const, cor: "text-error" },
                  { label: "Lucro Bruto", key: "lucroBruto" as const, cor: "font-semibold" },
                  { label: "Despesas Operacionais", key: "despesasOp" as const, cor: "text-error" },
                  { label: "EBITDA", key: "ebitda" as const, cor: "font-semibold" },
                  { label: "Impostos", key: "impostos" as const, cor: "text-warning" },
                  { label: "Lucro Líquido", key: "lucroLiquido" as const, cor: "font-bold text-primary" },
                ].map(({ label, key, cor }) => (
                  <tr key={key}>
                    <td className={cn("font-medium", cor)}>{label}</td>
                    {dreMeses.map((m) => (
                      <td key={m.competencia} className={cn("text-right tabular-nums", cor)}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ativo */}
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center">
              <p className="text-sm font-semibold text-text">Ativo</p>
              <p className="text-sm font-semibold text-success">
                {formatCurrency(balanco.ativo.total)}
              </p>
            </div>
            <table className="w-full data-table">
              <tbody>
                {balanco.ativo.grupos.map((grupo) => (
                  <>
                    <tr key={grupo.nome} className="bg-surface">
                      <td colSpan={2} className="font-semibold text-text text-xs uppercase tracking-wider">
                        {grupo.nome}
                      </td>
                      <td className="text-right font-semibold tabular-nums">
                        {formatCurrency(grupo.total)}
                      </td>
                    </tr>
                    {grupo.contas.map((conta) => (
                      <tr key={conta.codigo}>
                        <td className="text-text-muted text-xs w-20">{conta.codigo}</td>
                        <td className="pl-4 text-text-muted">{conta.nome}</td>
                        <td className="text-right tabular-nums text-text-muted">
                          {formatCurrency(conta.valor)}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Passivo */}
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center">
              <p className="text-sm font-semibold text-text">Passivo + PL</p>
              <p className="text-sm font-semibold text-text">
                {formatCurrency(balanco.passivo.total)}
              </p>
            </div>
            <table className="w-full data-table">
              <tbody>
                {balanco.passivo.grupos.map((grupo) => (
                  <>
                    <tr key={grupo.nome} className="bg-surface">
                      <td colSpan={2} className="font-semibold text-text text-xs uppercase tracking-wider">
                        {grupo.nome}
                      </td>
                      <td className="text-right font-semibold tabular-nums">
                        {formatCurrency(grupo.total)}
                      </td>
                    </tr>
                    {grupo.contas.map((conta) => (
                      <tr key={conta.codigo}>
                        <td className="text-text-muted text-xs w-20">{conta.codigo}</td>
                        <td className="pl-4 text-text-muted">{conta.nome}</td>
                        <td className="text-right tabular-nums text-text-muted">
                          {formatCurrency(conta.valor)}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
