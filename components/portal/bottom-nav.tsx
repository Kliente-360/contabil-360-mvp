"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, Calendar, MessageSquare, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/inicio", label: "Início", icon: LayoutDashboard },
  { href: "/relatorios", label: "Relatórios", icon: BarChart2 },
  { href: "/calendario", label: "Agenda", icon: Calendar },
  { href: "/tickets", label: "Suporte", icon: MessageSquare },
  { href: "/documentos", label: "Docs", icon: FileText },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors",
                active ? "text-primary" : "text-text-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
