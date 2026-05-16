"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { cn, formatCurrency, formatCurrencyCompact, formatCompetencia } from "@/lib/utils";
import { agruparPorPeriodo, resumoAnual, type Periodo, type PeriodoAgrupado } from "@/lib/analytics";
import { EvolucaoChart } from "./evolucao-chart";
import type { DREMes } from "@/lib/mock-data";

type DREDetalhe = typeof import("@/lib/mock-data").DRE_DETALHE;
type Balanco = typeof import("@/lib/mock-data").BALANCO;

type Props = {
  dreDetalhe: DREDetalhe;
  dreMeses: DREMes[];
  balanco: Balanco;
};

const ABAS = [
  { id: "dre", label: "DRE" },
  { id: "historico", label: "Análise" },
  { id: "balanco", label: "Balanço" },
];

const PERIODOS: { id: Periodo; label: string }[] = [
  { id: "mensal", label: "Mensal" },
  { id: "trimestral", label: "Trimestral" },
  { id: "anual", label: "Anual" },
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

function Variacao({ valor }: { valor?: number }) {
  if (valor === undefined) return <span className="text-text-muted text-xs">—</span>;
  const pos = valor >= 0;
  const Icon = Math.abs(valor) < 0.1 ? Minus : pos ? TrendingUp : TrendingDown;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
      pos ? "text-success" : "text-error")}>
      <Icon className="w-3 h-3 flex-shrink-0" />
      {pos ? "+" : ""}{valor.toFixed(1)}%
    </span>
  );
}

function CelulaMetrica({ valor, variacao, destaque }: { valor: number; variacao?: number; destaque?: boolean }) {
  const negativo = valor < 0;
  return (
    <td className={cn("text-right py-2.5 px-3 align-top", destaque ? "bg-primary-light/40" : "")}>
      <p className={cn("text-sm tabular-nums font-medium",
        negativo ? "text-error" : destaque ? "text-primary font-semibold" : "text-text")}>
        {formatCurrencyCompact(valor)}
      </p>
      {variacao !== undefined && (
        <div className="mt-0.5">
          <Variacao valor={variacao} />
        </div>
      )}
    </td>
  );
}

function LinhaIndicador({ label, campo, dados, isDestaque }: {
  label: string;
  campo: keyof PeriodoAgrupado;
  dados: PeriodoAgrupado[];
  isDestaque?: boolean;
}) {
  return (
    <tr className={cn("border-b border-border last:border-0", isDestaque ? "bg-surface" : "")}>
      <td className={cn("py-2.5 px-3 text-sm sticky left-0 z-10",
        isDestaque ? "font-semibold text-text bg-surface" : "text-text-muted bg-white")}>
        {label}
      </td>
      {dados.map((d, i) => {
        const valor = d[campo] as number;
        const variacaoKey = campo === "receita" ? "varReceita"
          : campo === "ebitda" ? "varEbitda"
          : campo === "lucroLiquido" ? "varLucroLiquido"
          : undefined;
        const variacao = variacaoKey ? d[variacaoKey as keyof PeriodoAgrupado] as number | undefined : undefined;
        return (
          <CelulaMetrica key={d.periodoKey} valor={valor} variacao={i > 0 ? variacao : undefined} destaque={isDestaque} />
        );
      })}
    </tr>
  );
}

function LinhaMargem({ label, campo, dados }: {
  label: string;
  campo: "margemEbitda" | "margemLiquida";
  dados: PeriodoAgrupado[];
}) {
  return (
    <tr className="border-b border-border last:border-0 bg-surface/50">
      <td className="py-2 px-3 text-xs text-text-muted sticky left-0 z-10 bg-surface/50">{label}</td>
      {dados.map((d) => {
        const valor = d[campo];
        return (
          <td key={d.periodoKey} className="text-right py-2 px-3">
            <span className={cn("text-xs font-medium tabular-nums", valor < 0 ? "text-error" : "text-text-muted")}>
              {valor.toFixed(1)}%
            </span>
          </td>
        );
      })}
    </tr>
  );
}

