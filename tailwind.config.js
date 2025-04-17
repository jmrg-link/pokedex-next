/**
 * Tailwind CSS v4 – configuración principal
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      /* Alto mínimo: 100 dvh para cubrir siempre la ventana */
      minHeight: {
        dvh: "100dvh",
      },

      /* Colores de marca reutilizables */
      colors: {
        brand: {
          blue: "#2563eb",
          gold: "#facc15",
        },
      },
    },
  },

  plugins: [],
};
