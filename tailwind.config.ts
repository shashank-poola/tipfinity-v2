import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tipfinity: {
          primary: "#2B8CD1",
          dark: "#0E0E0E",
          light: "#B9E6FE",
          bg: "#E0E0E0",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         "meteor-effect": "meteor 5s linear infinite",
//       },
//       keyframes: {
//         meteor: {
//           "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
//           "70%": { opacity: "1" },
//           "100%": {
//             transform: "rotate(215deg) translateX(-500px)",
//             opacity: "0",
//           },
//         },
//       },
//     },
//   },
// };

