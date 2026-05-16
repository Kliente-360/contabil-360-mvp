import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const w = parseInt(searchParams.get("w") ?? "1170");
  const h = parseInt(searchParams.get("h") ?? "2532");

  // Diamond logo — same proportions as apple-icon (box=120, r=20 at 180px canvas)
  const box = 240;
  const r = 40;

  return new ImageResponse(
    <div
      style={{
        width: w,
        height: h,
        background: "#111827",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Diamond: 4 white circles, same geometry as apple-icon */}
      <div style={{ position: "relative", width: box, height: box, display: "flex" }}>
        {/* North  — center (120, 40) */}
        <div style={{ position: "absolute", width: r * 2, height: r * 2, borderRadius: r, background: "white", top: 0, left: box / 2 - r }} />
        {/* East   — center (200, 120) */}
        <div style={{ position: "absolute", width: r * 2, height: r * 2, borderRadius: r, background: "white", top: box / 2 - r, left: box - r * 2 }} />
        {/* South  — center (120, 200) */}
        <div style={{ position: "absolute", width: r * 2, height: r * 2, borderRadius: r, background: "white", top: box - r * 2, left: box / 2 - r }} />
        {/* West   — center (40, 120) */}
        <div style={{ position: "absolute", width: r * 2, height: r * 2, borderRadius: r, background: "white", top: box / 2 - r, left: 0 }} />
      </div>

      <div style={{ height: 48, display: "flex" }} />

      <p style={{
        color: "rgba(255,255,255,0.85)",
        fontSize: 52,
        fontWeight: 600,
        margin: 0,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "-0.5px",
      }}>
        Contabil 360
      </p>
    </div>,
    { width: w, height: h }
  );
}
