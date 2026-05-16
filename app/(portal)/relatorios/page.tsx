import { DRE_DETALHE, DRE_MESES, BALANCO } from "@/lib/mock-data";
import { RelatoriosTabs } from "@/components/portal/relatorios-tabs";
import { MobileHeader } from "@/components/portal/mobile-header";
import { RelatorioActions } from "@/components/portal/relatorio-actions";

export default function RelatoriosPage() {
  return (
    <>
      <MobileHeader titulo="Relatórios Financeiros" />
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="hidden md:flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
              Demonstrativos
            </p>
            <h1 className="text-2xl font-semibold text-text">Relatórios Financeiros</h1>
          </div>
          <RelatorioActions />
        </div>

        {/* Mobile actions */}
        <div className="md:hidden flex justify-end mb-4">
          <RelatorioActions />
        </div>

        <RelatoriosTabs
          dreDetalhe={DRE_DETALHE}
          dreMeses={DRE_MESES}
          balanco={BALANCO}
        />
      </div>
    </>
  );
}
