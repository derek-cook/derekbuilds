import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        paper: "#e8e8e3",
        ink: "#151515",
        accent: "#FE2525",
        muted: "#686864",
        index: "#e92138",
        status: "#53e75c",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Impact",
          "Arial Narrow",
          "sans-serif",
        ],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
