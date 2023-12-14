import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        stdGreen: "#52A842",
        stdLimeGreen: "#62C656",
        stdRichBlack: "#1A202C",
        stdSteelBlue: "#475569",
        stdLightCoral: "#F56565",
        stdSteelBlue2: "#3182CE",
        stdMediumPurple: "#805AD5",
        stdYellow: "#F6E05E",
        stdTurquoise: "#4FD1C5",
        stdSlateGray: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
export default config;
