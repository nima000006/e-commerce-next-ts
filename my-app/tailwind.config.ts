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
        brown: {
          normal: "#8C7353",
          100: "rgba(140,115,83,.5)",
        },
        white: {
          normal: "#fafafa",
          100: "rgba(250,250,250,.8)",
        },
        gray: {
          light: "#e9e9eb",
        },
      },
    },
  },
  plugins: [],
};

export default config;
