/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./src/User/LoginForm.js",
    "./src/User/Signup.js",
    "./src/Components/topNavbar.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "byob-cyan": "#dfebe9",
      },
    },
  },
  plugins: [],
};
