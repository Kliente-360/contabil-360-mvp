import { TrendingUp, TrendingDown, DollarSign, BarChart2, MessageSquare, AlertTriangle, CalendarClock, Info } from "lucide-react";
import { getKPIsMesAtual, DRE_MESES, TICKETS, EVENTOS_CALENDARIO } from "@/lib/mock-data";
import { formatCurrencyCompact, cn } from "@/lib/utils";
import { EvolucaoChart } from "@/components/portal/evolucao-chart";
import { MobileHeader } from "@/components/portal/mobile-header";
import { agruparPorPeriodo, gerarInsight, type Insight } from "@/lib/analytics";

const INSIGHT_ICONS = { TrendingUp, TrendingDown, AlertTriangle, Info } as const;

const INSIGHT_BORDER: Record<Insight["tipo"], string> = {
  elogio: "border-l-success",
  atencao: "border-l-warning",
  alerta: "border-l-error",
  neutro: "border-l-border",
};

const INSIGHT_ICON_BG: Record<Insight["tipo"], string> = {
  elogio: "bg-primary-light",
  atencao: "bg-yellow-50",
  alerta: "bg-red-50",
  neutro: "bg-surface",
};

const INSIGHT_ICON_COLOR: Record<Insight["tipo"], string> = {
  elogio: "text-success",
  atencao: "text-warning",
  alerta: "text-error",
  neutro: "text-text-muted",
};

function NotaDoContador({ insight }: { insight: Insight }) {
  const IconComponent = INSIGHT_ICONS[insight.icone];
  return (
    <div className="mb-4 md:mb-6">
      <div className={cn("bg-white border border-border rounded-lg p-4 md:p-5 flex gap-4 border-l-4", INSIGHT_BORDER[insight.tipo])}>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", INSIGHT_ICON_BG[insight.tipo])}>
          <IconComponent className={cn("w-4 h-4", INSIGHT_ICON_COLOR[insight.tipo])} />
        </div>
        <div>
          <p className="text-xs font-medium text-text-muted mb-0.5 uppercase tracking-wider">Nota do Contador</p>
          <p className="text-sm font-semibold text-text mb-1">{insight.titulo}</p>
          <p className="text-sm text-text-muted leading-relaxed">{insight.descricao}</p>
        </div>
      </div>
    </div>
  );
}

export default function InicioPage() {
  const kpis = getKPIsMesAtual();
  const ticketsAbertos = TICKETS.filter((t) => t.status !== "resolvido").length;
  const dadosEvolucao = agruparPorPeriodo(DRE_MESES.slice(-12), "mensal");
  const insight = gerarInsight(DRE_MESES.slice(-12));

  const MES_ATUAL = "2026-05";
  const obrigacoesAberto = EVENTOS_CALENDARIO.filter(
    (e) => e.data.startsWith(MES_ATUAL) && (e.status === "pendente" || e.status === "vencido")
  );
  const totalObrigacoes = obrigacoesAberto.reduce((s, e) => s + (e.valor ?? 0), 0);

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

        {/* Nota do Contador */}
        <NotaDoContador insight={insight} />

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

            {/* Obrigações em aberto */}
            <div className="bg-white border border-border rounded-lg p-4 md:p-5">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <CalendarClock className="w-4 h-4 text-text-muted" />
                <h3 className="text-sm font-semibold text-text">Obrigações</h3>
              </div>
              {obrigacoesAberto.length > 0 ? (
                <>
                  <p className="text-2xl font-semibold text-text mb-0.5">
                    {obrigacoesAberto.length}
                  </p>
                  <p className="text-xs text-text-muted mb-2">
                    {obrigacoesAberto.length === 1 ? "pendente este mês" : "pendentes este mês"}
                  </p>
                  {totalObrigacoes > 0 && (
                    <p className="text-xs font-semibold text-warning">
                      {formatCurrencyCompact(totalObrigacoes)} a pagar
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-success font-medium">Em dia este mês</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
