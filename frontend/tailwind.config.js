/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['"DM Mono"', 'monospace'],
      },
      colors: {
        paper: {
          light: '#fdfbf7',
          DEFAULT: '#f4f1ea',
          dark: '#e8e4d9',
        },
        ink: {
          light: '#4a4843',
          DEFAULT: '#2c2a29',
          dark: '#1a1918',
        },
        accent: {
          orange: '#d97757',
          green: '#8b9a84',
          terracotta: '#c86f5e'
        }
      },
      boxShadow: {
        'soft': '2px 2px 8px rgba(0, 0, 0, 0.05)',
        'analog': '3px 3px 0px rgba(44, 42, 41, 0.15)',
        'analog-lg': '5px 5px 0px rgba(44, 42, 41, 0.2)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
