import { NextResponse } from "next/server";
import { TICKETS } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(TICKETS);
}
