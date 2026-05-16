"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  BarChart2,
  Calendar,
  FileText,
  MessageSquare,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/inicio", label: "Início", icon: LayoutDashboard },
  { href: "/relatorios", label: "Relatórios", icon: BarChart2 },
  { href: "/calendario", label: "Calendário", icon: Calendar },
  { href: "/documentos", label: "Documentos", icon: FileText },
  { href: "/tickets", label: "Atendimento", icon: MessageSquare },
];

type SidebarProps = {
  clienteNome: string;
  escritorioNome: string;
};

export function Sidebar({ clienteNome, escritorioNome }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex w-60 bg-sidebar flex-col min-h-screen flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-sm font-semibold tracking-tight">
            Contabil 360
          </span>
        </div>
      </div>

      {/* Empresa */}
      <div className="px-5 py-4 border-b border-white/8">
        <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">
          Empresa
        </p>
        <p className="text-white text-sm font-medium leading-snug">{clienteNome}</p>
        <p className="text-white/40 text-xs mt-0.5">{escritorioNome}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/6"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {active && (
                <ChevronRight className="w-3 h-3 ml-auto text-white/30" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/6 transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  );
}
