import {
  Receipt,
  Users,
  UserCheck,
  Building2,
  FileText,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { EVENTOS_CALENDARIO, type EventoCalendario } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { MobileHeader } from "@/components/portal/mobile-header";

// ─── Tipo config ─────────────────────────────────────────────────────────────

const TIPO_CONFIG: Record<
  EventoCalendario["tipo"],
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  das: { label: "DAS", icon: Receipt },
  folha: { label: "Folha", icon: Users },
  prolabore: { label: "Pró-labore", icon: UserCheck },
  contabilidade: { label: "Contabilidade", icon: Building2 },
  obrigacao: { label: "Obrigação", icon: FileText },
  reuniao: { label: "Reunião", icon: Calendar },
};

const STATUS_CONFIG: Record<
  EventoCalendario["status"],
  { badge: string; label: string }
> = {
  pago: { badge: "badge-success", label: "Pago" },
  pendente: { badge: "badge-warning", label: "Pendente" },
  vencido: { badge: "badge-error", label: "Vencido" },
  agendado: { badge: "badge-neutral", label: "Agendado" },
};

const MES_LABELS: Record<string, string> = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMonthKey(data: string): string {
  // "YYYY-MM-DD" → "YYYY-MM"
  return data.slice(0, 7);
}

function formatDayMonth(data: string): string {
  // "YYYY-MM-DD" → "15/Mai"
  const day = data.slice(8, 10);
  const month = data.slice(5, 7);
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return `${day}/${meses[parseInt(month) - 1]}`;
}

function formatMonthHeading(yearMonth: string): string {
  // "2026-01" → "Janeiro 2026"
  const [year, month] = yearMonth.split("-");
  return `${MES_LABELS[month]} ${year}`;
}

// ─── Data computation (server-side) ──────────────────────────────────────────

function groupEventsByMonth(events: EventoCalendario[]): Map<string, EventoCalendario[]> {
  const sorted = [...events].sort((a, b) => a.data.localeCompare(b.data));
  const map = new Map<string, EventoCalendario[]>();
  for (const evt of sorted) {
    const key = getMonthKey(evt.data);
    const existing = map.get(key) ?? [];
    existing.push(evt);
    map.set(key, existing);
  }
  return map;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarioPage() {
  const hoje = "2026-05-16"; // COMPETENCIA demo — data fixa

  const emAberto = EVENTOS_CALENDARIO.filter(
    (e) => e.status === "pendente" || e.status === "vencido"
  ).length;

  // Soma de valores pendentes no mês atual
  const mesMesAtual = hoje.slice(0, 7); // "2026-05"
  const totalPendentesMes = EVENTOS_CALENDARIO.filter(
    (e) => e.status === "pendente" && getMonthKey(e.data) === mesMesAtual && e.valor
  ).reduce((acc, e) => acc + (e.valor ?? 0), 0);

  // Próximo vencimento: menor data pendente >= hoje
  const proximoVencimento = EVENTOS_CALENDARIO.filter(
    (e) => (e.status === "pendente" || e.status === "agendado") && e.data >= hoje
  ).sort((a, b) => a.data.localeCompare(b.data))[0] ?? null;

  const grouped = groupEventsByMonth(EVENTOS_CALENDARIO);

  return (
    <>
      <MobileHeader titulo="Calendário Fiscal" subtitulo="Obrigações e pagamentos" />

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Desktop heading */}
        <div className="hidden md:block mb-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
            Fiscal
          </p>
          <h1 className="text-2xl font-semibold text-text">Calendário Fiscal</h1>
          <p className="text-sm text-text-muted mt-1">Obrigações e pagamentos</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white border border-border rounded-lg p-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              Em aberto
            </p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold text-text">{emAberto}</p>
              {emAberto > 0 && (
                <AlertCircle className="w-4 h-4 text-warning mb-1" />
              )}
            </div>
            <p className="text-xs text-text-muted mt-1">pendente ou vencido</p>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              Este mês
            </p>
            <p className="text-2xl font-semibold text-text">
              {totalPendentesMes > 0 ? formatCurrency(totalPendentesMes) : "—"}
            </p>
            <p className="text-xs text-text-muted mt-1">a pagar em maio/26</p>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              Próx. vencimento
            </p>
            {proximoVencimento ? (
              <>
                <p className="text-2xl font-semibold text-text">
                  {formatDayMonth(proximoVencimento.data)}
                </p>
                <p className="text-xs text-text-muted mt-1 truncate">
                  {proximoVencimento.titulo.split(" — ")[0]}
                </p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-text">—</p>
            )}
          </div>
        </div>

        {/* Timeline grouped by month */}
        <div className="space-y-8">
          {Array.from(grouped.entries()).map(([yearMonth, events]) => (
            <section key={yearMonth}>
              {/* Month heading */}
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-semibold text-text">
                  {formatMonthHeading(yearMonth)}
                </h2>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-text-muted">
                  {events.length} {events.length === 1 ? "evento" : "eventos"}
                </span>
              </div>

              {/* Event cards */}
              <div className="space-y-2">
                {events.map((evt) => {
                  const tipoConfig = TIPO_CONFIG[evt.tipo];
                  const statusConfig = STATUS_CONFIG[evt.status];
                  const Icon = tipoConfig.icon;

                  return (
                    <div
                      key={evt.id}
                      className="bg-white border border-border rounded-lg px-4 py-3.5 flex items-center gap-3"
                    >
                      {/* Icon */}
                      <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-text-muted" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text leading-snug truncate">
                          {evt.titulo}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={statusConfig.badge}>
                            {statusConfig.label}
                          </span>
                          <span className="text-xs text-text-muted">
                            {tipoConfig.label}
                          </span>
                          <span className="text-xs text-text-muted">
                            {formatDayMonth(evt.data)}
                          </span>
                        </div>
                      </div>

                      {/* Value */}
                      {evt.valor !== undefined && (
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm font-semibold text-text">
                            {formatCurrency(evt.valor)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
