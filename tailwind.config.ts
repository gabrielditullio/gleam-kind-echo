import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // FDC custom tokens
        "marrom-escuro": "hsl(var(--marrom-escuro))",
        "marrom-medio": "hsl(var(--marrom-medio))",
        "terroso": "hsl(var(--terroso))",
        "dourado": "hsl(var(--dourado))",
        "dourado-claro": "hsl(var(--dourado-claro))",
        "bege-areia": "hsl(var(--bege-areia))",
        "bege-claro": "hsl(var(--bege-claro))",
        "off-white": "hsl(var(--off-white))",
        "fundo-escuro": "hsl(var(--fundo-escuro))",
        "fundo-escuro-2": "hsl(var(--fundo-escuro-2))",
        "verde-musgo": "hsl(var(--verde-musgo))",
        "vermelho-terroso": "hsl(var(--vermelho-terroso))",
        "texto-corpo": "hsl(var(--texto-corpo))",
        "texto-secundario": "hsl(var(--texto-secundario))",
        "texto-cinza": "hsl(var(--texto-cinza))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        "content": "1200px",
        "text": "680px",
        "cards": "1080px",
      },
      spacing: {
        "section-desktop": "120px",
        "section-mobile": "64px",
      },
      fontSize: {
        "h1": ["48px", { lineHeight: "1.15" }],
        "h1-mobile": ["32px", { lineHeight: "1.2" }],
        "h2": ["36px", { lineHeight: "1.2" }],
        "h2-mobile": ["28px", { lineHeight: "1.25" }],
        "h3": ["24px", { lineHeight: "1.3" }],
        "h3-mobile": ["20px", { lineHeight: "1.3" }],
        "body": ["18px", { lineHeight: "1.7" }],
        "body-mobile": ["16px", { lineHeight: "1.65" }],
        "small": ["14px", { lineHeight: "1.4" }],
        "micro": ["12px", { lineHeight: "1.4" }],
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
} satisfies Config;
