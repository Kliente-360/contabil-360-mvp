"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft, ChevronRight,
  Receipt, Users, UserCheck, Building2, FileText, Calendar, AlertCircle,
} from "lucide-react";
import { EVENTOS_CALENDARIO, type EventoCalendario } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { MobileHeader } from "@/components/portal/mobile-header";
import { cn } from "@/lib/utils";

// ─── Config ──────────────────────────────────────────────────────────────────

const TIPO_CONFIG: Record<EventoCalendario["tipo"], { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  das: { label: "DAS", icon: Receipt },
  folha: { label: "Folha", icon: Users },
  prolabore: { label: "Pró-labore", icon: UserCheck },
  contabilidade: { label: "Contabilidade", icon: Building2 },
  obrigacao: { label: "Obrigação", icon: FileText },
  reuniao: { label: "Reunião", icon: Calendar },
};

const STATUS_CONFIG: Record<EventoCalendario["status"], { badge: string; label: string }> = {
  pago: { badge: "badge-success", label: "Pago" },
  pendente: { badge: "badge-warning", label: "Pendente" },
  vencido: { badge: "badge-error", label: "Vencido" },
  agendado: { badge: "badge-neutral", label: "Agendado" },
};

const DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const MES_NOMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const MES_ABREV = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function firstWeekdayOfMonth(year: number, month: number) {
  // 0 = Monday, 6 = Sunday (Monday-first)
  const d = new Date(year, month - 1, 1).getDay();
  return (d + 6) % 7;
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatDayMonth(data: string) {
  const day = data.slice(8, 10);
  const m = parseInt(data.slice(5, 7)) - 1;
  return `${day}/${MES_ABREV[m]}`;
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────

type MiniCalProps = {
  year: number;
  month: number;
  events: EventoCalendario[];
  selectedDate: string | null;
  hoje: string;
  onSelectDate: (d: string | null) => void;
  onPrev: () => void;
  onNext: () => void;
};

function MiniCalendario({ year, month, events, selectedDate, hoje, onSelectDate, onPrev, onNext }: MiniCalProps) {
  const totalDays = daysInMonth(year, month);
  const startOffset = firstWeekdayOfMonth(year, month);
  const totalCells = Math.ceil((startOffset + totalDays) / 7) * 7;

  const eventsByDay = useMemo(() => {
    const map: Record<string, EventoCalendario[]> = {};
    events.forEach((e) => {
      if (!map[e.data]) map[e.data] = [];
      map[e.data].push(e);
    });
    return map;
  }, [events]);

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface transition-colors">
          <ChevronLeft className="w-4 h-4 text-text-muted" />
        </button>
        <p className="text-sm font-semibold text-text">
          {MES_NOMES[month - 1]} {year}
        </p>
        <button onClick={onNext} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface transition-colors">
          <ChevronRight className="w-4 h-4 text-text-muted" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-text-muted py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - startOffset + 1;
          if (dayNum < 1 || dayNum > totalDays) {
            return <div key={i} />;
          }
          const dateStr = toDateStr(year, month, dayNum);
          const dayEvents = eventsByDay[dateStr] ?? [];
          const isToday = dateStr === hoje;
          const isSelected = dateStr === selectedDate;
          const hasPendente = dayEvents.some(e => e.status === "pendente" || e.status === "vencido");
          const hasPago = dayEvents.some(e => e.status === "pago" || e.status === "agendado");

          return (
            <button
              key={i}
              onClick={() => onSelectDate(isSelected ? null : dateStr)}
              className={cn(
                "flex flex-col items-center py-1 rounded-md transition-colors relative",
                isSelected ? "bg-primary text-white" : isToday ? "bg-primary-light text-primary font-semibold" : "hover:bg-surface text-text",
                dayEvents.length === 0 && "cursor-default"
              )}
            >
              <span className="text-xs leading-none">{dayNum}</span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {hasPendente && <span className={cn("w-1 h-1 rounded-full", isSelected ? "bg-white" : "bg-warning")} />}
                  {hasPago && <span className={cn("w-1 h-1 rounded-full", isSelected ? "bg-white/70" : "bg-success")} />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1 text-[10px] text-text-muted">
          <span className="w-2 h-2 rounded-full bg-warning inline-block" />
          Pendente/Vencido
        </div>
        <div className="flex items-center gap-1 text-[10px] text-text-muted">
          <span className="w-2 h-2 rounded-full bg-success inline-block" />
          Pago/Agendado
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarioPage() {
  const HOJE = "2026-05-16";
  const [displayYear, setDisplayYear] = useState(2026);
  const [displayMonth, setDisplayMonth] = useState(5);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function prevMonth() {
    if (displayMonth === 1) { setDisplayMonth(12); setDisplayYear(y => y - 1); }
    else setDisplayMonth(m => m - 1);
    setSelectedDate(null);
  }
  function nextMonth() {
    if (displayMonth === 12) { setDisplayMonth(1); setDisplayYear(y => y + 1); }
    else setDisplayMonth(m => m + 1);
    setSelectedDate(null);
  }

  // Stat cards — computed from all events
  const emAberto = EVENTOS_CALENDARIO.filter(e => e.status === "pendente" || e.status === "vencido").length;
  const mesMesAtual = HOJE.slice(0, 7); // "2026-05"
  const mesAnterior = displayMonth === 1
    ? `${displayYear - 1}-12`
    : `${displayYear}-${String(displayMonth - 1).padStart(2, "0")}`;

  const totalAPagarMes = EVENTOS_CALENDARIO
    .filter(e => (e.status === "pendente" || e.status === "vencido") && e.data.startsWith(mesMesAtual) && e.valor)
    .reduce((s, e) => s + (e.valor ?? 0), 0);
  const totalPagoAnterior = EVENTOS_CALENDARIO
    .filter(e => e.status === "pago" && e.data.startsWith(mesAnterior) && e.valor)
    .reduce((s, e) => s + (e.valor ?? 0), 0);

  const proximoVencimento = EVENTOS_CALENDARIO
    .filter(e => (e.status === "pendente" || e.status === "agendado") && e.data >= HOJE)
    .sort((a, b) => a.data.localeCompare(b.data))[0] ?? null;

  function fmtK(val: number) {
    return val >= 1000
      ? `R$ ${(val / 1000).toFixed(1).replace(".", ",")}k`
      : `R$ ${val.toFixed(0)}`;
  }

  // Events for the displayed month
  const displayKey = `${displayYear}-${String(displayMonth).padStart(2, "0")}`;
  const eventsInMonth = EVENTOS_CALENDARIO
    .filter(e => e.data.startsWith(displayKey))
    .sort((a, b) => a.data.localeCompare(b.data));

  // Events to show in list (filtered by selected date if any)
  const eventsToShow = selectedDate
    ? EVENTOS_CALENDARIO.filter(e => e.data === selectedDate)
    : eventsInMonth;

  return (
    <>
      <MobileHeader titulo="Calendário Fiscal" subtitulo="Obrigações e pagamentos" />

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Desktop heading */}
        <div className="hidden md:block mb-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Fiscal</p>
          <h1 className="text-2xl font-semibold text-text">Calendário Fiscal</h1>
          <p className="text-sm text-text-muted mt-1">Obrigações e pagamentos</p>
        </div>

        {/* Stat cards — 2×2 grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-6">
          {/* Em aberto */}
          <div className="bg-white border border-border rounded-lg p-3 md:p-4">
            <p className="text-[10px] md:text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">Em aberto</p>
            <div className="flex items-end gap-1.5">
              <p className="text-2xl font-semibold text-text">{emAberto}</p>
              {emAberto > 0 && <AlertCircle className="w-3.5 h-3.5 text-warning mb-0.5" />}
            </div>
            <p className="text-[10px] md:text-xs text-text-muted mt-1">
              {emAberto === 1 ? "obrigação" : "obrigações"}
            </p>
          </div>

          {/* Próx. vencimento */}
          <div className="bg-white border border-border rounded-lg p-3 md:p-4">
            <p className="text-[10px] md:text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">Próx. venc.</p>
            {proximoVencimento ? (
              <>
                <p className="text-2xl font-semibold text-text tabular-nums">
                  {formatDayMonth(proximoVencimento.data)}
                </p>
                <p className="text-[10px] md:text-xs text-text-muted mt-1 truncate">
                  {proximoVencimento.titulo.split(" — ")[0]}
                </p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-text">—</p>
            )}
          </div>

          {/* Pago mês anterior */}
          <div className="bg-white border border-border rounded-lg p-3 md:p-4">
            <p className="text-[10px] md:text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              Pago — {MES_ABREV[parseInt(mesAnterior.slice(5, 7)) - 1]}/{mesAnterior.slice(2, 4)}
            </p>
            <p className="text-2xl font-semibold text-success tabular-nums">
              {totalPagoAnterior > 0 ? fmtK(totalPagoAnterior) : "—"}
            </p>
            <p className="text-[10px] md:text-xs text-text-muted mt-1">mês anterior</p>
          </div>

          {/* A pagar este mês */}
          <div className="bg-white border border-border rounded-lg p-3 md:p-4">
            <p className="text-[10px] md:text-xs font-medium text-text-muted uppercase tracking-wider mb-1.5">
              A pagar — {MES_ABREV[parseInt(mesMesAtual.slice(5, 7)) - 1]}/{mesMesAtual.slice(2, 4)}
            </p>
            <p className="text-2xl font-semibold text-text tabular-nums">
              {totalAPagarMes > 0 ? fmtK(totalAPagarMes) : "—"}
            </p>
            <p className="text-[10px] md:text-xs text-text-muted mt-1">pendente este mês</p>
          </div>
        </div>

        {/* Mini calendar */}
        <MiniCalendario
          year={displayYear}
          month={displayMonth}
          events={EVENTOS_CALENDARIO}
          selectedDate={selectedDate}
          hoje={HOJE}
          onSelectDate={setSelectedDate}
          onPrev={prevMonth}
          onNext={nextMonth}
        />

        {/* List header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-text">
            {selectedDate
              ? `Eventos em ${formatDayMonth(selectedDate)}`
              : `${MES_NOMES[displayMonth - 1]} ${displayYear}`}
          </p>
          {selectedDate && (
            <button onClick={() => setSelectedDate(null)} className="text-xs text-text-muted hover:text-primary transition-colors">
              Ver todos do mês
            </button>
          )}
          {!selectedDate && eventsToShow.length > 0 && (
            <span className="text-xs text-text-muted">{eventsToShow.length} eventos</span>
          )}
        </div>

        {/* Event list */}
        {eventsToShow.length === 0 ? (
          <div className="bg-white border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-text-muted">Nenhum evento neste período.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {eventsToShow.map((evt) => {
              const tipoConfig = TIPO_CONFIG[evt.tipo];
              const statusConfig = STATUS_CONFIG[evt.status];
              const Icon = tipoConfig.icon;
              return (
                <div
                  key={evt.id}
                  className="bg-white border border-border rounded-lg px-4 py-3.5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text leading-snug truncate">{evt.titulo}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={statusConfig.badge}>{statusConfig.label}</span>
                      <span className="text-xs text-text-muted">{tipoConfig.label}</span>
                      <span className="text-xs text-text-muted">{formatDayMonth(evt.data)}</span>
                    </div>
                  </div>
                  {evt.valor !== undefined && (
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-semibold text-text tabular-nums">
                        {formatCurrency(evt.valor)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
