/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/User/LoginForm.js",
    "./src/User/Signup.js",
    "./src/Components/topNavbar.jsx",
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
