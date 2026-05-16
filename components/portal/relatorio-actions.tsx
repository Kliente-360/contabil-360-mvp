"use client";

import { FileDown, Share2 } from "lucide-react";
import { DRE_MESES, CLIENTE, ESCRITORIO } from "@/lib/mock-data";
import { resumoAnual } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";

export function RelatorioActions() {
  function handleExport() {
    window.open("/print/relatorio", "_blank");
  }

  function handleShare() {
    const r = resumoAnual(DRE_MESES, 2025);
    const margem = ((r.ebitda / r.receita) * 100).toFixed(1).replace(".", ",");
    const texto = encodeURIComponent(
      `Relatório Financeiro 2025 — ${CLIENTE.razaoSocial}\n` +
        `Receita: ${formatCurrency(r.receita)}  |  EBITDA: ${margem}%  |  Lucro: ${formatCurrency(r.lucroLiquido)}\n\n` +
        `Gerado via Contabil 360 · ${ESCRITORIO.nome}`
    );
    window.open(`https://wa.me/?text=${texto}`, "_blank");
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-muted border border-border rounded-md hover:bg-surface hover:text-text transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Compartilhar</span>
      </button>
      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition-colors"
      >
        <FileDown className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Exportar PDF</span>
      </button>
    </div>
  );
}
