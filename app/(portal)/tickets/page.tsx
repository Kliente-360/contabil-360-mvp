import { MessageSquare, Clock, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { TICKETS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { MobileHeader } from "@/components/portal/mobile-header";

const STATUS_CONFIG = {
  aberto: { label: "Aberto", badge: "badge-error", icon: AlertCircle },
  em_andamento: { label: "Em andamento", badge: "badge-warning", icon: Clock },
  aguardando_cliente: { label: "Aguardando você", badge: "badge-warning", icon: Clock },
  resolvido: { label: "Resolvido", badge: "badge-success", icon: CheckCircle },
};

const PRIORIDADE_CONFIG = {
  alta: { label: "Alta", class: "text-error" },
  media: { label: "Média", class: "text-warning" },
  baixa: { label: "Baixa", class: "text-text-muted" },
};

export default function TicketsPage() {
  const abertos = TICKETS.filter((t) => t.status !== "resolvido");
  const resolvidos = TICKETS.filter((t) => t.status === "resolvido");
  const ultimaMensagem = TICKETS.find((t) => t.mensagens.length > 0);

  return (
    <>
      <MobileHeader titulo="Atendimento" />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="hidden md:flex items-start justify-between mb-8">
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

        {/* Botão mobile */}
        <button className="md:hidden w-full flex items-center justify-center gap-2 py-3 mb-4 bg-primary text-white text-sm font-medium rounded-lg">
          <MessageSquare className="w-4 h-4" />
          Novo ticket
        </button>

        {/* Em aberto */}
        {abertos.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2.5">
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
                    className="bg-white border border-border rounded-lg px-4 py-3.5 flex items-start gap-3 cursor-pointer hover:border-primary/40 transition-colors group"
                  >
                    <StatusIcon className={cn("w-4 h-4 flex-shrink-0 mt-0.5",
                      ticket.status === "aberto" ? "text-error" : "text-warning"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text leading-snug">
                        {ticket.titulo}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={status.badge}>{status.label}</span>
                        <span className={cn("text-xs font-medium", prioridade.class)}>
                          {prioridade.label}
                        </span>
                        <span className="text-xs text-text-muted">{ticket.tipo}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {formatDate(ticket.criadoEm)}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5 group-hover:text-text transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resolvidos */}
        {resolvidos.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2.5">
              Resolvidos ({resolvidos.length})
            </p>
            <div className="space-y-2">
              {resolvidos.map((ticket) => {
                const prioridade = PRIORIDADE_CONFIG[ticket.prioridade];
                return (
                  <div
                    key={ticket.id}
                    className="bg-white border border-border rounded-lg px-4 py-3.5 flex items-start gap-3 opacity-60 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text leading-snug">{ticket.titulo}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="badge-success">Resolvido</span>
                        <span className={cn("text-xs font-medium", prioridade.class)}>
                          {prioridade.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Última mensagem */}
        {ultimaMensagem && (
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2.5">
              Última mensagem
            </p>
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-xs text-text-muted mb-3">{ultimaMensagem.titulo}</p>
              {ultimaMensagem.mensagens.slice(-1).map((msg) => {
                const isEscritorio = msg.autorTipo === "escritorio";
                return (
                  <div
                    key={msg.id}
                    className={cn("p-3 rounded-lg text-sm", isEscritorio ? "bg-surface" : "bg-primary-light")}
                  >
                    <p className="font-medium text-xs text-text-muted mb-1">{msg.autor}</p>
                    <p className="text-text leading-relaxed">{msg.conteudo}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
