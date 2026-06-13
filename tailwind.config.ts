import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "eco-black": "#050a05",
        "eco-dark": "#080f08",
        "eco-surface": "#0d1a0d",
        "eco-card": "#111f11",
        "eco-green": {
          50: "#f0fff0",
          100: "#dcffe4",
          200: "#b9ffc8",
          300: "#7dffaa",
          400: "#39f77d",
          500: "#00e05a",
          600: "#00b845",
          700: "#009137",
          800: "#007130",
          900: "#005a28",
        },
        "neon-green": "#00ff88",
        "neon-blue": "#00d4ff",
        "eco-muted": "#1a2e1a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "eco-gradient": "linear-gradient(135deg, #050a05 0%, #0a1f0a 50%, #050a05 100%)",
        "neon-gradient": "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(0,212,255,0.05) 100%)",
        "hero-gradient": "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "neon-sm": "0 0 10px rgba(0, 255, 136, 0.3)",
        "neon-md": "0 0 25px rgba(0, 255, 136, 0.4)",
        "neon-lg": "0 0 50px rgba(0, 255, 136, 0.5)",
        "neon-xl": "0 0 80px rgba(0, 255, 136, 0.6)",
        "glass": "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.5)",
        "card": "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "counter": "counter 2s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseNeon: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 136, 0.8)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
