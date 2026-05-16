import { NextResponse } from "next/server";
import { getKPIsMesAtual, DRE_MESES, TICKETS } from "@/lib/mock-data";

export async function GET() {
  const kpis = getKPIsMesAtual();
  const ticketsAbertos = TICKETS.filter(
    (t) => t.status === "aberto" || t.status === "em_andamento" || t.status === "aguardando_cliente"
  ).length;

  return NextResponse.json({
    kpis,
    evolucaoReceita: DRE_MESES.map((m) => ({
      mes: m.mesLabel,
      receita: m.receita,
      ebitda: m.ebitda,
      lucroLiquido: m.lucroLiquido,
    })),
    ticketsAbertos,
  });
}