export function RelatoriosTabs({ dreDetalhe, dreMeses, balanco }: Props) {
  const [aba, setAba] = useState("dre");
  const [periodo, setPeriodo] = useState<Periodo>("mensal");

  const dadosAgrupados = agruparPorPeriodo(dreMeses, periodo);
  // No mensal, mostrar apenas os últimos 12 meses por padrão
  const dadosExibidos = periodo === "mensal" ? dadosAgrupados.slice(-12) : dadosAgrupados;

  const resumo2024 = resumoAnual(dreMeses, 2024);
  const resumo2025 = resumoAnual(dreMeses, 2025);
  const crescimentoReceita = ((resumo2025.receita - resumo2024.receita) / resumo2024.receita) * 100;
  const crescimentoEbitda = ((resumo2025.ebitda - resumo2024.ebitda) / resumo2024.ebitda) * 100;

  return (
    <div>
      {/* Abas */}
      <div className="flex border-b border-border mb-4 md:mb-6 overflow-x-auto scrollbar-none">
        {ABAS.map((a) => (
          <button key={a.id} onClick={() => setAba(a.id)}
            className={cn("px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap flex-shrink-0 transition-colors",
              aba === a.id ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text")}>
            {a.label}
          </button>
        ))}
      </div>

      {/* ── DRE do mês ─────────────────────────────────────────────────────── */}
      {aba === "dre" && (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-4 md:px-5 py-3 border-b border-border flex items-center justify-between">
            <p className="text-sm font-semibold text-text">
              {formatCompetencia(dreDetalhe.competencia)}
            </p>
            {dreDetalhe.grupos.find(g => g.natureza === "resultado") && (
              <span className="text-xs text-text-muted">
                Lucro líquido:{" "}
                <span className="font-semibold text-primary">
                  {formatCurrency(dreDetalhe.grupos.find(g => g.natureza === "resultado")!.total)}
                </span>
              </span>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-border">
            {dreDetalhe.grupos.map((grupo) => (
              <div key={grupo.nome} className={cn("px-4 py-3", NATUREZA_BG[grupo.natureza] ?? "")}>
                <div className="flex justify-between items-start gap-2">
                  <p className={cn("text-sm", NATUREZA_COLOR[grupo.natureza])}>{grupo.nome}</p>
                  <p className={cn("text-sm tabular-nums flex-shrink-0", NATUREZA_COLOR[grupo.natureza])}>
                    {formatCurrency(Math.abs(grupo.total))}
                  </p>
                </div>
                {grupo.contas.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {grupo.contas.map((conta) => (
                      <div key={conta.codigo} className="flex justify-between pl-3">
                        <p className="text-xs text-text-muted">{conta.nome}</p>
                        <p className="text-xs text-text-muted tabular-nums">{formatCurrency(Math.abs(conta.valor))}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop */}
          <table className="hidden md:table w-full">
            <thead>
              <tr className="bg-surface">
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider w-24">Código</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Conta</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider w-40">Valor</th>
              </tr>
            </thead>
            <tbody>
              {dreDetalhe.grupos.map((grupo) => (
                <>
                  <tr key={grupo.nome} className={cn("border-b border-border", NATUREZA_BG[grupo.natureza] ?? "")}>
                    <td className="px-5 py-3 text-text-muted text-xs">—</td>
                    <td className={cn("px-5 py-3 font-semibold", NATUREZA_COLOR[grupo.natureza])}>{grupo.nome}</td>
                    <td className={cn("px-5 py-3 text-right tabular-nums", NATUREZA_COLOR[grupo.natureza])}>
                      {formatCurrency(Math.abs(grupo.total))}
                    </td>
                  </tr>
                  {grupo.contas.map((conta) => (
                    <tr key={conta.codigo} className="border-b border-border last:border-0">
                      <td className="px-5 py-2.5 text-text-muted text-xs">{conta.codigo}</td>
                      <td className="px-5 py-2.5 pl-10 text-sm text-text-muted">{conta.nome}</td>
                      <td className="px-5 py-2.5 text-right tabular-nums text-sm text-text-muted">
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

      {/* ── Análise histórica ──────────────────────────────────────────────── */}
      {aba === "historico" && (
        <div className="space-y-4">
          {/* Cards de resumo anual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Receita 2024 × 2025", valor2024: resumo2024.receita, valor2025: resumo2025.receita, var: crescimentoReceita },
              { label: "EBITDA 2024 × 2025", valor2024: resumo2024.ebitda, valor2025: resumo2025.ebitda, var: crescimentoEbitda },
              { label: "Meses com EBITDA negativo", valor2024: resumo2024.mesesNegativos, valor2025: resumo2025.mesesNegativos, isContagem: true },
            ].map((card) => (
              <div key={card.label} className="bg-white border border-border rounded-lg p-4">
                <p className="text-xs text-text-muted mb-3">{card.label}</p>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">2024</p>
                    <p className="text-base font-semibold text-text">
                      {card.isContagem ? `${card.valor2024} mês${card.valor2024 !== 1 ? "es" : ""}` : formatCurrencyCompact(card.valor2024 as number)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted mb-0.5">2025</p>
                    <p className="text-base font-semibold text-primary">
                      {card.isContagem ? `${card.valor2025} mês${card.valor2025 !== 1 ? "es" : ""}` : formatCurrencyCompact(card.valor2025 as number)}
                    </p>
                  </div>
                  {!card.isContagem && card.var !== undefined && (
                    <div className="text-right">
                      <p className="text-xs text-text-muted mb-0.5">Var.</p>
                      <Variacao valor={card.var} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Toggle de período */}
          <div className="bg-white border border-border rounded-lg p-4 md:p-5">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-text">Evolução Financeira</h3>
                <p className="text-xs text-text-muted">Jan/2024 – Dez/2025</p>
              </div>
              <div className="flex bg-surface border border-border rounded-md p-0.5">
                {PERIODOS.map((p) => (
                  <button key={p.id} onClick={() => setPeriodo(p.id)}
                    className={cn("px-3 py-1.5 text-xs font-medium rounded transition-colors",
                      periodo === p.id ? "bg-white text-text shadow-sm border border-border" : "text-text-muted hover:text-text")}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <EvolucaoChart dados={dadosExibidos} periodo={periodo} />
          </div>

          {/* Tabela comparativa */}
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <p className="text-sm font-semibold text-text">Comparativo por período</p>
              {dadosExibidos.some(d => d.temNegativo) && (
                <span className="inline-flex items-center gap-1 text-xs text-warning bg-yellow-50 border border-yellow-100 px-2 py-0.5 rounded">
                  <AlertTriangle className="w-3 h-3" />
                  Contém períodos negativos
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: Math.max(500, dadosExibidos.length * 90 + 150) }}>
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="text-left py-2.5 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider sticky left-0 z-10 bg-surface min-w-[130px]">
                      Indicador
                    </th>
                    {dadosExibidos.map((d) => (
                      <th key={d.periodoKey} className={cn(
                        "text-right py-2.5 px-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap min-w-[90px]",
                        d.temNegativo ? "text-error" : "text-text-muted"
                      )}>
                        {d.label}
                        {d.temNegativo && <span className="block text-[10px] font-normal normal-case tracking-normal text-error/70">negativo</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <LinhaIndicador label="Receita" campo="receita" dados={dadosExibidos} />
                  <LinhaIndicador label="Custo dos Serviços" campo="cmv" dados={dadosExibidos} />
                  <LinhaIndicador label="Lucro Bruto" campo="lucroBruto" dados={dadosExibidos} isDestaque />
                  <LinhaIndicador label="Despesas Operacionais" campo="despesasOp" dados={dadosExibidos} />
                  <LinhaIndicador label="EBITDA" campo="ebitda" dados={dadosExibidos} isDestaque />
                  <LinhaMargem label="Margem EBITDA" campo="margemEbitda" dados={dadosExibidos} />
                  <LinhaIndicador label="Impostos" campo="impostos" dados={dadosExibidos} />
                  <LinhaIndicador label="Lucro Líquido" campo="lucroLiquido" dados={dadosExibidos} isDestaque />
                  <LinhaMargem label="Margem Líquida" campo="margemLiquida" dados={dadosExibidos} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Balanço ────────────────────────────────────────────────────────── */}
      {aba === "balanco" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {[
            { titulo: "Ativo", total: balanco.ativo.total, grupos: balanco.ativo.grupos, totalClass: "text-success" },
            { titulo: "Passivo + PL", total: balanco.passivo.total, grupos: balanco.passivo.grupos, totalClass: "text-text" },
          ].map((lado) => (
            <div key={lado.titulo} className="bg-white border border-border rounded-lg overflow-hidden">
              <div className="px-4 md:px-5 py-3 border-b border-border flex justify-between items-center">
                <p className="text-sm font-semibold text-text">{lado.titulo}</p>
                <p className={cn("text-sm font-semibold", lado.totalClass)}>{formatCurrency(lado.total)}</p>
              </div>
              <div className="divide-y divide-border">
                {lado.grupos.map((grupo) => (
                  <div key={grupo.nome}>
                    <div className="px-4 py-2.5 bg-surface flex justify-between">
                      <p className="text-xs font-semibold text-text uppercase tracking-wider">{grupo.nome}</p>
                      <p className="text-xs font-semibold text-text tabular-nums">{formatCurrency(grupo.total)}</p>
                    </div>
                    {grupo.contas.map((conta) => (
                      <div key={conta.codigo} className="px-4 py-2 flex justify-between items-center">
                        <p className="text-xs text-text-muted pl-3">{conta.nome}</p>
                        <p className="text-xs text-text-muted tabular-nums">{formatCurrency(conta.valor)}</p>
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
