

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // включаем dark mode через .dark
  theme: {
    extend: {
      colors: {
        'background-light': '#ffffff',
        'background-dark': '#0a0a0a',
      },
    },
  },
  plugins: [],
};
