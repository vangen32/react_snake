/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#73BBA3",
        secondary: "#F6FB7A",
        "green-1": "#B4E380",
        "green-2": "#88D66C",
      },
    },
  },
  plugins: [],
};
