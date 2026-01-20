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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#fef9e7',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        luxury: {
          gold: '#d4af37',
          'gold-light': '#f4e4bc',
          'gold-dark': '#b8941d',
          navy: '#0a1929',
          'navy-light': '#1a2332',
          'navy-dark': '#050a14',
          cream: '#f5f1e8',
          'cream-dark': '#e8e0d1',
        },
        accent: {
          blue: '#1e3a8a',
          'blue-light': '#3b82f6',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.7',
          },
        },
      },
    },
  },
  plugins: [],
};
