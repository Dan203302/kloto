/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Stem', 'sans-serif'], // Устанавливаем Stem как шрифт по умолчанию
      },
      colors: {
        primary: {
          100: '#3936CC',
          200: '#5552E8',
          300: '#F5F5F7', // Добавляем светло-серый цвет
        },
      },
    },
  },
  plugins: [],
} 