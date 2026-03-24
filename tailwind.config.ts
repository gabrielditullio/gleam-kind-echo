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
        // New design system tokens
        "plum-dark": "hsl(var(--plum-dark))",
        "plum-default": "hsl(var(--plum-default))",
        "plum-light": "hsl(var(--plum-light))",
        "sand-light": "hsl(var(--sand-light))",
        "sand-default": "hsl(var(--sand-default))",
        "sand-dark": "hsl(var(--sand-dark))",
        "coral-light": "hsl(var(--coral-light))",
        "coral-default": "hsl(var(--coral-default))",
        "coral-dark": "hsl(var(--coral-dark))",
        "sage-light": "hsl(var(--sage-light))",
        "sage-default": "hsl(var(--sage-default))",
        "sage-dark": "hsl(var(--sage-dark))",
        "neutral-50": "hsl(var(--neutral-50))",
        "neutral-100": "hsl(var(--neutral-100))",
        "neutral-200": "hsl(var(--neutral-200))",
        "neutral-400": "hsl(var(--neutral-400))",
        "neutral-600": "hsl(var(--neutral-600))",
        "neutral-800": "hsl(var(--neutral-800))",
        "neutral-950": "hsl(var(--neutral-950))",
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
        "h1-mobile": ["36px", { lineHeight: "1.2" }],
        "h2": ["36px", { lineHeight: "1.2" }],
        "h2-mobile": ["28px", { lineHeight: "1.25" }],
        "h3": ["28px", { lineHeight: "1.25" }],
        "h3-mobile": ["22px", { lineHeight: "1.3" }],
        "h4": ["22px", { lineHeight: "1.3" }],
        "h4-mobile": ["18px", { lineHeight: "1.3" }],
        "h5": ["18px", { lineHeight: "1.4" }],
        "h5-mobile": ["16px", { lineHeight: "1.4" }],
        "body": ["17px", { lineHeight: "1.65" }],
        "body-mobile": ["16px", { lineHeight: "1.65" }],
        "body-small": ["15px", { lineHeight: "1.6" }],
        "caption": ["13px", { lineHeight: "1.5" }],
        "overline": ["12px", { lineHeight: "1.4" }],
        "button": ["15px", { lineHeight: "1" }],
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
