/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: "#FBF9F3",
          DEFAULT: "#F5F1E8",
          dark: "#E8E0D0",
          border: "#E2D9C8",
        },
        charcoal: {
          light: "#3A3D38",
          DEFAULT: "#252824",
          muted: "#5A5D57",
        },
        sea: {
          green: "#537C70",
          sage: "#879C87",
          moss: "#6F7E65",
          clay: "#B06F52",
          terracotta: "#B86F57",
          ochre: "#C49A55",
          coral: "#C98572",
        }
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Inter", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      boxShadow: {
        editorial: "0 4px 20px -2px rgba(37, 40, 36, 0.05)",
        card: "0 2px 8px 0 rgba(37, 40, 36, 0.04)",
      }
    },
  },
  plugins: [],
}
