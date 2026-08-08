/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6F1EB",
          soft: "#FBF8F4",
          deep: "#EDE4D8",
        },
        ink: {
          DEFAULT: "#2B2622",
          soft: "#4A433D",
        },
        rose: {
          50: "#FBF1EF",
          100: "#F1DCDD",
          200: "#E5C2C4",
          300: "#D9A8AE",
          400: "#C98F97",
          500: "#B8828A",
          600: "#9C5D68",
          700: "#7E4750",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      boxShadow: {
        soft: "0 20px 60px -25px rgba(43, 38, 34, 0.25)",
        card: "0 12px 40px -20px rgba(43, 38, 34, 0.18)",
      },
      backgroundImage: {
        "rose-gradient": "linear-gradient(135deg, #D9A8AE 0%, #B8828A 55%, #9C5D68 100%)",
        "rose-gradient-soft": "linear-gradient(180deg, rgba(43,38,34,0) 0%, rgba(43,38,34,0.55) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};