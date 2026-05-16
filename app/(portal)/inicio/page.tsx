import { TrendingUp, TrendingDown, DollarSign, BarChart2, MessageSquare, AlertTriangle } from "lucide-react";
import { getKPIsMesAtual, DRE_MESES, TICKETS } from "@/lib/mock-data";
import { formatCurrency, formatCurrencyCompact } from "@/lib/utils";
import { EvolucaoChart } from "@/components/portal/evolucao-chart";
import { MobileHeader } from "@/components/portal/mobile-header";
import { agruparPorPeriodo } from "@/lib/analytics";

export default function InicioPage() {
  const kpis = getKPIsMesAtual();
  const ticketsAbertos = TICKETS.filter((t) => t.status !== "resolvido").length;
  const dadosEvolucao = agruparPorPeriodo(DRE_MESES.slice(-12), "mensal");

  const cards = [
    {
      label: "Receita",
      valor: kpis.receita.valor,
      variacao: kpis.receita.variacao,
      sub: "vs. mês anterior",
      icon: DollarSign,
    },
    {
      label: "EBITDA",
      valor: kpis.ebitda.valor,
      variacao: kpis.ebitda.variacao,
      sub: `Margem ${kpis.ebitda.margem.toFixed(1)}%`,
      icon: BarChart2,
    },
    {
      label: "Lucro Líquido",
      valor: kpis.lucroLiquido.valor,
      variacao: kpis.lucroLiquido.variacao,
      sub: `Margem ${kpis.lucroLiquido.margem.toFixed(1)}%`,
      icon: TrendingUp,
    },
    {
      label: "Impostos (DAS)",
      valor: kpis.impostos.valor,
      variacao: null,
      sub: `Alíq. efetiva ${kpis.impostos.aliquotaEfetiva.toFixed(2)}%`,
      icon: AlertTriangle,
    },
  ];

  return (
    <>
      <MobileHeader titulo="Auto Center São Jorge" subtitulo={kpis.competenciaLabel} />

      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header desktop */}
        <div className="hidden md:block mb-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
            Competência atual
          </p>
          <h1 className="text-2xl font-semibold text-text">{kpis.competenciaLabel}</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            const positivo = card.variacao !== null && card.variacao >= 0;
            return (
              <div key={card.label} className="kpi-card p-4 md:p-5">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <p className="text-xs font-medium text-text-muted">{card.label}</p>
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-surface rounded-md flex items-center justify-center">
                    <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-text-muted" />
                  </div>
                </div>
                <p className="text-lg md:text-xl font-semibold text-text mb-1">
                  {formatCurrencyCompact(card.valor)}
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {card.variacao !== null ? (
                    <>
                      {positivo ? (
                        <TrendingUp className="w-3 h-3 text-success flex-shrink-0" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-error flex-shrink-0" />
                      )}
                      <span className={`text-xs font-medium ${positivo ? "text-success" : "text-error"}`}>
                        {positivo ? "+" : ""}{card.variacao.toFixed(1)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-text-muted">{card.sub}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gráfico + resumo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 bg-white border border-border rounded-lg p-4 md:p-5">
            <div className="mb-3 md:mb-4">
              <h3 className="text-sm font-semibold text-text">Evolução Financeira</h3>
              <p className="text-xs text-text-muted">Jan – Dez 2025</p>
            </div>
            <EvolucaoChart dados={dadosEvolucao} periodo="mensal" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {/* Tickets */}
            <div className="bg-white border border-border rounded-lg p-4 md:p-5">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <MessageSquare className="w-4 h-4 text-text-muted" />
                <h3 className="text-sm font-semibold text-text">Atendimento</h3>
              </div>
              {ticketsAbertos > 0 ? (
                <>
                  <p className="text-2xl font-semibold text-text mb-1">{ticketsAbertos}</p>
                  <p className="text-xs text-text-muted">
                    {ticketsAbertos === 1 ? "ticket aberto" : "tickets em aberto"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-success font-medium">Nenhum ticket aberto</p>
              )}
            </div>

            {/* Resumo */}
            <div className="bg-white border border-border rounded-lg p-4 md:p-5">
              <h3 className="text-sm font-semibold text-text mb-3">Resumo</h3>
              <div className="space-y-2">
                {[
                  { label: "Receita", valor: kpis.receita.valor, pos: true },
                  { label: "Impostos", valor: -kpis.impostos.valor, pos: false },
                  { label: "EBITDA", valor: kpis.ebitda.valor, pos: true },
                  { label: "Lucro líq.", valor: kpis.lucroLiquido.valor, pos: kpis.lucroLiquido.valor >= 0 },
                ].map(({ label, valor, pos }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-text-muted">{label}</span>
                    <span className={`text-xs font-semibold ${pos ? "text-text" : "text-error"}`}>
                      {valor < 0 ? "-" : ""}{formatCurrency(Math.abs(valor))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
