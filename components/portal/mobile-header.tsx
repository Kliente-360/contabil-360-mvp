import { Building2 } from "lucide-react";

type Props = {
  titulo: string;
  subtitulo?: string;
};

export function MobileHeader({ titulo, subtitulo }: Props) {
  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b border-border px-4 py-3 flex items-center gap-3"
      style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
    >
      <div className="w-7 h-7 bg-sidebar rounded-md flex items-center justify-center flex-shrink-0">
        <Building2 className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <p className="text-sm font-semibold text-text leading-none">{titulo}</p>
        {subtitulo && (
          <p className="text-xs text-text-muted mt-0.5">{subtitulo}</p>
        )}
      </div>
    </div>
  );
}
