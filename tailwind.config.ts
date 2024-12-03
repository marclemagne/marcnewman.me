import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        // Tailwind does not have support for the `clamp` function
        clamp: "clamp(2.25rem, 10vw, 8rem)", // text-4xl -> text-9xl
      },
      screens: {
        xs: "320px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
} satisfies Config;
