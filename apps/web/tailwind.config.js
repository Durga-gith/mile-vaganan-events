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
        ivory: {
          DEFAULT: '#FFFFF0',
          dark: '#F5F5DC',
        },
        royal: {
          blue: '#002366',
          gold: '#C5A028',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'royal-pattern': "url('https://www.transparenttextures.com/patterns/black-scales.png')",
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4CF57 50%, #AA8C2C 100%)',
      },
    },
  },
  plugins: [],
};
