"use client";

import { LogOut } from "lucide-react";
import { LogoMark } from "@/components/shared/logo-mark";
import { useRouter } from "next/navigation";

type Props = {
  titulo: string;
  subtitulo?: string;
};

export function MobileHeader({ titulo, subtitulo }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div
      className="md:hidden sticky top-0 z-40 bg-white border-b border-border px-4 py-3 flex items-center gap-3"
      style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
    >
      <div className="w-7 h-7 bg-sidebar rounded-md flex items-center justify-center flex-shrink-0 p-1">
        <LogoMark />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text leading-none">{titulo}</p>
        {subtitulo && (
          <p className="text-xs text-text-muted mt-0.5">{subtitulo}</p>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="w-8 h-8 flex items-center justify-center rounded-md text-text-muted hover:text-text hover:bg-surface transition-colors flex-shrink-0"
        aria-label="Sair"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
