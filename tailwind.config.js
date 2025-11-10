// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: "class",
//   content: [
//     "./src/**/*.{js,jsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: "#6366F1",
//           light: "#818CF8",
//           dark: "#4F46E5",
//         },
//         secondary: {
//           DEFAULT: "#22D3EE",
//           light: "#67E8F9",
//           dark: "#06B6D4",
//         },
//         accent: {
//           DEFAULT: "#FBBF24",
//           light: "#FCD34D",
//           dark: "#F59E0B",
//         },
//         background: {
//           light: "#F8FAFC",
//           dark: "#0F172A",
//         },
//       },
//     },
//   },
//   plugins: [],
// };



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: "class", // включаем поддержку темной темы
//   content: [
//     "./src/**/*.{js,jsx}", // путь ко всем твоим компонентам
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: "#6366F1", // фиолетовый
//           light: "#818CF8",
//           dark: "#4F46E5",
//         },
//         secondary: {
//           DEFAULT: "#22D3EE", // голубой
//           light: "#67E8F9",
//           dark: "#06B6D4",
//         },
//         accent: {
//           DEFAULT: "#FBBF24", // янтарный
//           light: "#FCD34D",
//           dark: "#F59E0B",
//         },
//         background: {
//           light: "#F8FAFC", // светлый фон
//           dark: "#0F172A",  // темный фон
//         },
//       },
//     },
//   },
//   plugins: [],
// };



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
