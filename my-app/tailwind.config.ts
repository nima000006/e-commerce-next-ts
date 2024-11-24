import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner:
          "url('https://www.perfumerh.com/cdn/shop/files/PH_NigelSlater-PANA2941.jpg?v=1730295081&width=720')",
        gift: "url('https://www.perfumerh.com/cdn/shop/files/PerfumerH_CliffordSt_202311-PANA0348.jpg?v=1730295428&width=2133')",
      },
      colors: {
        brown: {
          normal: "#8C7353",
          100: "rgba(140,115,83,.5)",
          light: "#d4af37",
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
