/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F4F7FD",
          200: "#E4EBFA",
          300: "#828FA3",
          400: "#3E3F4E",
        },
        main_bkg: "hsl(var(--color-main_bkg) / <alpha-value>)",
        content_bkg: "hsl(var(--color-content_bkg) / <alpha-value>)",
        theme_white: "hsl(var(--white) / <alpha-value>)",
        accent: {
          100: "#A8A4FF",
          300: "#FF9898",
          200: "#635FC7",
          400: "#EA5555",
          500: "#49C4E5",
          600: "#8471F2",
          700: "#67E2AE",
        },
      },
      animation: {
        fadeIn: "appear .5s",
        fadeOut: "vanish .5s",
      },

      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
            transform: "translateX(-5rem)",
          },
          "80%": {
            transform: "translateX(1rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        vanish: {
          "100%": {
            display: "flex",
            opacity: "1",
          },
          "0%": {
            display: "none",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
