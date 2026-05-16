import { FileText, Download, FileCheck, FileSignature, ScrollText, Receipt, BookOpen } from "lucide-react";
import { DOCUMENTOS } from "@/lib/mock-data";
import { formatDate, formatCompetencia } from "@/lib/utils";
import { MobileHeader } from "@/components/portal/mobile-header";

const TIPO_CONFIG = {
  guia: { label: "Guia", icon: FileCheck, badge: "badge-success" },
  relatorio: { label: "Relatório", icon: FileText, badge: "badge-neutral" },
  declaracao: { label: "Declaração", icon: FileSignature, badge: "badge-warning" },
  contrato: { label: "Contrato", icon: ScrollText, badge: "badge-neutral" },
  certidao: { label: "Certidão", icon: FileCheck, badge: "badge-neutral" },
  boleto: { label: "Boleto", icon: Receipt, badge: "badge-warning" },
  ato_constitutivo: { label: "Ato Constitutivo", icon: BookOpen, badge: "badge-neutral" },
};

function formatTamanho(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

export default function DocumentosPage() {
  return (
    <>
      <MobileHeader titulo="Documentos" />
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="hidden md:block mb-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
            Arquivo
          </p>
          <h1 className="text-2xl font-semibold text-text">Documentos</h1>
        </div>

        {/* Mobile: lista de cards */}
        <div className="md:hidden space-y-2">
          {[...DOCUMENTOS].sort((a, b) => {
            const cmp = b.competencia.localeCompare(a.competencia);
            return cmp !== 0 ? cmp : b.enviadoEm.localeCompare(a.enviadoEm);
          }).map((doc) => {
            const config = TIPO_CONFIG[doc.tipo];
            const Icon = config.icon;
            return (
              <div key={doc.id} className="bg-white border border-border rounded-lg px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text leading-snug truncate">
                    {doc.nome}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={config.badge}>{config.label}</span>
                    <span className="text-xs text-text-muted">
                      {formatCompetencia(doc.competencia)}
                    </span>
                  </div>
                </div>
                <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-surface transition-colors">
                  <Download className="w-3.5 h-3.5 text-text-muted" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Desktop: tabela */}
        <div className="hidden md:block bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-semibold text-text">{DOCUMENTOS.length} documentos</p>
          </div>
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Tipo</th>
                <th>Competência</th>
                <th>Enviado em</th>
                <th>Tamanho</th>
                <th className="text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {[...DOCUMENTOS].sort((a, b) => {
                const cmp = b.competencia.localeCompare(a.competencia);
                return cmp !== 0 ? cmp : b.enviadoEm.localeCompare(a.enviadoEm);
              }).map((doc) => {
                const config = TIPO_CONFIG[doc.tipo];
                const Icon = config.icon;
                return (
                  <tr key={doc.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-surface border border-border rounded flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-text-muted" />
                        </div>
                        <span className="font-medium text-text">{doc.nome}</span>
                      </div>
                    </td>
                    <td><span className={config.badge}>{config.label}</span></td>
                    <td className="text-text-muted">{formatCompetencia(doc.competencia)}</td>
                    <td className="text-text-muted">
                      <div>
                        <p>{formatDate(doc.enviadoEm)}</p>
                        <p className="text-xs">{doc.enviadoPor}</p>
                      </div>
                    </td>
                    <td className="text-text-muted">{formatTamanho(doc.tamanhoKb)}</td>
                    <td className="text-right">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-muted border border-border rounded hover:bg-surface hover:text-text transition-colors">
                        <Download className="w-3 h-3" />
                        Baixar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
