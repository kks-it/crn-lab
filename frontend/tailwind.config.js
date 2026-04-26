/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12263f",
        navy: "#17345f",
        slate: "#5f7086",
        mist: "#eff3f7",
        pearl: "#fbfcfe",
        line: "#d5dde8",
        accent: "#8e6b3f",
        accentSoft: "#f4ede2",
        success: "#2f6c5d",
      },
      boxShadow: {
        card: "0 20px 60px rgba(18, 38, 63, 0.08)",
        soft: "0 12px 30px rgba(23, 52, 95, 0.08)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(142, 107, 63, 0.12), transparent 35%), linear-gradient(135deg, rgba(23, 52, 95, 0.98), rgba(18, 38, 63, 0.98))",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        rise: "rise 0.6s ease-out both",
        sweep: "sweep 0.45s ease-out both",
      },
      fontFamily: {
        display: ['"Libre Baskerville"', "Georgia", "serif"],
        sans: ['"Source Sans 3"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
