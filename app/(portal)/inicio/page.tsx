import { TrendingUp, TrendingDown, DollarSign, BarChart2, MessageSquare, AlertTriangle } from "lucide-react";
import { getKPIsMesAtual, DRE_MESES, TICKETS } from "@/lib/mock-data";
import { formatCurrency, formatCurrencyCompact } from "@/lib/utils";
import { EvolucaoChart } from "@/components/portal/evolucao-chart";

export default function InicioPage() {
  const kpis = getKPIsMesAtual();
  const ticketsAbertos = TICKETS.filter(
    (t) => t.status !== "resolvido"
  ).length;

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
      sub: `Alíquota efetiva ${kpis.impostos.aliquotaEfetiva.toFixed(2)}%`,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
          Competência atual
        </p>
        <h1 className="text-2xl font-semibold text-text">
          {kpis.competenciaLabel}
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          const positivo = card.variacao !== null && card.variacao >= 0;
          return (
            <div key={card.label} className="kpi-card">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-text-muted">{card.label}</p>
                <div className="w-7 h-7 bg-surface rounded-md flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-text-muted" />
                </div>
              </div>
              <p className="text-xl font-semibold text-text mb-1">
                {formatCurrencyCompact(card.valor)}
              </p>
              <div className="flex items-center gap-1">
                {card.variacao !== null ? (
                  <>
                    {positivo ? (
                      <TrendingUp className="w-3 h-3 text-success" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-error" />
                    )}
                    <span
                      className={`text-xs font-medium ${positivo ? "text-success" : "text-error"}`}
                    >
                      {positivo ? "+" : ""}
                      {card.variacao.toFixed(1)}%
                    </span>
                    <span className="text-xs text-text-muted">{card.sub}</span>
                  </>
                ) : (
                  <span className="text-xs text-text-muted">{card.sub}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico + Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-border rounded-lg p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-text">
              Evolução Financeira
            </h3>
            <p className="text-xs text-text-muted">Jan – Jun 2024</p>
          </div>
          <EvolucaoChart dados={DRE_MESES} />
        </div>

        <div className="space-y-4">
          {/* Tickets abertos */}
          <div className="bg-white border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-text-muted" />
              <h3 className="text-sm font-semibold text-text">Atendimento</h3>
            </div>
            {ticketsAbertos > 0 ? (
              <>
                <p className="text-2xl font-semibold text-text mb-1">
                  {ticketsAbertos}
                </p>
                <p className="text-xs text-text-muted">
                  {ticketsAbertos === 1 ? "ticket aberto" : "tickets em aberto"}
                </p>
              </>
            ) : (
              <p className="text-sm text-success font-medium">
                Nenhum ticket aberto
              </p>
            )}
          </div>

          {/* Resumo financeiro */}
          <div className="bg-white border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold text-text mb-3">
              Resumo do mês
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "Receita bruta", valor: kpis.receita.valor, positivo: true },
                { label: "Impostos", valor: -kpis.impostos.valor, positivo: false },
                { label: "EBITDA", valor: kpis.ebitda.valor, positivo: true },
                { label: "Lucro líquido", valor: kpis.lucroLiquido.valor, positivo: kpis.lucroLiquido.valor >= 0 },
              ].map(({ label, valor, positivo }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">{label}</span>
                  <span className={`text-xs font-semibold ${positivo ? "text-text" : "text-error"}`}>
                    {valor < 0 ? "-" : ""}{formatCurrency(Math.abs(valor))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
