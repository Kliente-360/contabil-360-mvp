import { MessageSquare, Clock, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TICKETS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  aberto: { label: "Aberto", badge: "badge-error", icon: AlertCircle },
  em_andamento: { label: "Em andamento", badge: "badge-warning", icon: Clock },
  aguardando_cliente: { label: "Aguardando você", badge: "badge-warning", icon: Clock },
  resolvido: { label: "Resolvido", badge: "badge-success", icon: CheckCircle },
  cancelado: { label: "Cancelado", badge: "badge-neutral", icon: CheckCircle },
};

const PRIORIDADE_CONFIG = {
  alta: { label: "Alta", class: "text-error" },
  media: { label: "Média", class: "text-warning" },
  baixa: { label: "Baixa", class: "text-text-muted" },
};

export default function TicketsPage() {
  const abertos = TICKETS.filter((t) => t.status !== "resolvido");
  const resolvidos = TICKETS.filter((t) => t.status === "resolvido");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
            Suporte
          </p>
          <h1 className="text-2xl font-semibold text-text">Atendimento</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-hover transition-colors">
          <MessageSquare className="w-4 h-4" />
          Novo ticket
        </button>
      </div>

      {/* Em aberto */}
      {abertos.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Em aberto ({abertos.length})
          </p>
          <div className="space-y-2">
            {abertos.map((ticket) => {
              const status = STATUS_CONFIG[ticket.status];
              const prioridade = PRIORIDADE_CONFIG[ticket.prioridade];
              const StatusIcon = status.icon;
              return (
                <div
                  key={ticket.id}
                  className="bg-white border border-border rounded-lg px-5 py-4 flex items-center gap-4 hover:border-primary/40 transition-colors cursor-pointer group"
                >
                  <StatusIcon className={cn("w-4 h-4 flex-shrink-0",
                    ticket.status === "resolvido" ? "text-success" :
                    ticket.status === "aberto" ? "text-error" : "text-warning"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">
                      {ticket.titulo}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn("text-xs font-medium", prioridade.class)}>
                        {prioridade.label}
                      </span>
                      <span className="text-xs text-text-muted">{ticket.tipo}</span>
                      <span className="text-xs text-text-muted">
                        {formatDate(ticket.criadoEm)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={status.badge}>{status.label}</span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resolvidos */}
      {resolvidos.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Resolvidos ({resolvidos.length})
          </p>
          <div className="space-y-2">
            {resolvidos.map((ticket) => {
              const prioridade = PRIORIDADE_CONFIG[ticket.prioridade];
              return (
                <div
                  key={ticket.id}
                  className="bg-white border border-border rounded-lg px-5 py-4 flex items-center gap-4 opacity-60 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">
                      {ticket.titulo}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn("text-xs font-medium", prioridade.class)}>
                        {prioridade.label}
                      </span>
                      <span className="text-xs text-text-muted">{ticket.tipo}</span>
                      <span className="text-xs text-text-muted">
                        {formatDate(ticket.criadoEm)}
                      </span>
                    </div>
                  </div>
                  <span className="badge-success flex-shrink-0">Resolvido</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mensagens recentes */}
      <div className="mt-8">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Última mensagem recebida
        </p>
        {TICKETS.filter((t) => t.mensagens.length > 0).slice(0, 1).map((ticket) => {
          const ultima = ticket.mensagens[ticket.mensagens.length - 1];
          const isEscritorio = ultima.autorTipo === "escritorio";
          return (
            <div key={ticket.id} className="bg-white border border-border rounded-lg p-5">
              <p className="text-xs text-text-muted mb-3">{ticket.titulo}</p>
              <div className={cn("p-3 rounded-md text-sm", isEscritorio ? "bg-surface" : "bg-primary-light")}>
                <p className="font-medium text-xs text-text-muted mb-1">{ultima.autor}</p>
                <p className="text-text leading-relaxed">{ultima.conteudo}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
