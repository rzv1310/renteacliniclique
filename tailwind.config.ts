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
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        handwriting: ["Pacifico", "cursive"],
      },
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
        // Custom luxury colors
        "rose-gold": "hsl(var(--rose-gold))",
        "rose-gold-light": "hsl(var(--rose-gold-light))",
        champagne: "hsl(var(--champagne))",
        "champagne-light": "hsl(var(--champagne-light))",
        ivory: "hsl(var(--ivory))",
        "warm-white": "hsl(var(--warm-white))",
        "deep-brown": "hsl(var(--deep-brown))",
        "soft-brown": "hsl(var(--soft-brown))",
        "deep-bg": "hsl(var(--deep-bg))",
        "dark-neutral": "hsl(var(--dark-neutral))",
        "light-grey": "hsl(var(--light-grey))",
        "luxury-brown": "hsl(var(--luxury-brown))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "glow-travel": {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },

        // Timeline (augmentare mamara) – sequential segments across a single loop
        "glow-travel-seg-0": {
          "0%": { left: "0%", opacity: "0" },
          "6%": { opacity: "1" },
          "30%": { left: "100%", opacity: "1" },
          "33%": { left: "100%", opacity: "0" },
          "34%": { left: "0%", opacity: "0" },
          "100%": { left: "0%", opacity: "0" },
        },
        "glow-travel-seg-1": {
          "0%": { left: "0%", opacity: "0" },
          "33%": { left: "0%", opacity: "0" },
          "39%": { opacity: "1" },
          "63%": { left: "100%", opacity: "1" },
          "66%": { left: "100%", opacity: "0" },
          "67%": { left: "0%", opacity: "0" },
          "100%": { left: "0%", opacity: "0" },
        },
        "glow-travel-seg-2": {
          "0%": { left: "0%", opacity: "0" },
          "66%": { left: "0%", opacity: "0" },
          "72%": { opacity: "1" },
          "96%": { left: "100%", opacity: "1" },
          "99%": { left: "100%", opacity: "0" },
          "100%": { left: "0%", opacity: "0" },
        },

        "pulse-step-0": {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "4%": { transform: "scale(1.08)", boxShadow: "0 0 20px 8px rgba(212, 175, 155, 0.55)" },
          "8%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
        },
        "pulse-step-1": {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "30%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "34%": { transform: "scale(1.08)", boxShadow: "0 0 20px 8px rgba(212, 175, 155, 0.55)" },
          "38%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
        },
        "pulse-step-2": {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "63%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "67%": { transform: "scale(1.08)", boxShadow: "0 0 20px 8px rgba(212, 175, 155, 0.55)" },
          "71%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
        },
        "pulse-step-3": {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "96%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
          "99%": { transform: "scale(1.08)", boxShadow: "0 0 20px 8px rgba(212, 175, 155, 0.55)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 155, 0)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            filter: "drop-shadow(0 0 15px rgba(183, 110, 121, 0.5))",
          },
          "50%": { 
            filter: "drop-shadow(0 0 25px rgba(183, 110, 121, 0.8))",
          },
        },
        "glow-wave-0": {
          "0%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "5%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "10%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "15%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "100%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
        },
        "glow-wave-1": {
          "0%, 25%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "30%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "35%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "40%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "100%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
        },
        "glow-wave-2": {
          "0%, 50%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "55%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "60%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "65%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "100%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
        },
        "glow-wave-3": {
          "0%, 75%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "80%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "85%": { filter: "drop-shadow(0 0 30px rgba(183, 110, 121, 0.9))", opacity: "1" },
          "90%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
          "100%": { filter: "drop-shadow(0 0 8px rgba(183, 110, 121, 0.25))", opacity: "0.65" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "glow-travel": "glow-travel 3s ease-in-out infinite",

        "glow-travel-seg-0": "glow-travel-seg-0 9s ease-in-out infinite",
        "glow-travel-seg-1": "glow-travel-seg-1 9s ease-in-out infinite",
        "glow-travel-seg-2": "glow-travel-seg-2 9s ease-in-out infinite",

        "pulse-step-0": "pulse-step-0 9s ease-in-out infinite",
        "pulse-step-1": "pulse-step-1 9s ease-in-out infinite",
        "pulse-step-2": "pulse-step-2 9s ease-in-out infinite",
        "pulse-step-3": "pulse-step-3 9s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "glow-wave-0": "glow-wave-0 10s ease-in-out infinite",
        "glow-wave-1": "glow-wave-1 10s ease-in-out infinite",
        "glow-wave-2": "glow-wave-2 10s ease-in-out infinite",
        "glow-wave-3": "glow-wave-3 10s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
