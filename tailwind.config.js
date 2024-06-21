/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      overflow: {
        'none': 'hidden',
      },
      boxShadow: {
        '3xl': '0px 0px 60px -12px rgb(0 0 0 / 0.25)',
        'md2': '0px 0px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      colors: {
        primaryColor: '#282a57',
        secondaryColor: '#e4e4e4',
      },
      spacing: {
        '110vh': '110vh',
      },
      zIndex: {
        '30': '30',
        '20': '20',
        '10': '10',
        '0': '0',
      },
      rotate: {
        '360': '360deg',
      },
    },
    fontFamily: {
      caveat: ["Caveat", "cursive"],
      poetsen: ["Poetsen One", "sans-serif"],
      lobster: ["Lobster", "sans-serif"],
      teko: ["Teko", "sans-serif"],
      inter: ["Inter", "sans-serif"]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
};

