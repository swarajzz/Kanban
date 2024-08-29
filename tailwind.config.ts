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
        background: {
          light: "#FFFFFF",
          "light-secondary": "#F4F7FD",
          dark: "#2B2C37",
          "dark-secondary": "#20212C",
        },
        button: {
          primary: "#635FC7",
          "primary-hover": "#A8A4FF",
          secodary: "#EA5555",
          "secondary-hover": "#FF9898",
          destructive: "#EA5555",
          "destructive-hover": "#FF9898",
        },
        text: {
          light: "#000112",
          "light-muted": "#828FA3",
          dark: "#FFFFFF",
          "dark-muted": "#828FA3",
        },
        fontSize: {
          "heading-xl": "24px",
          "heading-l": "18px",
          "heading-m": "15px",
          "heading-s": "12px",
          "body-l": "13px",
          "body-m": "12px",
        },
      },
    },
  },
  plugins: [],
};
