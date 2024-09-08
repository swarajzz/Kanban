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
        // background: {
        //   light: "#FFFFFF",
        //   "light-2": "#F4F7FD",
        //   dark: "#2B2C37",
        //   "dark-2": "#20212C",
        // },
        // button: {
        //   primary: "#635FC7",
        //   "primary-hover": "#A8A4FF",
        //   secodary: "#EA5555",
        //   "secondary-hover": "#FF9898",
        //   destructive: "#EA5555",
        //   "destructive-hover": "#FF9898",
        // },
        // text: {
        //   "light": "#FFFFFF",
        //   "metallic-grey": "#828FA3",
        //   "dark": "#000112",
        // },
        // fontSize: {
        //   "heading-xl": "24px",  //2xl
        //   "heading-l": "18px",  //xl
        //   "heading-m": "15px", //sm
        //   "body-l": "13px",    //
        //   "body-m": "12px",
        // },
        primary: {
          100: "#F4F7FD",
          200: "#E4EBFA",
          300: "#828FA3",
          400: "#3E3F4E",
          500: "#2B2C37",
          600: "#20212C",
        },
        accent: {
          100: "#A8A4FF",
          300: "#FF9898",
          200: "#635FC7",
          400: "#EA5555",
        },
      },
    },
  },
  plugins: [],
};
