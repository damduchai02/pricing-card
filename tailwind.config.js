/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', "sans-serif"],
      },
      backgroundImage: {
        ocean: "url('/src/images/ocean.png')",
        mountain: "url('/src/images/mountain.png')",
        forest: "url('/src/images/forest.png')",
      },
    },
  },
  plugins: [],
};
