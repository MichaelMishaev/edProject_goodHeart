import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "action-teal": "#2DD4BF",
        "sunny-yellow": "#FDE047",
        "energetic-orange": "#FB923C",
        "kind-purple": "#A78BFA",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      fontFamily: {
        heebo: ["var(--font-heebo)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
