/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PizzaFont : 'Roboto mono, monospace',
      },
      colors: {
        orange: {
          600: "#EA580C",
        },
        yellow: {
          200: "#FEF08A",
        },
        red: {
          500: "#EF4444",
        },
        gray: {
          600: "#4B5563",
        },
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
};
