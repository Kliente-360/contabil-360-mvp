import { DRE_DETALHE, DRE_MESES, BALANCO } from "@/lib/mock-data";
import { RelatoriosTabs } from "@/components/portal/relatorios-tabs";

export default function RelatoriosPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
          Demonstrativos
        </p>
        <h1 className="text-2xl font-semibold text-text">Relatórios Financeiros</h1>
      </div>
      <RelatoriosTabs
        dreDetalhe={DRE_DETALHE}
        dreMeses={DRE_MESES}
        balanco={BALANCO}
      />
    </div>
  );
}
