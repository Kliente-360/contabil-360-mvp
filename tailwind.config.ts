import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F9FAFB",
        sidebar: "#111827",
        primary: {
          DEFAULT: "#166534",
          light: "#DCFCE7",
          hover: "#14532D",
        },
        text: {
          DEFAULT: "#111827",
          muted: "#6B7280",
        },
        border: "#E5E7EB",
        success: "#16A34A",
        warning: "#D97706",
        error: "#DC2626",
        // shadcn compatibility
        foreground: "#111827",
        card: { DEFAULT: "#FFFFFF", foreground: "#111827" },
        popover: { DEFAULT: "#FFFFFF", foreground: "#111827" },
        muted: { DEFAULT: "#F9FAFB", foreground: "#6B7280" },
        accent: { DEFAULT: "#DCFCE7", foreground: "#166534" },
        destructive: { DEFAULT: "#DC2626", foreground: "#FFFFFF" },
        input: "#E5E7EB",
        ring: "#166534",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
