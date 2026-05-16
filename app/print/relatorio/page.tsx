"use client";

import { useEffect } from "react";
import { DRE_MESES, BALANCO, CLIENTE, ESCRITORIO } from "@/lib/mock-data";
import { resumoAnual } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";

function pct(val: number, total: number) {
  if (total === 0) return "0,0%";
  return ((val / total) * 100).toFixed(1).replace(".", ",") + "%";
}

function fmt(val: number) {
  return formatCurrency(val);
}

function Variacao({ atual, anterior }: { atual: number; anterior: number }) {
  if (anterior === 0) return null;
  const v = ((atual - anterior) / Math.abs(anterior)) * 100;
  const positivo = v >= 0;
  return (
    <span
      className="text-xs font-medium ml-2"
      style={{ color: positivo ? "#166534" : "#DC2626" }}
    >
      {positivo ? "+" : ""}
      {v.toFixed(1).replace(".", ",")}%
    </span>
  );
}

export default function PrintRelatorio() {
  const r2024 = resumoAnual(DRE_MESES, 2024);
  const r2025 = resumoAnual(DRE_MESES, 2025);
  const hoje = new Date();
  const dataGeracao = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, []);

  const linhasDRE = [
    { label: "Receita Bruta", v24: r2024.receita, v25: r2025.receita, bold: false },
    { label: "CMV / CSP", v24: r2024.cmv, v25: r2025.cmv, bold: false },
    { label: "Lucro Bruto", v24: r2024.lucroBruto, v25: r2025.lucroBruto, bold: true },
    { label: "Despesas Operacionais", v24: r2024.despesasOp, v25: r2025.despesasOp, bold: false },
    { label: "EBITDA", v24: r2024.ebitda, v25: r2025.ebitda, bold: true },
    { label: "Impostos (Simples Nacional)", v24: r2024.impostos, v25: r2025.impostos, bold: false },
    { label: "Lucro Líquido", v24: r2024.lucroLiquido, v25: r2025.lucroLiquido, bold: true },
  ];

  return (
    <div className="print-page">
      {/* ── HEADER ── */}
      <div className="print-header">
        <div>
          <div className="brand">Contabil 360</div>
          <div className="brand-sub">Relatório Financeiro Executivo</div>
        </div>
        <div className="header-right">
          <div className="empresa-nome">{CLIENTE.razaoSocial}</div>
          <div className="empresa-sub">
            CNPJ {CLIENTE.cnpj} · {CLIENTE.regimeTributario}
          </div>
          <div className="empresa-sub">
            Exercício 2025 · Gerado em {dataGeracao}
          </div>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="kpi-grid">
        {[
          {
            label: "Receita 2025",
            valor: fmt(r2025.receita),
            ant: r2024.receita,
            atual: r2025.receita,
            sub: "vs. 2024",
          },
          {
            label: "EBITDA 2025",
            valor: fmt(r2025.ebitda),
            ant: r2024.ebitda,
            atual: r2025.ebitda,
            sub: `Margem ${pct(r2025.ebitda, r2025.receita)}`,
          },
          {
            label: "Lucro Líquido",
            valor: fmt(r2025.lucroLiquido),
            ant: r2024.lucroLiquido,
            atual: r2025.lucroLiquido,
            sub: `Margem ${pct(r2025.lucroLiquido, r2025.receita)}`,
          },
          {
            label: "Patrimônio Líquido",
            valor: fmt(BALANCO.passivo.grupos[2].total),
            ant: 0,
            atual: 0,
            sub: "Dez/2025",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="kpi-box">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.valor}</div>
            <div className="kpi-sub">
              {kpi.sub}
              {kpi.ant !== 0 && (
                <Variacao atual={kpi.atual} anterior={kpi.ant} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── DRE COMPARATIVA ── */}
      <div className="section">
        <div className="section-title">
          Demonstração do Resultado (DRE) — Comparativo Anual
        </div>
        <table className="report-table">
          <thead>
            <tr>
              <th className="col-label">Indicador</th>
              <th className="col-num">2024</th>
              <th className="col-num">% Receita</th>
              <th className="col-num">2025</th>
              <th className="col-num">% Receita</th>
              <th className="col-num">Var %</th>
            </tr>
          </thead>
          <tbody>
            {linhasDRE.map((linha) => {
              const varPct =
                linha.v24 !== 0
                  ? ((linha.v25 - linha.v24) / Math.abs(linha.v24)) * 100
                  : null;
              const isNeg = linha.v25 < 0;
              return (
                <tr key={linha.label} className={linha.bold ? "row-bold" : ""}>
                  <td className="col-label">{linha.label}</td>
                  <td className="col-num">{fmt(linha.v24)}</td>
                  <td className="col-num muted">
                    {pct(linha.v24, r2024.receita)}
                  </td>
                  <td
                    className="col-num"
                    style={isNeg ? { color: "#DC2626" } : undefined}
                  >
                    {fmt(linha.v25)}
                  </td>
                  <td className="col-num muted">
                    {pct(linha.v25, r2025.receita)}
                  </td>
                  <td
                    className="col-num"
                    style={
                      varPct !== null
                        ? { color: varPct >= 0 ? "#166534" : "#DC2626" }
                        : undefined
                    }
                  >
                    {varPct !== null
                      ? `${varPct >= 0 ? "+" : ""}${varPct.toFixed(1).replace(".", ",")}%`
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── BALANÇO ── */}
      <div className="section page-break">
        <div className="section-title">Balanço Patrimonial — Dez/2025</div>
        <div className="balanco-grid">
          {/* ATIVO */}
          <div>
            <div className="balanco-group-title">ATIVO</div>
            {BALANCO.ativo.grupos.map((grupo) => (
              <div key={grupo.nome} className="balanco-group">
                <div className="balanco-group-header">
                  <span>{grupo.nome}</span>
                  <span>{fmt(grupo.total)}</span>
                </div>
                {grupo.contas.map((c) => (
                  <div key={c.codigo} className="balanco-row">
                    <span className="balanco-row-name">{c.nome}</span>
                    <span>{fmt(c.valor)}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="balanco-total">
              <span>Total do Ativo</span>
              <span>{fmt(BALANCO.ativo.total)}</span>
            </div>
          </div>

          {/* PASSIVO + PL */}
          <div>
            <div className="balanco-group-title">PASSIVO + PATRIMÔNIO LÍQUIDO</div>
            {BALANCO.passivo.grupos.map((grupo) => (
              <div key={grupo.nome} className="balanco-group">
                <div
                  className="balanco-group-header"
                  style={
                    grupo.nome === "Patrimônio Líquido"
                      ? { color: "#166534" }
                      : undefined
                  }
                >
                  <span>{grupo.nome}</span>
                  <span>{fmt(grupo.total)}</span>
                </div>
                {grupo.contas.map((c) => (
                  <div key={c.codigo} className="balanco-row">
                    <span className="balanco-row-name">{c.nome}</span>
                    <span>{fmt(c.valor)}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="balanco-total">
              <span>Total do Passivo + PL</span>
              <span>{fmt(BALANCO.passivo.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── NOTA CONTADOR ── */}
      <div className="section nota">
        <div className="nota-title">Nota do Contador</div>
        <p>
          O exercício de 2025 encerrou com resultados expressivos, evidenciando
          a consolidação da empresa após os ajustes realizados em 2024. A receita
          cresceu {((r2025.receita - r2024.receita) / r2024.receita * 100).toFixed(1).replace(".", ",")}% em relação ao ano anterior, com manutenção das
          margens operacionais, demonstrando eficiência na gestão de custos. O
          EBITDA de {pct(r2025.ebitda, r2025.receita)} reflete a maturidade operacional do negócio.
        </p>
        <p style={{ marginTop: 8 }}>
          O patrimônio líquido de {fmt(BALANCO.passivo.grupos[2].total)} representa
          a solidez financeira construída ao longo dos anos, com baixo endividamento
          e boa liquidez corrente. Recomendamos manter a estratégia atual de
          reinvestimento em equipamentos e ampliação da capacidade de atendimento.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <div className="print-footer">
        <div>
          Responsável: {CLIENTE.contadorNome} · {ESCRITORIO.nome}
        </div>
        <div>
          {ESCRITORIO.email} · CNPJ {ESCRITORIO.cnpj}
        </div>
        <div className="footer-brand">
          Gerado via Contabil 360 · {dataGeracao}
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 10pt;
          color: #111827;
          background: #fff;
          line-height: 1.5;
        }

        .print-page {
          max-width: 820px;
          margin: 0 auto;
          padding: 28px 32px;
        }

        /* HEADER */
        .print-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 16px;
          border-bottom: 2px solid #166534;
          margin-bottom: 20px;
        }
        .brand {
          font-size: 16pt;
          font-weight: 700;
          color: #166534;
          letter-spacing: -0.5px;
        }
        .brand-sub {
          font-size: 8pt;
          color: #6B7280;
          margin-top: 2px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .header-right {
          text-align: right;
        }
        .empresa-nome {
          font-size: 12pt;
          font-weight: 600;
          color: #111827;
        }
        .empresa-sub {
          font-size: 8pt;
          color: #6B7280;
          margin-top: 2px;
        }

        /* KPIs */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .kpi-box {
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 12px 14px;
          background: #F9FAFB;
        }
        .kpi-label {
          font-size: 7.5pt;
          font-weight: 500;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 4px;
        }
        .kpi-value {
          font-size: 13pt;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.5px;
        }
        .kpi-sub {
          font-size: 7.5pt;
          color: #6B7280;
          margin-top: 3px;
        }

        /* SECTION */
        .section {
          margin-bottom: 24px;
        }
        .section-title {
          font-size: 9pt;
          font-weight: 600;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 6px;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 10px;
        }

        /* TABLE */
        .report-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 8.5pt;
        }
        .report-table thead tr {
          background: #F9FAFB;
        }
        .report-table th {
          padding: 6px 8px;
          text-align: right;
          font-weight: 600;
          color: #6B7280;
          font-size: 7.5pt;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 1px solid #E5E7EB;
        }
        .report-table th.col-label { text-align: left; }
        .report-table td {
          padding: 5px 8px;
          text-align: right;
          border-bottom: 1px solid #F3F4F6;
          color: #374151;
        }
        .col-label { text-align: left !important; color: #111827; }
        .col-num { font-variant-numeric: tabular-nums; white-space: nowrap; }
        .muted { color: #9CA3AF !important; }
        .row-bold td {
          font-weight: 600;
          color: #111827;
          background: #F9FAFB;
          border-bottom: 1px solid #E5E7EB;
        }

        /* BALANÇO */
        .balanco-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .balanco-group-title {
          font-size: 7.5pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6B7280;
          margin-bottom: 8px;
        }
        .balanco-group {
          margin-bottom: 10px;
        }
        .balanco-group-header {
          display: flex;
          justify-content: space-between;
          font-size: 8.5pt;
          font-weight: 600;
          color: #111827;
          padding: 4px 0;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 4px;
        }
        .balanco-row {
          display: flex;
          justify-content: space-between;
          font-size: 8pt;
          color: #374151;
          padding: 2px 8px;
        }
        .balanco-row-name { color: #6B7280; }
        .balanco-total {
          display: flex;
          justify-content: space-between;
          font-size: 9pt;
          font-weight: 700;
          color: #111827;
          padding: 6px 0;
          border-top: 2px solid #111827;
          margin-top: 4px;
        }

        /* NOTA */
        .nota {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-left: 3px solid #166534;
          border-radius: 4px;
          padding: 14px 16px;
        }
        .nota-title {
          font-size: 8pt;
          font-weight: 600;
          color: #166534;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .nota p {
          font-size: 8.5pt;
          color: #374151;
          line-height: 1.6;
        }

        /* FOOTER */
        .print-footer {
          margin-top: 24px;
          padding-top: 12px;
          border-top: 1px solid #E5E7EB;
          font-size: 7.5pt;
          color: #9CA3AF;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .footer-brand {
          color: #166534;
          font-weight: 500;
          margin-top: 2px;
        }

        /* PRINT */
        .page-break { page-break-before: auto; }

        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-page { padding: 0; max-width: 100%; }
          .page-break { page-break-before: always; }
        }

        @media screen {
          body { background: #f5f5f5; padding: 24px 0; }
          .print-page {
            background: white;
            box-shadow: 0 1px 8px rgba(0,0,0,0.1);
            border-radius: 6px;
          }
        }
      `}</style>
    </div>
  );
}
