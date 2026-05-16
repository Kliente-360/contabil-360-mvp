import { NextRequest, NextResponse } from "next/server";
import { DRE_DETALHE, DRE_MESES, BALANCO } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get("tipo") ?? "dre";

  if (tipo === "balanco") {
    return NextResponse.json(BALANCO);
  }

  if (tipo === "dre-historico") {
    return NextResponse.json(DRE_MESES);
  }

  return NextResponse.json(DRE_DETALHE);
}
