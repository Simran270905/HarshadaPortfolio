/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        netflix: {
          red:     "#E50914",
          dark:    "#141414",
          darker:  "#0A0A0A",
          card:    "#1A1A1A",
          hover:   "#2A2A2A",
          text:    "#E5E5E5",
          muted:   "#808080",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "fade-up":   "fadeUp 0.5s ease forwards",
        "scale-in":  "scaleIn 0.3s ease forwards",
        "shimmer":   "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp:   { "0%": { opacity: 0, transform: "translateY(20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        scaleIn:  { "0%": { opacity: 0, transform: "scale(0.95)" },      "100%": { opacity: 1, transform: "scale(1)" } },
        shimmer:  { "0%": { backgroundPosition: "-200% 0" },              "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};