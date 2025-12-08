import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export const screens = {
  ...defaultTheme.screens,
}

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Figtree",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      screens
    },
  },
  plugins: [],
} satisfies Config;
