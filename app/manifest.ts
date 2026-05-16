import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Contabil 360",
    short_name: "C360",
    description: "Portal financeiro para empresas",
    start_url: "/inicio",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#111827",
    orientation: "portrait",
    icons: [
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
  };
}
