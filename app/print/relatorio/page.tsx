"use client";

import { DRE_MESES, BALANCO, CLIENTE, ESCRITORIO } from "@/lib/mock-data";
import { resumoAnual, gerarInsight } from "@/lib/analytics";
import { formatCurrency, formatCurrencyCompact } from "@/lib/utils";

function pct(val: number, total: number) {
  if (total === 0) return "0,0%";
  return ((val / total) * 100).toFixed(1).replace(".", ",") + "%";
}

function Variacao({ atual, anterior }: { atual: number; anterior: number }) {
  if (anterior === 0) return null;
  const v = ((atual - anterior) / Math.abs(anterior)) * 100;
  return (
    <span style={{ color: v >= 0 ? "#166534" : "#DC2626", fontSize: "9pt", fontWeight: 500, marginLeft: 6 }}>
      {v >= 0 ? "+" : ""}{v.toFixed(1).replace(".", ",")}%
    </span>
  );
}

export default function PrintRelatorio() {
  const r2024 = resumoAnual(DRE_MESES, 2024);
  const r2025 = resumoAnual(DRE_MESES, 2025);
  const insight = gerarInsight(DRE_MESES.slice(-12));
  const dataGeracao = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const varReceita = ((r2025.receita - r2024.receita) / r2024.receita * 100).toFixed(1).replace(".", ",");

  const metricas = [
    { label: "Receita", valor: formatCurrencyCompact(r2025.receita), sub: `+${varReceita}% vs 2024`, cor: "#16A34A" },
    { label: "EBITDA", valor: formatCurrencyCompact(r2025.ebitda), sub: `Margem ${pct(r2025.ebitda, r2025.receita)}`, cor: "#6B7280" },
    { label: "Lucro Líquido", valor: formatCurrencyCompact(r2025.lucroLiquido), sub: `Margem ${pct(r2025.lucroLiquido, r2025.receita)}`, cor: "#6B7280" },
  ];

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
      {/* ════════════════════════════════════════════════════
          TELA MOBILE — 100% Tailwind, independente do <style>
          Oculto em md+ e no print via CSS abaixo
          ════════════════════════════════════════════════════ */}
      <div
        className="mobile-screen"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          background: "#111827",
          paddingTop: "max(40px, env(safe-area-inset-top))",
          paddingBottom: "max(28px, env(safe-area-inset-bottom))",
          fontFamily: "var(--font-inter, -apple-system, sans-serif)",
        }}
      >
        {/* Conteúdo — flex:1 empurra botões pro rodapé */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
          {/* Logo / label */}
          <p style={{ fontSize: 10, fontWeight: 600, color: "#166534", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            Contabil 360
          </p>

          {/* Empresa */}
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 4 }}>
            {CLIENTE.razaoSocial}
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 32 }}>
            Relatório Financeiro · Exercício 2025
          </p>

          {/* Métricas */}
          <div style={{ borderTop: "1px solid #1F2937", marginBottom: 20 }}>
            {metricas.map((m) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid #1F2937",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: "#6B7280" }}>{m.label}</span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  <span style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>
                    {m.valor}
                  </span>
                  <span style={{ fontSize: 12, color: m.cor }}>{m.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Insight */}
          <div style={{ border: "1px solid #166534", borderRadius: 8, padding: "12px 14px" }}>
            <p style={{ fontSize: 13, color: "#16A34A", fontWeight: 500, lineHeight: 1.4 }}>
              {insight.titulo}
            </p>
          </div>
        </div>

        {/* Botões — rodapé */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 24px" }}>
          <button
            onClick={() => window.print()}
            style={{
              width: "100%", background: "#166534", color: "white", border: "none",
              borderRadius: 12, padding: "16px 0", fontSize: 16, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Imprimir / Salvar PDF
          </button>
          <button
            onClick={() => window.history.back()}
            style={{
              width: "100%", background: "transparent", color: "#9CA3AF",
              border: "1px solid #374151", borderRadius: 12, padding: "14px 0",
              fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            ← Voltar
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          BOTÕES DESKTOP — fixos no topo, ocultos no print
          ════════════════════════════════════════════════════ */}
      <div className="desktop-actions" style={{ position: "fixed", top: 12, right: 16, display: "flex", gap: 8, zIndex: 100 }}>
        <button
          onClick={() => window.history.back()}
          style={{ background: "white", color: "#6B7280", border: "1px solid #E5E7EB", borderRadius: 6, padding: "8px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
        >
          ← Voltar
        </button>
        <button
          onClick={() => window.print()}
          style={{ background: "#166534", color: "white", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
        >
          Imprimir / Salvar PDF
        </button>
      </div>

      {/* ════════════════════════════════════════════════════
          DOCUMENTO A4 — preview desktop + saída de print
          ════════════════════════════════════════════════════ */}
      <div className="print-page">

        <div className="ph">
          <div>
            <div className="empresa-nome">{CLIENTE.razaoSocial}</div>
            <div className="empresa-sub">CNPJ {CLIENTE.cnpj} · {CLIENTE.regimeTributario} · Exercício 2025</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="brand">Contabil 360</div>
            <div className="brand-sub">Relatório Financeiro Executivo · Gerado em {dataGeracao}</div>
          </div>
        </div>

        <div className="kpi-grid">
          {[
            { label: "Receita 2025", valor: formatCurrency(r2025.receita), ant: r2024.receita, atual: r2025.receita, sub: "vs. 2024" },
            { label: "EBITDA 2025", valor: formatCurrency(r2025.ebitda), ant: r2024.ebitda, atual: r2025.ebitda, sub: `Margem ${pct(r2025.ebitda, r2025.receita)}` },
            { label: "Lucro Líquido", valor: formatCurrency(r2025.lucroLiquido), ant: r2024.lucroLiquido, atual: r2025.lucroLiquido, sub: `Margem ${pct(r2025.lucroLiquido, r2025.receita)}` },
            { label: "Patrimônio Líquido", valor: formatCurrency(BALANCO.passivo.grupos[2].total), ant: 0, atual: 0, sub: "Dez/2025" },
          ].map((k) => (
            <div key={k.label} className="kpi-box">
              <div className="kpi-lbl">{k.label}</div>
              <div className="kpi-val">{k.valor}</div>
              <div className="kpi-sub">{k.sub}{k.ant !== 0 && <Variacao atual={k.atual} anterior={k.ant} />}</div>
            </div>
          ))}
        </div>

        <div className="main-grid">
          <div>
            <div className="sec-title">DRE Comparativo — 2024 × 2025</div>
            <table className="tbl">
              <thead>
                <tr>
                  <th className="tl">Indicador</th>
                  <th className="tr">2024</th><th className="tr">% Rec</th>
                  <th className="tr">2025</th><th className="tr">% Rec</th>
                  <th className="tr">Var %</th>
                </tr>
              </thead>
              <tbody>
                {linhasDRE.map((l) => {
                  const vp = l.v24 !== 0 ? ((l.v25 - l.v24) / Math.abs(l.v24)) * 100 : null;
                  return (
                    <tr key={l.label} className={l.bold ? "rb" : ""}>
                      <td className="tl">{l.label}</td>
                      <td className="tr">{formatCurrency(l.v24)}</td>
                      <td className="tr muted">{pct(l.v24, r2024.receita)}</td>
                      <td className="tr" style={l.v25 < 0 ? { color: "#DC2626" } : undefined}>{formatCurrency(l.v25)}</td>
                      <td className="tr muted">{pct(l.v25, r2025.receita)}</td>
                      <td className="tr" style={vp !== null ? { color: vp >= 0 ? "#166534" : "#DC2626" } : undefined}>
                        {vp !== null ? `${vp >= 0 ? "+" : ""}${vp.toFixed(1).replace(".", ",")}%` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div>
            <div className="sec-title">Balanço Patrimonial — Dez/2025</div>
            <div className="bal-grid">
              <div>
                <div className="bal-gt">ATIVO</div>
                {BALANCO.ativo.grupos.map((g) => (
                  <div key={g.nome} className="bal-g">
                    <div className="bal-gh"><span>{g.nome}</span><span>{formatCurrency(g.total)}</span></div>
                    {g.contas.map((c) => (
                      <div key={c.codigo} className="bal-row">
                        <span className="bal-rn">{c.nome}</span><span>{formatCurrency(c.valor)}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="bal-tot"><span>Total do Ativo</span><span>{formatCurrency(BALANCO.ativo.total)}</span></div>
              </div>
              <div>
                <div className="bal-gt">PASSIVO + PATRIMÔNIO LÍQUIDO</div>
                {BALANCO.passivo.grupos.map((g) => (
                  <div key={g.nome} className="bal-g">
                    <div className="bal-gh" style={g.nome === "Patrimônio Líquido" ? { color: "#166534" } : undefined}>
                      <span>{g.nome}</span><span>{formatCurrency(g.total)}</span>
                    </div>
                    {g.contas.map((c) => (
                      <div key={c.codigo} className="bal-row">
                        <span className="bal-rn">{c.nome}</span><span>{formatCurrency(c.valor)}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="bal-tot"><span>Total do Passivo + PL</span><span>{formatCurrency(BALANCO.passivo.total)}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="nota">
          <div className="nota-title">Nota do Contador</div>
          <p>
            O exercício de 2025 encerrou com resultados expressivos, com receita crescendo {varReceita}% sobre 2024.
            EBITDA de {pct(r2025.ebitda, r2025.receita)} reflete eficiência operacional sólida.
            Patrimônio líquido de {formatCurrency(BALANCO.passivo.grupos[2].total)} demonstra solidez com baixo endividamento.
          </p>
        </div>

        <div className="pf">
          <span>Responsável: {CLIENTE.contadorNome} · {ESCRITORIO.nome} · {ESCRITORIO.email} · CNPJ {ESCRITORIO.cnpj}</span>
          <span style={{ color: "#166534", fontWeight: 500 }}>Gerado via Contabil 360 · {dataGeracao}</span>
        </div>

        {/* ── ESTILOS DO A4 — apenas para preview desktop e output print ── */}
        <style>{`
          @page { size: A4 landscape; margin: 12mm 14mm; }

          /* Reset escopo: só dentro do documento A4 */
          .print-page *, .print-page *::before, .print-page *::after {
            box-sizing: border-box; margin: 0; padding: 0;
          }

          /* ── Mobile: esconde A4, esconde botões desktop ── */
          @media screen and (max-width: 767px) {
            .print-page { display: none; }
            .desktop-actions { display: none; }
          }

          /* ── Desktop: preview A4 ── */
          @media screen and (min-width: 768px) {
            .mobile-screen { display: none; }
            body { background: #f5f5f5 !important; padding: 56px 0 24px; }
            .print-page {
              display: flex; flex-direction: column;
              background: white; max-width: 297mm; margin: 0 auto;
              padding: 12mm 14mm; min-height: 210mm;
              box-shadow: 0 1px 8px rgba(0,0,0,.1); border-radius: 4px;
              font-family: 'Inter', -apple-system, sans-serif;
              font-size: 9pt; color: #111827; line-height: 1.4;
            }
          }

          /* ── Print: só o A4, esconde tudo mais ── */
          @media print {
            .mobile-screen { display: none !important; }
            .desktop-actions { display: none !important; }
            .print-page {
              display: flex !important; flex-direction: column;
              font-family: 'Inter', -apple-system, sans-serif;
              font-size: 9pt; color: #111827; line-height: 1.4;
            }
            body {
              background: white !important; padding: 0 !important;
              -webkit-print-color-adjust: exact; print-color-adjust: exact;
            }
          }

          /* ── A4 content styles ── */
          .ph { display: flex; justify-content: space-between; align-items: center; padding-bottom: 6px; border-bottom: 2px solid #166534; margin-bottom: 10px; }
          .empresa-nome { font-size: 12pt; font-weight: 700; letter-spacing: -0.3px; }
          .empresa-sub { font-size: 7pt; color: #6B7280; margin-top: 2px; }
          .brand { font-size: 10pt; font-weight: 600; color: #166534; letter-spacing: -0.3px; }
          .brand-sub { font-size: 7pt; color: #6B7280; margin-top: 1px; font-weight: 500; }

          .kpi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-bottom: 10px; }
          .kpi-box { border: 1px solid #E5E7EB; border-radius: 5px; padding: 7px 10px; background: #F9FAFB; }
          .kpi-lbl { font-size: 7pt; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: .4px; margin-bottom: 2px; }
          .kpi-val { font-size: 11pt; font-weight: 700; letter-spacing: -.5px; }
          .kpi-sub { font-size: 7pt; color: #6B7280; margin-top: 2px; }

          .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; flex: 1; }
          .sec-title { font-size: 7.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; padding-bottom: 4px; border-bottom: 1px solid #E5E7EB; margin-bottom: 6px; }

          .tbl { width: 100%; border-collapse: collapse; font-size: 8pt; }
          .tbl thead tr { background: #F9FAFB; }
          .tbl th { padding: 3px 6px; font-weight: 600; color: #6B7280; font-size: 7pt; text-transform: uppercase; letter-spacing: .3px; border-bottom: 1px solid #E5E7EB; }
          .tbl td { padding: 3px 6px; border-bottom: 1px solid #F3F4F6; color: #374151; }
          .tl { text-align: left; color: #111827 !important; }
          .tr { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
          .muted { color: #9CA3AF !important; }
          .rb td { font-weight: 600; color: #111827; background: #F9FAFB; border-bottom: 1px solid #E5E7EB; }

          .bal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
          .bal-gt { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: #6B7280; margin-bottom: 5px; }
          .bal-g { margin-bottom: 6px; }
          .bal-gh { display: flex; justify-content: space-between; font-size: 8pt; font-weight: 600; padding: 2px 0; border-bottom: 1px solid #E5E7EB; margin-bottom: 2px; }
          .bal-row { display: flex; justify-content: space-between; font-size: 8pt; color: #374151; padding: 2px 6px; }
          .bal-rn { color: #6B7280; }
          .bal-tot { display: flex; justify-content: space-between; font-size: 8.5pt; font-weight: 700; padding: 4px 0; border-top: 2px solid #111827; margin-top: 3px; }

          .nota { background: #F9FAFB; border: 1px solid #E5E7EB; border-left: 3px solid #166534; border-radius: 3px; padding: 5px 10px; margin-top: 10px; }
          .nota-title { font-size: 7pt; font-weight: 600; color: #166534; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 2px; }
          .nota p { font-size: 8pt; color: #374151; line-height: 1.4; }

          .pf { margin-top: 8px; padding-top: 6px; border-top: 1px solid #E5E7EB; font-size: 7pt; color: #9CA3AF; display: flex; justify-content: space-between; align-items: center; }
        `}</style>
      </div>
    </>
  );
}
