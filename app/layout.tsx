import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Contabil 360",
  description: "Portal financeiro para empresas",
  appleWebApp: {
    capable: true,
    title: "Contabil 360",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* iOS splash screens — one per device resolution */}
        <link rel="apple-touch-startup-image" href="/api/splash?w=750&h=1334"   media="(device-width:375px) and (device-height:667px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/api/splash?w=1125&h=2436"  media="(device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/api/splash?w=1170&h=2532"  media="(device-width:390px) and (device-height:844px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/api/splash?w=1179&h=2556"  media="(device-width:393px) and (device-height:852px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/api/splash?w=1284&h=2778"  media="(device-width:428px) and (device-height:926px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/api/splash?w=1290&h=2796"  media="(device-width:430px) and (device-height:932px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/api/splash?w=1206&h=2622"  media="(device-width:402px) and (device-height:874px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/api/splash?w=1320&h=2868"  media="(device-width:440px) and (device-height:956px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait)" />
      </head>
      <body>{children}</body>
    </html>
  );
}
