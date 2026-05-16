import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#111827",
        display: "flex",
        position: "relative",
        borderRadius: 4,
      }}
    >
      {/* North  — center (16, 8) */}
      <div style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, background: "white", top: 4, left: 12 }} />
      {/* East   — center (24, 16) */}
      <div style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, background: "white", top: 12, left: 20 }} />
      {/* South  — center (16, 24) */}
      <div style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, background: "white", top: 20, left: 12 }} />
      {/* West   — center (8, 16) */}
      <div style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, background: "white", top: 12, left: 4 }} />
    </div>,
    { width: 32, height: 32 }
  );
}
