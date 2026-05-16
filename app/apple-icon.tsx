import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// 4 white circles on dark background forming a diamond.
// r=20, L=40 → center void fits exactly 1 more circle, 30px padding each edge.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: "#111827",
        display: "flex",
        position: "relative",
      }}
    >
      {/* North  — center (90, 50) */}
      <div style={{ position: "absolute", width: 40, height: 40, borderRadius: 20, background: "white", top: 30, left: 70 }} />
      {/* East   — center (130, 90) */}
      <div style={{ position: "absolute", width: 40, height: 40, borderRadius: 20, background: "white", top: 70, left: 110 }} />
      {/* South  — center (90, 130) */}
      <div style={{ position: "absolute", width: 40, height: 40, borderRadius: 20, background: "white", top: 110, left: 70 }} />
      {/* West   — center (50, 90) */}
      <div style={{ position: "absolute", width: 40, height: 40, borderRadius: 20, background: "white", top: 70, left: 30 }} />
    </div>,
    { width: 180, height: 180 }
  );
}
