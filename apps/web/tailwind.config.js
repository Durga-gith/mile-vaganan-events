/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4CF57',
          dark: '#AA8C2C',
        },
        maroon: {
          DEFAULT: '#800000',
          light: '#A52A2A',
          dark: '#4B0000',
        },
        ivory: '#FFFFF0',
      },
    },
  },
  plugins: [],
};
