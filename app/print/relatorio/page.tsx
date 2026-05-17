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
    // afterprint não é suportado no iOS Safari — botão "Voltar" cobre esse caso
    const afterPrint = () => window.history.back();
    window.addEventListener("afterprint", afterPrint);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("afterprint", afterPrint);
    };
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
    <>
    <button className="btn-voltar" onClick={() => window.history.back()}>
      ← Voltar
    </button>
    <div className="print-page">
      {/* ── HEADER ── */}
      <div className="print-header">
        <div>
          <div className="empresa-nome">{CLIENTE.razaoSocial}</div>
          <div className="empresa-sub">
            CNPJ {CLIENTE.cnpj} · {CLIENTE.regimeTributario} · Exercício 2025
          </div>
        </div>
        <div className="header-right">
          <div className="brand">Contabil 360</div>
          <div className="brand-sub">Relatório Financeiro Executivo · Gerado em {dataGeracao}</div>
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

      {/* ── MAIN BODY: 2 columns ── */}
      <div className="main-grid">
        {/* Left: DRE Comparativa */}
        <div className="col-left">
          <div className="section-title">
            DRE Comparativo — 2024 × 2025
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th className="col-label">Indicador</th>
                <th className="col-num">2024</th>
                <th className="col-num">% Rec</th>
                <th className="col-num">2025</th>
                <th className="col-num">% Rec</th>
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

        {/* Right: Balanço Patrimonial */}
        <div className="col-right">
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
      </div>

      {/* ── NOTA DO CONTADOR (below 2-column grid) ── */}
      <div className="nota">
        <div className="nota-title">Nota do Contador</div>
        <p>
          O exercício de 2025 encerrou com resultados expressivos, com receita crescendo{" "}
          {((r2025.receita - r2024.receita) / r2024.receita * 100).toFixed(1).replace(".", ",")}%
          sobre 2024. EBITDA de {pct(r2025.ebitda, r2025.receita)} reflete eficiência operacional.
          Patrimônio líquido de {fmt(BALANCO.passivo.grupos[2].total)} demonstra solidez com baixo endividamento.
          Recomendamos manter a estratégia atual de reinvestimento e ampliação da capacidade de atendimento.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <div className="print-footer">
        <span>Responsável: {CLIENTE.contadorNome} · {ESCRITORIO.nome} · {ESCRITORIO.email} · CNPJ {ESCRITORIO.cnpj}</span>
        <span className="footer-brand">Gerado via Contabil 360 · {dataGeracao}</span>
      </div>

      <style>{`
        @page { size: A4 landscape; margin: 12mm 14mm; }

        .btn-voltar {
          position: fixed;
          top: 14px;
          left: 16px;
          background: #166534;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          z-index: 100;
          font-family: 'Inter', -apple-system, sans-serif;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
        }
        @media print { .btn-voltar { display: none; } }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 9pt;
          color: #111827;
          background: #fff;
          line-height: 1.4;
        }

        .print-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding: 0;
        }

        /* HEADER */
        .print-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 6px;
          border-bottom: 2px solid #166534;
          margin-bottom: 10px;
        }
        .empresa-nome {
          font-size: 12pt;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.3px;
        }
        .empresa-sub {
          font-size: 7pt;
          color: #6B7280;
          margin-top: 2px;
        }
        .header-right {
          text-align: right;
        }
        .brand {
          font-size: 10pt;
          font-weight: 600;
          color: #166534;
          letter-spacing: -0.3px;
        }
        .brand-sub {
          font-size: 7pt;
          color: #6B7280;
          margin-top: 1px;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        /* KPIs */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 10px;
        }
        .kpi-box {
          border: 1px solid #E5E7EB;
          border-radius: 5px;
          padding: 7px 10px;
          background: #F9FAFB;
        }
        .kpi-label {
          font-size: 7pt;
          font-weight: 500;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 2px;
        }
        .kpi-value {
          font-size: 11pt;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.5px;
        }
        .kpi-sub {
          font-size: 7pt;
          color: #6B7280;
          margin-top: 2px;
        }

        /* MAIN 2-COLUMN GRID */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          flex: 1;
        }

        /* SECTION TITLE */
        .section-title {
          font-size: 7.5pt;
          font-weight: 600;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 4px;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 6px;
        }

        /* TABLE */
        .report-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 8pt;
        }
        .report-table thead tr {
          background: #F9FAFB;
        }
        .report-table th {
          padding: 3px 6px;
          text-align: right;
          font-weight: 600;
          color: #6B7280;
          font-size: 7pt;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 1px solid #E5E7EB;
        }
        .report-table th.col-label { text-align: left; }
        .report-table td {
          padding: 3px 6px;
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

        /* NOTA */
        .nota {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-left: 3px solid #166534;
          border-radius: 3px;
          padding: 5px 10px;
          margin-top: 10px;
        }
        .nota-title {
          font-size: 7pt;
          font-weight: 600;
          color: #166534;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .nota p {
          font-size: 8pt;
          color: #374151;
          line-height: 1.4;
        }

        /* BALANÇO */
        .balanco-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .balanco-group-title {
          font-size: 7pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6B7280;
          margin-bottom: 5px;
        }
        .balanco-group {
          margin-bottom: 6px;
        }
        .balanco-group-header {
          display: flex;
          justify-content: space-between;
          font-size: 8pt;
          font-weight: 600;
          color: #111827;
          padding: 2px 0;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 2px;
        }
        .balanco-row {
          display: flex;
          justify-content: space-between;
          font-size: 8pt;
          color: #374151;
          padding: 2px 6px;
        }
        .balanco-row-name { color: #6B7280; }
        .balanco-total {
          display: flex;
          justify-content: space-between;
          font-size: 8.5pt;
          font-weight: 700;
          color: #111827;
          padding: 4px 0;
          border-top: 2px solid #111827;
          margin-top: 3px;
        }

        /* FOOTER */
        .print-footer {
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px solid #E5E7EB;
          font-size: 7pt;
          color: #9CA3AF;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-brand {
          color: #166534;
          font-weight: 500;
        }

        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-page { min-height: unset; }
        }

        @media screen {
          body { background: #f5f5f5; padding: 24px 0; }
          .print-page {
            background: white;
            max-width: 297mm;
            margin: 0 auto;
            padding: 12mm 14mm;
            box-shadow: 0 1px 8px rgba(0,0,0,0.1);
            border-radius: 4px;
            min-height: 210mm;
          }
        }
      `}</style>
    </div>
    </>
  );
}
