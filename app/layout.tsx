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
    statusBarStyle: "default",
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
      <body>{children}</body>
    </html>
  );
}
